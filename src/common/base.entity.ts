import { ApiProperty } from '@nestjs/swagger';
import { PrimaryColumn, Generated, Column, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
