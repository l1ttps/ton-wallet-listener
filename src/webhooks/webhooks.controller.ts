import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GetManyBaseDto,
  GetManyBaseQueryParams,
} from 'src/common/dto/get-many.dto';
import { DeleteResult } from 'typeorm';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @ApiOperation({
    summary: 'Creates a new webhook.',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Webhook,
  })
  @Post()
  async create(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhooksService.create(createWebhookDto);
  }

  @ApiOperation({
    summary: 'Create a new webhook subscription',
  })
  @ApiResponse({
    status: 201,
    description: 'Finds all webhooks.',
    type: GetManyBaseDto<Webhook>,
  })
  @Get()
  async findAll(@Query() queryParam: GetManyBaseQueryParams) {
    return this.webhooksService.findAll(queryParam);
  }

  @ApiOperation({
    summary: 'Delete a webhook by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The webhook has been successfully deleted.',
    type: DeleteResult,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.webhooksService.remove(id);
  }
}
