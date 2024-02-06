import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuctionItemDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  startPrice: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endTime: Date;
}
