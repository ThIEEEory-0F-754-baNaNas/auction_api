import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuctionStakeDto {
  @IsNotEmpty()
  @IsString()
  auctionId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
