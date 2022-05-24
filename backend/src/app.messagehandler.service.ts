import { Injectable } from '@nestjs/common';
// import {
  // defaultMessage,
  // defaultMessageToCLient,
  // meeplePlacementEvent,
  // meeplePlacementReceive,
// } from './constants';
import WebSocketEvent from './constants/webSocketEvents';

@Injectable()
export class MassageHandler {
  public messageType: string;
  private readonly clientId: any;
  public message: string;

  createMessage(clientId: any, text: string) {
    console.log(this.messageType);
    switch (this.messageType) {
      case WebSocketEvent.SEND_MEEPLE_PLACED: {
        this.message = `Client with id: ${clientId} put a meeple: ${text}`;
      }
      case WebSocketEvent.SEND_MESSAGE: {
        this.message = `${clientId} sent a message: ${text}`;
      }
    }
  }
  sendMassage() {
    let event = '';
    switch (this.messageType) {
      case WebSocketEvent.SEND_MEEPLE_PLACED: {
        event = WebSocketEvent.RECEIVE_MEEPLE_PLACED;
        break;
      }
      case WebSocketEvent.SEND_MESSAGE: {
        event = WebSocketEvent.RECEIVE_MESSAGE;
        break;
      }
    }
    return { event: event, data: this.message };
  }
}
