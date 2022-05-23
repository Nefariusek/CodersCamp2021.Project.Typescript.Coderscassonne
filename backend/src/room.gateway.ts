import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
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
      rooms.push({ room: room.name, password: room.password, players: 0 });
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
      if (rooms.find((r) => r.room === room.name).players < 5) {
        client.join(room.name);
        rooms.find((r) => r.room === room.name).players++;
        client.emit('joinedRoom', room.name);
        console.log(`client: ${client.id} joins room: ${room.name}`);
      } else {
        client.emit('joinRoomError', `Room ${room.name} is full!`);
      }
    } else {
      client.emit('joinRoomError', `Wrong password!`);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    rooms.find((r) => r.room === room).players--;
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('getRooms')
  handleGetRooms(client: Socket) {
    client.emit(
      'availableRooms',
      rooms
        .filter((r) => r.players < 5)
        .map((r) => {
          return { name: r.room, password: !!r.password, players: r.players };
        }),
    );
  }
}
