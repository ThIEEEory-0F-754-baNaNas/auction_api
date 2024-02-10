import { ApiProperty } from '@nestjs/swagger';
import { ShortUserResponse } from './UserResponse';

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

export class AuctionStakeWithUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: ShortUserResponse })
  user: ShortUserResponse;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  price: bigint;
}
