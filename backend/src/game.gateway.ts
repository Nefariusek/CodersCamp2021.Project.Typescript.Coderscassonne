import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import WebSocketEvent from './constants/webSocketEvents';

@WebSocketGateway(5001, { cors: true })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('initialized...');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`connected client ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`disconnected client ${client.id}`);
  }

  @SubscribeMessage(WebSocketEvent.SEND_NEXT_PHASE)
  handleEndOfTurn(client: Socket, nextPhase: boolean): void {
    const message = { nextPhase: nextPhase, clientId: client.id };
    client.broadcast.emit(WebSocketEvent.RECEIVE_NEXT_PHASE, message);
  }

  @SubscribeMessage(WebSocketEvent.CLIENT_JOINED)
  async handleClientJoined(): Promise<WsResponse<string>> {
    const allSockets = await this.server.allSockets();
    if (allSockets.size === 1) {
      return { event: WebSocketEvent.YOU_ARE_HOST, data: 'You are the host' };
    }
  }

  @SubscribeMessage(WebSocketEvent.SEND_MESSAGE)
  handleMessage(client: Socket, text: string): WsResponse<string> {
    const message = `Client with id: ${client.id} send a message: ${text}`;
    return { event: WebSocketEvent.RECEIVE_MESSAGE, data: message };
  }
}
