import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from './game.gateway';
import * as ioClient from 'socket.io-client';

const socketUrl = 'http://localhost:5001';

describe('GameGateway', () => {
  let gateway: GameGateway;
  let app: INestApplication;
  const connectToSocketIO = (): ioClient.Socket =>
    ioClient.io(socketUrl, {
      transports: ['websocket'],
      forceNew: true,
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGateway],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    gateway = module.get<GameGateway>(GameGateway);
  });

  afterEach(async () => {
    app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should connect and disconnect', (done) => {
    const socket = connectToSocketIO();

    socket.on('connect', () => {
      socket.disconnect();
    });

    socket.on('disconnect', (reason) => {
      expect(reason).toBe('io client disconnect');
      done();
    });

    socket.on('error', done);
  });
});
