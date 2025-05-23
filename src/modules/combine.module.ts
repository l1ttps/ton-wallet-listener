import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [WebhooksModule, WalletsModule],
})
export class CombineModule {}
