import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TilesDbController } from './tiles-db.controller';
import { TilesDbService } from './tiles-db.service';
import { TileSchema } from './tile.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tile', schema: TileSchema }])],
  controllers: [TilesDbController],
  providers: [TilesDbService],
})
export class TilesDbModule {}
