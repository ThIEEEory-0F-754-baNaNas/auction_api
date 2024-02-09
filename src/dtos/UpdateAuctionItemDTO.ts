import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAuctionItemDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Array of images to add',
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];
}
