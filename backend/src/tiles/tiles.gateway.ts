import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

@WebSocketGateway(5001, { cors: true })
export class TilesGateway {
  @SubscribeMessage('sendTilePlaced')
  handleTilePlacementMessage(client: Socket, tileData: string): void {
    const message = { tileData: tileData, clientId: client.id };
    client.broadcast.emit('receiveTilePlaced', message);
  }

  @SubscribeMessage('sendTileRotated')
  handleTileInHandRotated(client: Socket, rotation: number): void {
    const message = { rotation: rotation, clientId: client.id };
    client.broadcast.emit('receiveTileRotated', message);
  }
}
