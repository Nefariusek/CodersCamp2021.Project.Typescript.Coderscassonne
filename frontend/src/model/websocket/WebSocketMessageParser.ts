import MeeplePlacementMessage from './MeeplePlacementMessage';
import TilePlacementMessage from './TilePlacementMessage';

export enum WebSocketEvent {
  SEND_TILE_PLACED = 'sendTilePlaced',
  SEND_MEEPLE_PLACED = 'sendMeeplePlaced',
  RECEIVE_TILE_PLACED = 'receiveTilePlaced',
  RECEIVE_MEEPLE_PLACED = 'receiveMeeplePlaced',
}

type messageType = string | TilePlacementMessage | MeeplePlacementMessage;
type eventType =
  | WebSocketEvent.RECEIVE_TILE_PLACED
  | WebSocketEvent.RECEIVE_MEEPLE_PLACED
  | WebSocketEvent.SEND_TILE_PLACED
  | WebSocketEvent.SEND_MEEPLE_PLACED;
type parsedMessageType = TilePlacementMessage | MeeplePlacementMessage | string | undefined;

/**
 * WebSocketMessageParser can be used to parse both tiles and meeples messages sent using a websocket.
 * It parses websocket messages both ways, ie when message is given in the form of a string,
 * it converts it into the corresponding message object (TilePlacementMessage or MeeplePlacementMessage)
 * and vice versa: when we give message object we will get a string convenient to send via websocket.
 * For example: WebsocketMessageParser.parse("001_2_3_5_90", WebSocketEvent.RECEIVE_TILE_PLACED))
 * will return TilePlacementMessage object with informations about tile id, rotation, row and column of placement.
 */
export default class WebSocketMessageParser {
  parse(message: string, eventType: WebSocketEvent.RECEIVE_TILE_PLACED): TilePlacementMessage;
  parse(message: string, eventType: WebSocketEvent.RECEIVE_MEEPLE_PLACED): MeeplePlacementMessage;
  parse(message: TilePlacementMessage, eventType: WebSocketEvent.SEND_TILE_PLACED): string;
  parse(message: MeeplePlacementMessage, eventType: WebSocketEvent.SEND_MEEPLE_PLACED): string;
  parse(message: messageType, eventType: eventType): parsedMessageType {
    if (typeof message !== 'string') {
      return message.messageString;
    } else if (eventType === WebSocketEvent.RECEIVE_TILE_PLACED) {
      return new TilePlacementMessage(message);
    } else if (eventType === WebSocketEvent.RECEIVE_MEEPLE_PLACED) {
      return new MeeplePlacementMessage(message);
    }
    return undefined;
  }
}

export interface BaseMessageInterface {
  id: string;
  row: number;
  column: number;
}
