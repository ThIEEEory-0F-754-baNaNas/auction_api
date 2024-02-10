import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionStakeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
