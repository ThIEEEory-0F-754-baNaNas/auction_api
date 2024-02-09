import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { UserMapper } from '../mappers/UserMapper';
import { FileModule } from '../utils/files/FileModule';

@Module({
  imports: [PrismaModule, FileModule],
  exports: [UserService, UserByIdPipe, UserMapper],
  providers: [UserService, UserByIdPipe, UserMapper],
  controllers: [UserController],
})
export class UserModule {}
