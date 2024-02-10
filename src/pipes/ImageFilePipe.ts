import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { OptionalImageFilePipe } from './OptionalImageFilePipe';

@Injectable()
export class ImageFilePipe implements PipeTransform {
  constructor(private readonly optionalImageFilePipe: OptionalImageFilePipe) {}
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File was not provided');
    }

    return this.optionalImageFilePipe.transform(file);
  }
}
