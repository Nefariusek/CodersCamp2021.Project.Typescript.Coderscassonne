import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway(5001, { cors: true })
export class TilesGateway {
  @SubscribeMessage('sendTilePlaced')
  handleTilePlacementMessage(client: Socket, text: string): void {
    // const message = { tileData: text, clientId: client.id };
    const message = text;
    client.broadcast.emit('receiveTilePlaced', message);
  }
}
