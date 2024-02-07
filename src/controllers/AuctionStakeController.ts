import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAuctionStakeDto } from '../dtos/CreateAuctionStakeDto';
import { AuctionStakeService } from '../services/AuctionStakeService';
import { CreateAuctionStakePipe } from '../pipes/CreateAuctionStakePipe';
import { JWTGuard } from '../guards/JWTGuard';

@Controller('/auctionStakes')
export class AuctionStakeController {
  constructor(private AuctionStakeService: AuctionStakeService) {}

  @UseGuards(JWTGuard)
  @Post()
  async create(
    @Body(CreateAuctionStakePipe) body: CreateAuctionStakeDto,
    @Req() req,
  ) {
    return this.AuctionStakeService.create(body, req.user.id);
  }
}
