import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { UserDepositDto } from '../dtos/UserDepositDto';
import { DbUser } from '../DbEntities/DbUser';

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

  deposit(data: UserDepositDto, user: DbUser) {
    return this.userRepository.updateById(user.id, {
      balance: data.amount + Number(user.balance),
    });
  }
}
