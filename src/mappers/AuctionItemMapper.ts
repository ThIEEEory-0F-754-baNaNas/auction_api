import { DbAuctionItem } from '../DbEntities/DbAuctionItem';

export class AuctionItemMapper {
  getAuctionItem(a: DbAuctionItem) {
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      images: a.images,
      startPrice: a.startPrice,
      createdAt: a.createdAt,
      endTime: a.endTime,
      auctionStakes: a.auctionStakes,
      userId: a.userId,
      chat: a.chat,
    };
  }
}
