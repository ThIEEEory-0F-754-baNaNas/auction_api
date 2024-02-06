import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/PrismaModule';
import { AuthModule } from './modules/AuthModule';
import { UserModule } from './modules/UserModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
