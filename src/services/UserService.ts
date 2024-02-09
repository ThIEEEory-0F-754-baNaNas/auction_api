import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { UserDepositDto } from '../dtos/UserDepositDto';
import { DbUser } from '../DbEntities/DbUser';
import { FileService } from '../utils/files/FileService';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileService: FileService,
  ) {}

  deleteUser(userId: string) {
    return this.userRepository.deleteById(userId);
  }

  findUser(userId: string) {
    return this.userRepository.findById(userId);
  }

  updateUser(userId: string, body: UpdateUserDTO) {
    return this.userRepository.updateById(userId, body);
  }

  async updateAvatar(userId: string, avatarFile: Express.Multer.File) {
    const { avatar } = await this.userRepository.findById(userId);
    if (avatar && this.fileService.checkFileExist(avatar)) {
      await this.fileService.deleteFile(avatar);
    }

    const avatarPath = await this.fileService.saveByHash(avatarFile, 'avatars');
    return this.userRepository.updateById(userId, { avatar: avatarPath });
  }

  deposit(data: UserDepositDto, user: DbUser) {
    return this.userRepository.updateById(user.id, {
      balance: data.amount + Number(user.balance),
    });
  }
}
