import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req, UploadedFile,
  UseGuards, UseInterceptors
} from "@nestjs/common";
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
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageFilePipe } from "../pipes/ImageFilePipe";

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
  @Delete('/:userId')
  async deleteUser(
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<UserResponse> {
    return this.userService.deleteUser(userId);
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
  @UseGuards(JWTGuard, AccessGuard)
  @Patch('/:userId')
  async updateUser(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ): Promise<UserResponse> {
    return this.userService.updateUser(userId, body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user`s avatar',
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @UseGuards(JWTGuard, AccessGuard)
  @UseInterceptors(FileInterceptor('avatarFile'))
  @Patch('/:userId')
  async updateAvatar(
    @Param('userId', UserByIdPipe) userId: string,
    @UploadedFile(ImageFilePipe) avatarFile: Express.Multer.File,
  ): Promise<UserResponse> {
    return this.userService.updateAvatar(userId, avatarFile);
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
