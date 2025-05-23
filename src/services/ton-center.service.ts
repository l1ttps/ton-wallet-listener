import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import * as fs from 'fs/promises';
import { Network, Sort, TON_CENTER_API_V3 } from 'src/common/enums';

@Injectable()
export class TonCenterService implements OnModuleDestroy {
  private readonly logger = new Logger(TonCenterService.name);
  private readonly currentNetwork: Network;
  private readonly apiUrl: string;
  private readonly address: string;
  private readonly frequency: number;
  private isRunning = false;
  private readonly LAST_TIME_FILE = './lastSeenTime.txt';

  constructor(private readonly configService: ConfigService) {
    this.currentNetwork = this.configService.get<Network>(
      'NETWORK',
      Network.MAINNET,
    );
    this.apiUrl = TON_CENTER_API_V3[this.currentNetwork] + '/transactions';
    this.address = this.configService.get<string>('DEFAULT_ADDRESS')!;
    this.frequency = this.configService.get<number>('FREQUENCY', 1000);

    if (!this.address) {
      throw new Error('DEFAULT_ADDRESS is not configured');
    }

    this.init();
  }

  private async init(): Promise<void> {
    let lastSeenTime: number | undefined;
    try {
      const content = await fs.readFile(this.LAST_TIME_FILE, 'utf-8');
      lastSeenTime = parseInt(content.trim(), 10);
      if (isNaN(lastSeenTime)) throw new Error('Invalid timestamp in file');
      this.logger.log(`Loaded lastSeenTime from file: ${lastSeenTime}`);
    } catch (err) {
      this.logger.warn('No previous lastSeenTime file found, starting fresh.');
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

        const transactions = response.data.transactions;
        if (transactions.length > 0) {
        }

        const lastTx = transactions[0];
        // console.log(lastTx);
        // for (const tx of transactions) {
        //   this.processTransaction(tx);
        // }
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

  private async processTransaction(tx: any): Promise<void> {
    try {
      const realValue = +parseFloat(tx.in_msg.value) / 10 ** 9;
      console.log(realValue);
      this.logger.debug(
        `Tx hash: ${tx.hash}, value: ${tx.in_msg?.value ?? 'N/A'}`,
      );
    } catch (err) {
      this.logger.error(
        `Error processing transaction: ${err instanceof Error ? err.message : err}`,
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
