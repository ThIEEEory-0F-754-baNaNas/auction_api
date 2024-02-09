import { PipeTransform, Injectable } from '@nestjs/common';
import { ImageFilePipe } from './ImageFilePipe';

@Injectable()
export class ImageFileArrayPipe implements PipeTransform {
  constructor(private readonly imageFilePipe: ImageFilePipe) {}
  transform(files: Array<Express.Multer.File>) {
    for (const file of files) {
      this.imageFilePipe.transform(file);
    }

    return files;
  }
}
