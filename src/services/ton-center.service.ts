import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs/promises';
import { Network, Sort, TON_CENTER_API_V3 } from 'src/common/enums';
import { Transaction } from 'src/common/interfaces';

@Injectable()
export class TonCenterService implements OnModuleDestroy {
  private readonly logger = new Logger(TonCenterService.name);
  private readonly currentNetwork: Network;
  private readonly apiUrl: string;
  private readonly address: string;
  private readonly frequency: number;
  private isRunning = false;
  private readonly LAST_TIME_FILE = './last-seen-time.txt';

  constructor(private readonly configService: ConfigService) {
    this.currentNetwork = this.configService.get<Network>(
      'NETWORK',
      Network.MAINNET,
    );
    this.apiUrl = TON_CENTER_API_V3[this.currentNetwork] + '/transactions';
    this.address = this.configService.get<string>('ADDRESS')!;
    this.frequency = this.configService.get<number>('FREQUENCY', 1000);

    if (!this.address) {
      throw new Error('ADDRESS is not configured');
    }

    this.init();
  }

  private async init(): Promise<void> {
    let lastSeenTime: number | undefined;
    try {
      const content = await fs.readFile(this.LAST_TIME_FILE, 'utf-8');
      const parsed = parseInt(content.trim(), 10);
      if (isNaN(parsed)) throw new Error('Invalid timestamp in file');
      lastSeenTime = parsed;
      this.logger.log(`Loaded lastSeenTime from file: ${lastSeenTime}`);
    } catch (err) {
      this.logger.warn('No valid lastSeenTime found. Using current time.');
      lastSeenTime = Math.floor(Date.now() / 1000); // seconds
      await fs.writeFile(this.LAST_TIME_FILE, lastSeenTime.toString());
      this.logger.log(
        `Created new lastSeenTime file with timestamp: ${lastSeenTime}`,
      );
    }

    this.startPolling(lastSeenTime);
  }

  private async startPolling(startTime?: number): Promise<void> {
    if (this.isRunning) return;

    this.isRunning = true;
    await this.pollLoop(startTime);
  }

  private async pollLoop(startTime?: number): Promise<void> {
    let currentStart = startTime;

    while (this.isRunning) {
      try {
        const params: any = {
          account: this.address,
          limit: 100,
          offset: 0,
          sort: Sort.DESC,
        };

        if (currentStart) {
          params.start_utime = currentStart;
        }

        const response = await axios.get(this.apiUrl, {
          params,
          timeout: 10000,
        });

        const transactions: Transaction[] = response.data.transactions;

        if (transactions.length > 0) {
          for (const tx of transactions) {
            await this.processTransaction(tx);
          }

          const lastTx = transactions[0];
          currentStart = lastTx.now + 1;

          await fs.writeFile(this.LAST_TIME_FILE, currentStart.toString());
          this.logger.log(`Updated lastSeenTime to ${currentStart}`);
        } else {
          this.logger.debug('No new transactions found.');
        }
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? `${error.message} (${error.code})`
            : (error as Error).message;
        this.logger.error(`Error fetching transactions: ${errorMessage}`);
      }

      await new Promise((res) => setTimeout(res, this.frequency));
    }
  }

  private async processTransaction(tx: Transaction): Promise<void> {
    try {
      const { in_msg, out_msgs, hash, now } = tx;

      if (in_msg?.value) {
        const valueTON = parseInt(in_msg.value, 10) / 1e9;
        this.logger.log(
          `[INCOMING] Received ${valueTON} TON from ${in_msg.source ?? 'unknown'} at ${new Date(now * 1000).toISOString()} | TxHash: ${hash}`,
        );
      }

      if (out_msgs?.length > 0) {
        for (const msg of out_msgs) {
          if (msg.value) {
            const valueTON = parseInt(msg.value, 10) / 1e9;
            this.logger.log(
              `[OUTGOING] Sent ${valueTON} TON to ${msg.destination ?? 'unknown'} at ${new Date(now * 1000).toISOString()} | TxHash: ${hash}`,
            );
          }
        }
      }
    } catch (err) {
      this.logger.error(
        `Error processing transaction: ${
          err instanceof Error ? err.message : err
        }`,
      );
    }
  }

  public stopPolling(): void {
    this.logger.warn('Stopping polling...');
    this.isRunning = false;
  }

  async onModuleDestroy() {
    this.stopPolling();
  }
}
