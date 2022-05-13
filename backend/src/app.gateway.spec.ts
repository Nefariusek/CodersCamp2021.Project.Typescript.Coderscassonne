import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';
import * as ioClient from 'socket.io-client';

const socketUrl = 'http://localhost:5001';

describe('AppGateway', () => {
  let gateway: AppGateway;
  let app: INestApplication;
  const connectToSocketIO = (): ioClient.Socket =>
    ioClient.io(socketUrl, {
      transports: ['websocket'],
      forceNew: true,
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppGateway],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    gateway = module.get<AppGateway>(AppGateway);
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
