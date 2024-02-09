import { AuctionStake, Chat } from '@prisma/client';

export class DbAuctionItem {
  id: string;
  title?: string;
  description?: string;
  images?: string[];
  startPrice: bigint;
  minPriceStep: bigint;
  createdAt: Date;
  startTime: Date;
  endTime: Date;
  auctionStakes?: AuctionStake[];
  userId: string;
  chat?: Chat;
}
