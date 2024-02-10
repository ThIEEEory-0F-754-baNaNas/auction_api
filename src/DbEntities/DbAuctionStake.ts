import { AuctionItem, User } from '@prisma/client';

export class DbAuctionStake {
  id: string;
  user: User;
  userId: string;
  createdAt: Date;
  auctionItem: AuctionItem;
  auctionItemId: string;
  price: bigint;
}
