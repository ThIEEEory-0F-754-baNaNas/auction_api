import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserAlreadyRegisteredException } from '../exceptions/UserAlreadyRegisteredException';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FileService } from '../utils/files/FileService';

const DEFAULT_AVATAR = 'https://imgur.com/a/ajhw7Jq';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly fileService: FileService,
  ) {}

  async createUser(body: CreateUserDTO, avatarFile: Express.Multer.File) {
    const { password, ...securityUser } = body;
    const user = await this.userRepository.find({
      OR: [{ email: body.email }, { username: body.username }],
    });

    if (user) {
      throw new UserAlreadyRegisteredException();
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatar = avatarFile
      ? await this.fileService.saveByHash(avatarFile, 'avatars')
      : DEFAULT_AVATAR;

    return this.userRepository.create({
      password: hashedPassword,
      avatar,
      ...securityUser,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.find({ email });
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    delete user.password;
    return user;
  }

  getAccessToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
