import { Module } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { UserRepository } from '../repositories/UserRepository';

@Module({
  exports: [PrismaService, UserRepository],
  providers: [PrismaService, UserRepository],
})
export class PrismaModule {}
