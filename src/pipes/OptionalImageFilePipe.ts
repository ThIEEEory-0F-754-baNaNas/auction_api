import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class OptionalImageFilePipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      return;
    }

    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new BadRequestException('File size exceeds 5 megabytes');
    }

    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes('.' + fileExtension)) {
      throw new BadRequestException('File must be an image (png, jpeg, jpg)');
    }

    return file;
  }
}
