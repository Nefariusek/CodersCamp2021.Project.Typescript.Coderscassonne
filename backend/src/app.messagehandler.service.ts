import { Injectable } from '@nestjs/common';
import WebSocketEvent from './constants/webSocketEvents';
@Injectable()
export class MassageHandler {
  public messageType: string;
  private readonly clientId: any;
  public message: any;

  createMessage(clientId: any, text: string) {
    switch (this.messageType) {
      case WebSocketEvent.SEND_MEEPLE_PLACED: {
        this.message = { client: clientId, text: text };
      }
      case WebSocketEvent.SEND_MESSAGE: {
        this.message = { client: clientId, text: text };
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
