import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import WebSocketEvent from './constants/webSocketEvents';
import { rooms } from './room.gateway';

const playersInRooms = [];

@WebSocketGateway(5001, { cors: true })
export class PlayerGateway {
  @WebSocketServer() wss: Server;
  @SubscribeMessage(WebSocketEvent.CREATE_PLAYER)
  handlePlayerCreate(client: Socket, rec: { room: string; player }) {
    if (rooms.some((r) => r.room === rec.room)) {
      if (!playersInRooms.some((r) => r.room === rec.room)) {
        playersInRooms.push({
          room: rec.room,
          numberOfPlayers: 0,
          players: [],
        });
      }
      playersInRooms.find((r) => r.room === rec.room).players.push(rec.player);
      this.wss
        .to(rec.room)
        .emit(
          WebSocketEvent.SEND_PLAYERS,
          playersInRooms.find((r) => r.room === rec.room).players,
        );
      this.wss.to(rec.room).emit(
        WebSocketEvent.SEND_TECH,
        playersInRooms
          .find((r) => r.room === rec.room)
          .players.map((p) => p.playerMeeple),
      );
    } else {
      this.wss.emit(
        WebSocketEvent.CREATE_PLAYER_ERROR,
        `Room ${rec.room} not found!`,
      );
    }
  }
  @SubscribeMessage(WebSocketEvent.GET_PLAYERS)
  handleGetPlayers(client: Socket, room: string) {
    if (!playersInRooms.some((r) => r.room === room)) {
      playersInRooms.push({
        room: room,
        numberOfPlayers: 0,
        players: [],
      });
    }
    client.emit(
      WebSocketEvent.SEND_PLAYERS,
      playersInRooms.find((r) => r.room === room).players,
    );
  }
  @SubscribeMessage(WebSocketEvent.GET_TECH)
  handleGetTechnologies(client: Socket, room: string) {
    if (!playersInRooms.some((r) => r.room === room)) {
      playersInRooms.push({
        room: room,
        numberOfPlayers: 0,
        players: [],
      });
    }
    client.emit(
      WebSocketEvent.SEND_TECH,
      playersInRooms
        .find((r) => r.room === room)
        .players.map((p) => p.playerMeeple),
    );
  }
  @SubscribeMessage(WebSocketEvent.CONTINUE)
  handleContinue(client: Socket, room: string) {
    if (!playersInRooms.some((r) => r.room === room)) {
      this.wss.emit(
        WebSocketEvent.CREATE_PLAYER_ERROR,
        `Room ${room} not found!`,
      );
    }
    playersInRooms.find((r) => r.room === room).numberOfPlayers++;
    if (
      playersInRooms.find((r) => r.room === room).numberOfPlayers ===
        rooms.find((r) => r.room === room).players &&
      rooms.find((r) => r.room === room).players > 1
    ) {
      this.wss.to(room).emit(WebSocketEvent.READY);
      rooms.find((r) => r.room === room).players = 10;
    }
  }

  @SubscribeMessage(WebSocketEvent.CHANGE_ORDER)
  handleChangeOrder(client: Socket, rec: { room: string; player: number }) {
    [
      playersInRooms.find((r) => r.room === rec.room).players[rec.player - 1],
      playersInRooms.find((r) => r.room === rec.room).players[rec.player],
    ] = [
      playersInRooms.find((r) => r.room === rec.room).players[rec.player],
      playersInRooms.find((r) => r.room === rec.room).players[rec.player - 1],
    ];
    this.wss
      .to(rec.room)
      .emit(
        WebSocketEvent.SEND_PLAYERS,
        playersInRooms.find((r) => r.room === rec.room).players,
      );
  }
}
