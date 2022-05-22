import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game.gateway';
import { TilesModule } from './tiles/tiles.module';
import { TilesGateway } from './tiles/tiles.gateway';

@Module({
  imports: [TilesModule],
  controllers: [AppController],
  providers: [AppService, GameGateway, TilesGateway],
})
export class AppModule {}
