import { ApiProperty } from '@nestjs/swagger';

export class PostMessageResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  auctionItemId: string;
}
