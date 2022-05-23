import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameGateway } from './game.gateway';
import { MassageHandler } from './app.messagehandler.service';
import { AppService } from './app.service';
import { TilesGateway } from './tiles/tiles.gateway';
import { TilesModule } from './tiles/tiles.module';

@Module({
  imports: [TilesModule],
  controllers: [AppController],
  providers: [AppService, GameGateway, MassageHandler, TilesGateway],
})
export class AppModule {}
