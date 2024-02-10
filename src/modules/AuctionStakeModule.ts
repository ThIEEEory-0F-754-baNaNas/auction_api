import { Module } from '@nestjs/common';
import { AuctionStakeController } from '../controllers/AuctionStakeController';
import { AuctionStakeService } from '../services/AuctionStakeService';
import { PrismaModule } from './PrismaModule';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { AuctionStakesMapper } from '../mappers/AuctionStakesMapper';

@Module({
  controllers: [AuctionStakeController],
  providers: [AuctionStakeService, AuctionByIdPipe, AuctionStakesMapper],
  imports: [PrismaModule],
})
export class AuctionStakeModule {}
