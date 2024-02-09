import { AuctionStake, Chat } from '@prisma/client';

export class DbAuctionItem {
  id: string;
  title?: string;
  description?: string;
  images?: string[];
  startPrice: bigint;
  createdAt: Date;
  endTime: Date;
  auctionStakes?: AuctionStake[];
  userId: string;
  chat?: Chat;
}
