import { ApiProperty } from '@nestjs/swagger';
import { AuctionStake, Chat } from '@prisma/client';

export class AuctionItemResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  startPrice: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  userId: string;
}

export class FullAuctionItemResponse extends AuctionItemResponse {
  @ApiProperty()
  auctionStakes: AuctionStake[];

  @ApiProperty()
  chat: Chat;
}
