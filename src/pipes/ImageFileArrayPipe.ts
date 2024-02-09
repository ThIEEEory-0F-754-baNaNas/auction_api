import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ImageFilePipe } from './ImageFilePipe';

@Injectable()
export class ImageFileArrayPipe implements PipeTransform {
  constructor(private readonly imageFilePipe: ImageFilePipe) {}
  transform(files: Array<Express.Multer.File>) {
    if (!files) {
      throw new BadRequestException('Files must be selected');
    }

    for (const file of files) {
      this.imageFilePipe.transform(file);
    }

    return files;
  }
}
