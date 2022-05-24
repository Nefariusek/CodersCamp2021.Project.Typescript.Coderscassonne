import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import WebSocketEvent from './constants/webSocketEvents';

import { Server, Socket } from 'socket.io';

export const rooms = [];

@WebSocketGateway(5001, { cors: true })
export class RoomGateway {
  @WebSocketServer() wss: Server;

  @SubscribeMessage(WebSocketEvent.RECEIVE_MESSAGE_FROM_ROOM)
  handleRoomMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.wss
      .to(message.room)
      .emit(WebSocketEvent.SEND_MESSAGE_TO_ROOM, message);
  }

  @SubscribeMessage(WebSocketEvent.CREATE_ROOM)
  handleRoomCreate(
    client: Socket,
    room: { name: string; password: string | undefined },
  ) {
    if (!rooms.some((r) => r.room === room.name)) {
      rooms.push({ room: room.name, password: room.password, players: 0 });
      client.broadcast.emit(
        WebSocketEvent.SEND_ROOMS,
        rooms
          .filter((r) => r.players < 5)
          .map((r) => {
            return { name: r.room, password: !!r.password, players: r.players };
          }),
      );
    } else {
      this.wss.emit(
        WebSocketEvent.CREATE_ROOM_ERROR,
        `Room ${room.name} already exists!`,
      );
    }
  }

  @SubscribeMessage(WebSocketEvent.JOIN_ROOM)
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
        client.emit(WebSocketEvent.JOINED_ROOM, room.name);
        console.log(`client: ${client.id} joins room: ${room.name}`);
        client.broadcast.emit(
          WebSocketEvent.SEND_ROOMS,
          rooms
            .filter((r) => r.players < 5)
            .map((r) => {
              return {
                name: r.room,
                password: !!r.password,
                players: r.players,
              };
            }),
        );
      } else {
        client.emit(
          WebSocketEvent.JOIN_ROOM_ERROR,
          `Room ${room.name} is full!`,
        );
      }
    } else {
      client.emit(WebSocketEvent.JOIN_ROOM_ERROR, `Wrong password!`);
    }
  }

  @SubscribeMessage(WebSocketEvent.LEAVE_ROOM)
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    rooms.find((r) => r.room === room).players--;
    client.emit(WebSocketEvent.LEFT_ROOM, room);
    client.broadcast.emit(
      WebSocketEvent.SEND_ROOMS,
      rooms
        .filter((r) => r.players < 5)
        .map((r) => {
          return { name: r.room, password: !!r.password, players: r.players };
        }),
    );
  }

  @SubscribeMessage(WebSocketEvent.GET_ROOMS)
  handleGetRooms(client: Socket) {
    client.emit(
      WebSocketEvent.SEND_ROOMS,
      rooms
        .filter((r) => r.players < 5)
        .map((r) => {
          return { name: r.room, password: !!r.password, players: r.players };
        }),
    );
  }
}
