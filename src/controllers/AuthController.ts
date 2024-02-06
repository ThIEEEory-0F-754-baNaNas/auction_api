import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthService } from '../services/AuthService';
import { LocalGuard } from '../guards/LocalGuard';
import { JWTGuard } from '../guards/JWTGuard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: CreateUserDTO) {
    return this.authService.createUser(body);
  }

  @UseGuards(LocalGuard)
  @Post('/signin')
  signin(@Req() req) {
    return { token: this.authService.getAccessToken(req.user.id) };
  }

  @UseGuards(JWTGuard)
  @Get('/whoami')
  whoami(@Req() req) {
    return req.user;
  }
}
