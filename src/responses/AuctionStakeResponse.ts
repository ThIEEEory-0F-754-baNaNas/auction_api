import { ApiProperty } from '@nestjs/swagger';

export class AuctionStakeResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  auctionItemId: string;

  @ApiProperty()
  price: bigint;
}
