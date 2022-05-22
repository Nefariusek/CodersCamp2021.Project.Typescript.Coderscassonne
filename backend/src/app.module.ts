import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './app.game.gateway';
import { MassageHandler } from './app.messagehandler.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GameGateway, MassageHandler],
})
export class AppModule {}
