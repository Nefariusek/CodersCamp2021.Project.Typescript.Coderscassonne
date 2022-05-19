import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

const rooms = [];

@WebSocketGateway(5001, { cors: true })
export class RoomGateway {
  @WebSocketServer() wss: Server;

  @SubscribeMessage('messageToRoom')
  handleRoomMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.wss.to(message.room).emit('messageToRoom', message);
  }

  @SubscribeMessage('createRoom')
  handleRoomCreate(client: Socket, room: string, password?: string) {
    if (!rooms.some((r) => r.room === room)) {
      client.join(room);
      client.emit('joinedRoom', room);
      rooms.push({ room, password });
      console.log(`create room: ${room}`);
    } else {
      client.emit('createRoomError', `Room ${room} already exists!`);
    }
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string, password?: string) {
    if (rooms.some((r) => r.room === room && r.password === password)) {
      client.join(room);
      client.emit('joinedRoom', room);
      console.log(`client: ${client.id} joins room: ${room}`);
    } else {
      client.emit('joinRoomError', `Wrong password!`);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
