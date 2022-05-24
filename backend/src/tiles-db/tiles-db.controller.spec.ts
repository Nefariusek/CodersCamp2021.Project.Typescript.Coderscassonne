import { Test, TestingModule } from '@nestjs/testing';
import { TilesDbController } from './tiles-db.controller';

describe('TilesDbController', () => {
  let controller: TilesDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TilesDbController],
    }).compile();

    controller = module.get<TilesDbController>(TilesDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
