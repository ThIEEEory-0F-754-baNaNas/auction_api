import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { AccessGuard } from '../guards/AccessGuard';
import { UserMapper } from '../mappers/UserMapper';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponse } from '../responses/UserResponse';
import { UserDepositDto } from '../dtos/UserDepositDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFilePipe } from '../pipes/ImageFilePipe';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @UseGuards(JWTGuard, AccessGuard)
  @Delete()
  async deleteUser(@Req() req): Promise<UserResponse> {
    return this.userService.deleteUser(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @Get('/:userId')
  async getUser(
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<UserResponse> {
    const user = await this.userService.findUser(userId);
    return this.userMapper.getUser(user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @UseGuards(JWTGuard)
  @Patch()
  async updateUser(
    @Req() req,
    @Body() body: UpdateUserDTO,
  ): Promise<UserResponse> {
    return this.userService.updateUser(req.user.id, body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user`s avatar',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @UseGuards(JWTGuard)
  @UseInterceptors(FileInterceptor('avatarFile'))
  @Patch('/avatar')
  async updateAvatar(
    @Req() req,
    @UploadedFile(ImageFilePipe) avatarFile: Express.Multer.File,
  ): Promise<UserResponse> {
    return this.userService.updateAvatar(req.user.id, avatarFile);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deposit to users balance',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @UseGuards(JWTGuard)
  @Post('/deposit')
  async deposit(@Body() body: UserDepositDto, @Req() req) {
    return this.userService.deposit(body, req.user);
  }
}
