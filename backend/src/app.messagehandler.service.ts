import { Injectable } from '@nestjs/common';
import {
  defaultMessage,
  defaultMessageToCLient,
  meeplePlacementEvent,
  meeplePlacementReceive,
} from './constants';

@Injectable()
export class MassageHandler {
  public messageType: string;
  private readonly clientId: any;
  public message: string;

  createMessage(clientId: any, text: string) {
    console.log(this.messageType);
    switch (this.messageType) {
      case meeplePlacementReceive: {
        this.message = `Client with id: ${clientId} put a meeple: ${text}`;
      }
      case defaultMessage: {
        this.message = `${clientId} sent a message: ${text}`;
      }
    }
  }
  sendMassage() {
    let event = '';
    switch (this.messageType) {
      case meeplePlacementReceive: {
        event = meeplePlacementEvent;
        break;
      }
      case defaultMessage: {
        event = defaultMessageToCLient;
        break;
      }
    }
    return { event: event, data: this.message };
  }
}
