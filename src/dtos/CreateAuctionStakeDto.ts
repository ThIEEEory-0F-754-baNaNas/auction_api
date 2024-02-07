import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionStakeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  auctionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
