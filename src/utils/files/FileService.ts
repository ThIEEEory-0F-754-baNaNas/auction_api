import { createHash } from 'crypto';
import { extname, join } from 'path';
import { resolve } from 'url';
import * as fs from 'fs';
import * as process from 'process';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {
    const avatars = join(__dirname, 'static', 'avatars');
    const images = join(__dirname, 'static', 'images');

    if (!this.checkFileExist(avatars)) {
      this.createDirectory(avatars);
    }
    if (!this.checkFileExist(images)) {
      this.createDirectory(images);
    }
  }

  private createDirectory(path: string) {
    return fs.mkdirSync(path, {
      recursive: true,
    });
  }

  async saveByHash(file: Express.Multer.File, directory: string) {
    const fileName = createHash('md5').update(file.buffer).digest('hex');
    const filePath = join(
      __dirname,
      'static',
      directory,
      fileName + extname(file.originalname),
    );

    await fs.promises.writeFile(filePath, file.buffer);

    return resolve(
      process.env.BASE_URL,
      join('photos', directory, fileName + extname(file.originalname)),
    );
  }

  checkFileExist(path: string): boolean {
    const filePath = join(__dirname, 'static', path);
    return fs.existsSync(filePath);
  }

  async deleteFile(path: string) {
    const filePath = join(__dirname, 'static', path);
    await fs.promises.unlink(filePath);
  }

  async getFile(fileName: string, directory: string) {
    const filePath = join(__dirname, 'static', directory, fileName);
    return fs.createReadStream(filePath);
  }
}
