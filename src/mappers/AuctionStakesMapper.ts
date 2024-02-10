import { DbAuctionStake } from '../DbEntities/DbAuctionStake';

export class AuctionStakesMapper {
  getStake(s: DbAuctionStake) {
    return {
      id: s.id,
      user: {
        id: s.user.id,
        avatar: s.user.avatar,
        username: s.user.username,
      },
      createdAt: s.createdAt,
      price: s.price,
    };
  }
  getStakes(stakes: DbAuctionStake[]) {
    return stakes.map((s) => this.getStake(s));
  }
}
