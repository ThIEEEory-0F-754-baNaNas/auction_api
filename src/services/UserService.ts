import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  deleteUser(userId: string) {
    return this.userRepository.deleteById(userId);
  }
  findUser(userId: string) {
    return this.userRepository.findById(userId);
  }
  updateUser(userId: string, body: UpdateUserDTO) {
    return this.userRepository.updateById(userId, body);
  }
}
