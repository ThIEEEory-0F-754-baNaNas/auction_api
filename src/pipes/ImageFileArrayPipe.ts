import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { OptionalImageFilePipe } from './OptionalImageFilePipe';

@Injectable()
export class ImageFileArrayPipe implements PipeTransform {
  constructor(private readonly imageFilePipe: OptionalImageFilePipe) {}
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
