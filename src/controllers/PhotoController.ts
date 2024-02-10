import { FileService } from '../utils/files/FileService';
import { Controller, Get, Param, StreamableFile } from '@nestjs/common';

@Controller('/photos')
export class PhotoController {
  constructor(private fileService: FileService) {}

  @Get('images/:imageId')
  async getImage(@Param('imageId') imageId: string) {
    const file = await this.fileService.getFile(imageId, 'images');
    return new StreamableFile(file);
  }

  @Get('avatars/:avatarId')
  async getAvatar(@Param('avatarId') avatarId: string) {
    const file = await this.fileService.getFile(avatarId, 'avatars');
    return new StreamableFile(file);
  }
}
