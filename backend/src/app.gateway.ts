import { UsePipes } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5001, { cors: true })
export class AppGateway
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

  @SubscribeMessage('message')
  handleEvent(client: Socket, text: string): WsResponse<string> {
    const message = `Client with id: ${client.id} send a message: ${text}`;
    console.log(message);
    return { event: 'messageToClient', data: message };
  }

  @SubscribeMessage('meeplePlacementMessage')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    const message = `Client with id: ${client.id} put a meeple: ${text}`;
    console.log(message);
    return { event: 'messageToClientAfterMeeplePlacement', data: message };
  }
}
