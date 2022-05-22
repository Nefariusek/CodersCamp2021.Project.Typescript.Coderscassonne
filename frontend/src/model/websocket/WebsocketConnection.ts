import { io, Socket } from 'socket.io-client';
import WebSocketEvent from '../../constants/webSocketEvents';

export default class WebSocketConnection {
  socket: Socket;
  isHost: boolean = false;

  constructor() {
    this.socket = io('http://localhost:5001');
    this.socket.emit('clientJoin');
    this.socket.on('youAreHost', () => {
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

  public emitMessage(message: string) {
    this.socket.emit(WebSocketEvent.SEND_MESSAGE, message);
  }

  public emitCreateRoom(message: string) {
    this.socket.emit(WebSocketEvent.CREATE_ROOM, message);
  }
}
