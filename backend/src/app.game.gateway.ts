import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MassageHandler } from './app.messagehandler.service';
import { defaultMessage, meeplePlacementReceive } from './constants';

@WebSocketGateway(5001, { cors: true })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: Server) {
    console.log('initialized...');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`connected client ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`disconnected client ${client.id}`);
  }

  @SubscribeMessage(defaultMessage)
  handleEvent(client: Socket, text: string): WsResponse<string> {
    const msgHandler = new MassageHandler();
    msgHandler.messageType = defaultMessage;
    msgHandler.createMessage(client.id, text);
    return msgHandler.sendMassage();
  }

  @SubscribeMessage(meeplePlacementReceive)
  handleMessage(client: Socket, text: string): WsResponse<string> {
    const msgHandler = new MassageHandler();
    msgHandler.messageType = meeplePlacementReceive;
    msgHandler.createMessage(client.id, text);
    return msgHandler.sendMassage();
  }
}
