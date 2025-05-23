import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Webhook } from './entities/webhook.entity';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import {
  GetManyBaseDto,
  GetManyBaseQueryParams,
} from 'src/common/dto/get-many.dto';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectRepository(Webhook)
    private readonly webhookRepository: Repository<Webhook>,
  ) {}

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
}
