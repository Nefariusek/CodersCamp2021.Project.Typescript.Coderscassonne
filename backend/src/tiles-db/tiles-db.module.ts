import { Module } from '@nestjs/common';
import { TilesDbController } from './tiles-db.controller';
import { TilesDbService } from './tiles-db.service';

@Module({
  controllers: [TilesDbController],
  providers: [TilesDbService],
})
export class TilesDbModule {}
