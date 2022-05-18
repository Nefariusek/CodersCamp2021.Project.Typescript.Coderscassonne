import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway(5001, { cors: true })
export class TilesGateway {
  @SubscribeMessage('sendTilePlaced')
  handleTilePlacementMessage(client: Socket, text: string): void {
    client.broadcast.emit('receiveTilePlaced', text);
  }
}
