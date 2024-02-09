import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthService } from '../services/AuthService';
import { LocalGuard } from '../guards/LocalGuard';
import { JWTGuard } from '../guards/JWTGuard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthLoginResponse } from '../responses/AuthLoginResponse';
import { AuthSignupResponse } from '../responses/AuthSignupResponse';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFilePipe } from '../pipes/ImageFilePipe';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'sign up user',
  })
  @ApiOkResponse({
    type: AuthSignupResponse,
  })
  @ApiOkResponse()
  @UseInterceptors(FileInterceptor('avatarFile'))
  @Post('/signup')
  signup(
    @Body() body: CreateUserDTO,
    @UploadedFile(ImageFilePipe) avatarFile: Express.Multer.File,
  ): Promise<AuthSignupResponse> {
    return this.authService.createUser(body, avatarFile);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'sign in user',
  })
  @ApiOkResponse({
    type: AuthLoginResponse,
  })
  @UseGuards(LocalGuard)
  @Post('/signin')
  signin(@Req() req): AuthLoginResponse {
    return { token: this.authService.getAccessToken(req.user.id) };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get user information',
  })
  @UseGuards(JWTGuard)
  @Get('/whoami')
  whoami(@Req() req) {
    return req.user;
  }
}
