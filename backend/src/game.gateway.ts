import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { MassageHandler } from './app.messagehandler.service';
import WebSocketEvent from './constants/webSocketEvents';
import { meeplePlacementReceive } from './constants';

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

  @SubscribeMessage(WebSocketEvent.SEND_MESSAGE)
  handleMessage(client: Socket, text: string): WsResponse<string> {
    const message = `Client with id: ${client.id} send a message: ${text}`;
    return { event: WebSocketEvent.RECEIVE_MESSAGE, data: message };
  }

  @SubscribeMessage(WebSocketEvent.SEND_NEXT_PHASE)
  handleEndOfTurn(client: Socket, nextPhase: boolean): void {
    const message = { nextPhase: nextPhase, clientId: client.id };
    client.broadcast.emit(WebSocketEvent.RECEIVE_NEXT_PHASE, message);
  }

  @SubscribeMessage(meeplePlacementReceive)
  handleMeeplePlacement(client: Socket, text: string): WsResponse<string> {
    const msgHandler = new MassageHandler();
    msgHandler.messageType = meeplePlacementReceive;
    msgHandler.createMessage(client.id, text);
    return msgHandler.sendMassage();
  }
}
