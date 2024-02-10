import { ApiProperty } from '@nestjs/swagger';
import { MessageResponse } from './MessageResponse';

export class ChatResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  auctionItemId: string;

  @ApiProperty({ type: [MessageResponse] })
  messages: MessageResponse[];
}
