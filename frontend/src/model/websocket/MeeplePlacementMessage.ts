import { BaseMessageInterface } from './WebSocketMessageParser';

export default class MeeplePlacementMessage implements BaseMessageInterface {
  public id: string;
  public row: number;
  public column: number;

  constructor(message: string) {
    const splitMessageArray = message.split('_');
    if (splitMessageArray.length === 3) {
      this.id = `${splitMessageArray[0]}`;
      this.row = +splitMessageArray[1];
      this.column = +splitMessageArray[2];
    }
  }

  get messageString(): string {
    return `${this.id}_${this.row}_${this.column}`;
  }
}
