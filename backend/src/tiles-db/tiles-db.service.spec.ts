import { Test, TestingModule } from '@nestjs/testing';
import { TilesDbService } from './tiles-db.service';

describe('TilesDbService', () => {
  let service: TilesDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TilesDbService],
    }).compile();

    service = module.get<TilesDbService>(TilesDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
