import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

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
  handleMessage(client: Socket, text: string): WsResponse<string> {
    console.log(`Client with id: ${client.id} send a message: ${text}`);
    return { event: 'messageToClient', data: text };
  }
}
