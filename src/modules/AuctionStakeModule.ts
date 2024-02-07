import { Module } from '@nestjs/common';
import { AuctionStakeController } from '../controllers/AuctionStakeController';
import { AuctionStakeService } from '../services/AuctionStakeService';
import { PrismaModule } from './PrismaModule';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { CreateAuctionStakePipe } from '../pipes/CreateAuctionStakePipe';

@Module({
  controllers: [AuctionStakeController],
  providers: [AuctionStakeService, AuctionByIdPipe, CreateAuctionStakePipe],
  imports: [PrismaModule],
})
export class AuctionStakeModule {}
