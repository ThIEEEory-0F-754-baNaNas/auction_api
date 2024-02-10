import { ApiProperty } from '@nestjs/swagger';
import { ChatResponse } from './ChatResponse';

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
  minPriceStep: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  userId: string;
}

export class AuctionItemWithChatResponse extends AuctionItemResponse {
  @ApiProperty({ type: ChatResponse })
  chat: ChatResponse;
}
