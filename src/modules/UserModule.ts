import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { UserByIdPipe } from '../pipes/UserByIdPipe';

@Module({
  imports: [PrismaModule],
  exports: [UserService, UserByIdPipe],
  providers: [UserService, UserByIdPipe],
  controllers: [UserController],
})
export class UserModule {}
