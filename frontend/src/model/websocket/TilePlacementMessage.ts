import { BaseMessageInterface } from './WebSocketMessageParser';
import { Rotation } from '../Tile';

export default class TilePlacementMessage implements BaseMessageInterface {
  public id: string;
  public row: number;
  public column: number;
  public rotation: Rotation;

  constructor(message: string) {
    const splitMessageArray = message.split('_');
    if (splitMessageArray.length === 5) {
      this.id = `${splitMessageArray[0]}_${splitMessageArray[1]}`;
      this.row = +splitMessageArray[2];
      this.column = +splitMessageArray[3];
      this.rotation = +splitMessageArray[4] as Rotation;
    }
  }

  get messageString(): string {
    return `${this.id}_${this.row}_${this.column}_${this.rotation}`;
  }
}
