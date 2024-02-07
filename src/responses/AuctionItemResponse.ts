import { ApiProperty } from '@nestjs/swagger';

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
