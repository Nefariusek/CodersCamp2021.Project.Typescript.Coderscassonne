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
  handleRoomCreate(
    client: Socket,
    room: { name: string; password: string | undefined },
  ) {
    if (!rooms.some((r) => r.room === room.name)) {
      rooms.push({ room: room.name, password: room.password });
    } else {
      client.emit('createRoomError', `Room ${room.name} already exists!`);
    }
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(
    client: Socket,
    room: { name: string; password: string | undefined },
  ) {
    if (
      rooms.some((r) => r.room === room.name && r.password === room.password)
    ) {
      client.join(room.name);
      client.emit('joinedRoom', room.name);
      console.log(`client: ${client.id} joins room: ${room.name}`);
    } else {
      client.emit('joinRoomError', `Wrong password!`);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('getRooms')
  handleGetRooms(client: Socket) {
    client.emit(
      'availableRooms',
      rooms.map((r) => r.room),
    );
    console.log(rooms);
    console.log(
      'wyslalem:',
      rooms.map((r) => r.room),
    );
  }
}
