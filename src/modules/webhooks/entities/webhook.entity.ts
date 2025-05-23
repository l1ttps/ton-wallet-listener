import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('webhooks')
export class Webhook extends BaseEntity {
  @ApiProperty()
  @IsString()
  @Column({ unique: true })
  url: string;
}
