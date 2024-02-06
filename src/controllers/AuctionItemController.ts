import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAuctionItemDTO } from '../dtos/CreateAuctionItemDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { AuctionItemService } from '../services/AuctionItemService';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { UpdateAuctionItemDTO } from '../dtos/UpdateAuctionItemDTO';

@Controller('auctionItems')
export class AuctionItemController {
  constructor(private auctionItemService: AuctionItemService) {}

  @UseGuards(JWTGuard)
  @Post()
  async create(@Body() body: CreateAuctionItemDTO, @Req() req) {
    return this.auctionItemService.create(body, req.user.id);
  }

  @UseGuards(JWTGuard)
  @Get('/:auctionId')
  async get(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    return this.auctionItemService.getById(auctionId);
  }

  @UseGuards(JWTGuard)
  @Patch('/:auctionId')
  async update(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: UpdateAuctionItemDTO
  ) {
    return this.auctionItemService.update(auctionId, body);
  }

  @UseGuards(JWTGuard)
  @Delete('/:auctionId')
  async delete(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    return this.auctionItemService.delete(auctionId);
  }
}
