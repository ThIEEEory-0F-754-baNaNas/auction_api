import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuctionItemDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  startPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endTime: Date;
}
