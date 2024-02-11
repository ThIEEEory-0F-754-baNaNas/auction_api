import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAuctionItemDTO } from '../dtos/CreateAuctionItemDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { AuctionItemService } from '../services/AuctionItemService';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { UpdateAuctionItemDTO } from '../dtos/UpdateAuctionItemDTO';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuctionItemResponse } from '../responses/AuctionItemResponse';
import { QueryAllAuctionItemsDTO } from '../dtos/QueryAllAuctionItemsDTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageFileArrayPipe } from '../pipes/ImageFileArrayPipe';
import { RemoveImagesDTO } from '../dtos/RemoveImagesDTO';
import { AuctionItemMapper } from '../mappers/AuctionItemMapper';
import { UserByIdPipe } from '../pipes/UserByIdPipe';

@ApiTags('AuctionItem')
@Controller('/auctionItems')
export class AuctionItemController {
  constructor(
    private readonly auctionItemService: AuctionItemService,
    private readonly auctionItemMapper: AuctionItemMapper,
  ) {}

  @ApiOperation({
    summary: 'Get all auctions',
  })
  @ApiOkResponse({
    type: [AuctionItemResponse],
  })
  @Get()
  async getAll(@Query() query: QueryAllAuctionItemsDTO) {
    return this.auctionItemService.getAll(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create auction',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @UseInterceptors(FilesInterceptor('photos', 6))
  @Post()
  async create(
    @Body() body: CreateAuctionItemDTO,
    @Req() req,
    @UploadedFiles(ImageFileArrayPipe) photos: Array<Express.Multer.File>,
  ): Promise<AuctionItemResponse> {
    return this.auctionItemService.create(body, req.user.id, photos);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get auction by id',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Get('/:auctionId')
  async get(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    const auction = await this.auctionItemService.getById(auctionId);
    return this.auctionItemMapper.getAuctionItem(auction);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update auction and add images',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @UseInterceptors(FilesInterceptor('photos', 6))
  @Patch('/:auctionId')
  async update(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: UpdateAuctionItemDTO,
    @UploadedFiles(ImageFileArrayPipe) photos: Array<Express.Multer.File>,
  ): Promise<AuctionItemResponse> {
    return this.auctionItemService.update(auctionId, body, photos);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove images from auction',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Patch('/:auctionId/images')
  async removePhotos(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: RemoveImagesDTO,
  ): Promise<AuctionItemResponse> {
    return this.auctionItemService.removeImages(auctionId, body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete auction by id',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Delete('/:auctionId')
  async delete(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    return this.auctionItemService.delete(auctionId);
  }

  @ApiOperation({
    summary: 'Get all auctions',
  })
  @ApiOkResponse({
    type: [AuctionItemResponse],
  })
  @Get('/user/:userId')
  async getAllByUser(
    @Query() query: QueryAllAuctionItemsDTO,
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.auctionItemService.getAllByUserId(query, userId);
  }
}
