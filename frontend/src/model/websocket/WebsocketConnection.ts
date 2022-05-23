import { io, Socket } from 'socket.io-client';
import WebSocketEvent from '../../constants/webSocketEvents';

export default class WebSocketConnection {
  socket: Socket;
  isHost: boolean = false;

  constructor() {
    this.socket = io('http://localhost:5001');
    this.socket.emit(WebSocketEvent.CLIENT_JOINED);
    this.socket.on(WebSocketEvent.YOU_ARE_HOST, () => {
      this.isHost = true;
    });
  }

  public emitTilePlaced(message: string) {
    this.socket.emit(WebSocketEvent.SEND_TILE_PLACED, message);
  }

  public emitMeeplPlaced(message: string) {
    this.socket.emit(WebSocketEvent.SEND_MEEPLE_PLACED, message);
  }

  public emitRotation(message: number) {
    this.socket.emit(WebSocketEvent.SEND_TILE_ROTATED, message);
  }

  public emitNextPhase(message: boolean) {
    this.socket.emit(WebSocketEvent.SEND_NEXT_PHASE, message);
  }

  public emitCreateRoom(message: string) {
    this.socket.emit(WebSocketEvent.CREATE_ROOM, message);
  }

  public emitMessage(message: string) {
    this.socket.emit(WebSocketEvent.SEND_MESSAGE, message);
  }
}
