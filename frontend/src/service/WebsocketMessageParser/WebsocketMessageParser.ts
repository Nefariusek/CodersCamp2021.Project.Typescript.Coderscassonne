import { Rotation } from '../../model/Tile';

export type TilePlacementMessage = {
  id: string;
  row: number;
  column: number;
  rotation: Rotation;
};

export type MeeplePlacementMessage = {
  id: string;
  row: number;
  column: number;
};

/**
 * WebsocketMessageParser can be used to parse both tiles and meeples messages sent using a websocket.
 * It parses websocket messages both ways, ie when message is given in the form of a string,
 * it converts it into the corresponding message object and vice versa:
 * when we give message object we will get a string convenient to send via websocket.
 * For example: WebsocketMessageParser({ id: '001_2', row: 3, column: 5, rotation: 90 }, "tilePlaced"))
 * will give "001_2_3_5_90" string.
 */
function WebsocketMessageParser(message: string, eventType: 'tilePlaced'): TilePlacementMessage;

function WebsocketMessageParser(message: string, eventType: 'meeplePlaced'): MeeplePlacementMessage;

function WebsocketMessageParser(message: TilePlacementMessage, eventType: 'tilePlaced'): string;

function WebsocketMessageParser(message: MeeplePlacementMessage, eventType: 'meeplePlaced'): string;

function WebsocketMessageParser(
  message: string | TilePlacementMessage | MeeplePlacementMessage,
  eventType: 'tilePlaced' | 'meeplePlaced',
): TilePlacementMessage | MeeplePlacementMessage | string {
  if (typeof message !== 'string') {
    return Object.values(message).join('_');
  } else if (eventType === 'tilePlaced') {
    const splitMessageArray = message.split('_');
    const tilePlacementMessage = Object.assign(
      {},
      { id: `${splitMessageArray[0]}_${splitMessageArray[1]}` },
      { row: +splitMessageArray[2] },
      { column: +splitMessageArray[3] },
      { rotation: +splitMessageArray[4] },
    ) as TilePlacementMessage;

    return tilePlacementMessage;
  } else {
    const splitMessageArray = message.split('_');
    const mepplePlacementMessage = Object.assign(
      {},
      { id: `${splitMessageArray[0]}` },
      { row: +splitMessageArray[1] },
      { column: +splitMessageArray[2] },
    ) as MeeplePlacementMessage;

    return mepplePlacementMessage;
  }
}

export default WebsocketMessageParser;
