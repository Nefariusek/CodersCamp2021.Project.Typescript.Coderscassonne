import { Test, TestingModule } from '@nestjs/testing';
import { TilesGateway } from './tiles.gateway';

describe('TilesGateway', () => {
  let gateway: TilesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TilesGateway],
    }).compile();

    gateway = module.get<TilesGateway>(TilesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
