import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { AccessGuard } from '../guards/AccessGuard';
import { UserMapper } from '../mappers/UserMapper';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @UseGuards(JWTGuard, AccessGuard)
  @Delete('/:userId')
  deleteUser(@Param('userId', UserByIdPipe) userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get('/:userId')
  async getUser(@Param('userId', UserByIdPipe) userId: string) {
    const user = await this.userService.findUser(userId);
    return this.userMapper.getUser(user);
  }

  @UseGuards(JWTGuard, AccessGuard)
  @Patch('/:userId')
  updateUser(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO
  ) {
    return this.userService.updateUser(userId, body);
  }
}
