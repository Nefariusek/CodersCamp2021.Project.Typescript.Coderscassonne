import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, RoomGateway],
})
export class AppModule {}
