import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/PrismaModule';
import { AuthModule } from './modules/AuthModule';
import { UserModule } from './modules/UserModule';
import { ConfigModule } from '@nestjs/config';
import { AuctionItemModule } from './modules/AuctionItemModule';
import { ChatModule } from './modules/ChatModule';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    AuctionItemModule,
    ChatModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
  ],
})
export class AppModule {}
