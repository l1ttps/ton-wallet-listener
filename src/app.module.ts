import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CombineModule } from './modules/combine.module';
import { ConfigModule } from '@nestjs/config';
import { TonCenterService } from './services/ton-center.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    CombineModule,
  ],
  controllers: [AppController],
  providers: [AppService, TonCenterService],
})
export class AppModule {}
