import { Module } from '@nestjs/common';
import { FileService } from './FileService';
import { OptionalImageFilePipe } from '../../pipes/OptionalImageFilePipe';

@Module({
  providers: [FileService, OptionalImageFilePipe],
  exports: [FileService, OptionalImageFilePipe],
})
export class FileModule {}
