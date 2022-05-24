import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameGateway } from './game.gateway';
import { MassageHandler } from './app.messagehandler.service';
import { AppService } from './app.service';
import { RoomGateway } from './room.gateway';
import { TilesGateway } from './tiles/tiles.gateway';
import { TilesModule } from './tiles/tiles.module';

@Module({
  imports: [TilesModule],
  controllers: [AppController],
  providers: [
    AppService,
    GameGateway,
    MassageHandler,
    TilesGateway,
    RoomGateway,
  ],
})
export class AppModule {}
