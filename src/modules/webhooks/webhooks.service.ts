import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import {
  GetManyBaseDto,
  GetManyBaseQueryParams,
} from 'src/common/dto/get-many.dto';
import axios from 'axios';
import { Notification } from 'src/common/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhooksService implements OnModuleInit {
  constructor(
    @InjectRepository(Webhook)
    private readonly webhookRepository: Repository<Webhook>,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    const checkDefaultWebhookUrl = this.configService.get<string>(
      'WEBHOOK',
      '',
    );
    if (checkDefaultWebhookUrl || checkDefaultWebhookUrl?.length > 0) {
      this.webhookRepository
        .createQueryBuilder('webhooks')
        .insert()
        .into(Webhook)
        .values({ url: checkDefaultWebhookUrl })
        .orIgnore()
        .execute();
    }
  }

  public async getAll(): Promise<Webhook[]> {
    return await this.webhookRepository.find();
  }

  /**
   * Creates a new webhook
   * @param createWebhookDto The webhook data to create
   * @returns The created webhook entity
   * @throws InternalServerErrorException if the webhook creation fails
   */
  public async create(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
    try {
      return await this.webhookRepository.save(createWebhookDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Finds all webhooks
   * @param queryParam The query parameters for pagination and sorting
   * @returns The paginated list of webhooks
   */
  public async findAll(
    queryParam: GetManyBaseQueryParams,
  ): Promise<GetManyBaseDto<Webhook>> {
    const { limit = 10, page = 1, sortBy, sortOrder } = queryParam;
    const [data, total] = await this.webhookRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy]: sortOrder,
      },
    });
    return {
      data,
      total,
      page: +page,
      limit: +limit,
      pageCount: Math.ceil(total / limit),
      hasNextPage: data.length >= limit,
    };
  }

  /**
   * Deletes a webhook by id
   * @param id The id of the webhook to delete
   * @returns The result of the delete operation
   * @throws InternalServerErrorException if the webhook deletion fails
   */
  public async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.webhookRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async pushNotification(notification: Notification) {
    const webhooks = await this.getAll();
    Promise.allSettled(
      webhooks.map((webhook) =>
        axios.post(webhook.url, notification, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    );
  }
}
