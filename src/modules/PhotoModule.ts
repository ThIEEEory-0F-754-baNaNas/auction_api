import { Module } from '@nestjs/common';
import { FileService } from '../utils/files/FileService';
import { PhotoController } from '../controllers/PhotoController';

@Module({
  controllers: [PhotoController],
  providers: [FileService],
})
export class PhotoModule {}
