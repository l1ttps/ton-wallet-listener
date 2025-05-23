import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { SortOrder } from '../enums';
export class GetManyBaseDto<T> {
  @ApiProperty({
    example: [
      {
        id: '000000-0000-0000-0000-000000000000',
        createdAt: '1970-01-01T00:00:00.000Z',
        updatedAt: '1970-01-01T00:00:00.000Z',
      },
    ],
  })
  @IsArray()
  data: T[];
  @ApiProperty()
  @IsNumber()
  total: number;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  limit: number;
  @ApiProperty()
  hasNextPage?: boolean;
  @ApiProperty()
  @IsNumber()
  pageCount: number;
}
export class GetManyBaseQueryParams {
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Type(() => Number)
  @ApiProperty({ required: false, example: 10 })
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false, example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy: string;

  @ApiProperty({ required: false, example: SortOrder.DESC, enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
