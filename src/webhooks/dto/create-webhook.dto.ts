import { PartialType } from '@nestjs/swagger';
import { Webhook } from '../entities/webhook.entity';

export class CreateWebhookDto extends PartialType(Webhook) {}
