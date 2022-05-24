import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MassageHandler } from './app.messagehandler.service';
import WebSocketEvent from './constants/webSocketEvents';

@WebSocketGateway(5001, { cors: true })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;

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
  handleEndOfTurn(
    client: Socket,
    rec: { room: string; nextPhase: boolean },
  ): void {
    const message = { nextPhase: rec.nextPhase, clientId: client.id };
    client.to(rec.room).emit(WebSocketEvent.RECEIVE_NEXT_PHASE, message);
  }

  @SubscribeMessage(WebSocketEvent.SEND_MEEPLE_PLACED)
  handleMeeplePlacement(client: Socket, rec: { room: string; text: string }) {
    const msgHandler = new MassageHandler();
    msgHandler.messageType = WebSocketEvent.SEND_MEEPLE_PLACED;
    msgHandler.createMessage(client.id, rec.text);
    const { event, data } = msgHandler.sendMassage();
    client.to(rec.room).emit(event, data);
  }

  @SubscribeMessage(WebSocketEvent.CLIENT_JOINED)
  async handleClientJoined(): Promise<WsResponse<string>> {
    const allSockets = await this.wss.allSockets();
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
