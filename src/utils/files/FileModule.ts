import { Module } from '@nestjs/common';
import { FileService } from './FileService';
import { ImageFilePipe } from '../../pipes/ImageFilePipe';

@Module({
  providers: [FileService, ImageFilePipe],
  exports: [FileService, ImageFilePipe],
})
export class FileModule {}
