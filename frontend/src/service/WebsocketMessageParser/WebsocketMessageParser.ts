import { Rotation } from '../../model/Tile';

export type TilePlacementMessage = {
  tileId: string;
  row: number;
  column: number;
  rotation: Rotation;
};

export type MeeplePlacementMessage = {
  meepleId: string;
  row: number;
  column: number;
};

function WebsocketMessageParser(message: string, eventType: 'tilePlaced'): TilePlacementMessage;

function WebsocketMessageParser(message: string, eventType: 'meeplePlaced'): MeeplePlacementMessage;

function WebsocketMessageParser(
  message: string,
  eventType: 'tilePlaced' | 'meeplePlaced',
): TilePlacementMessage | MeeplePlacementMessage {
  if (eventType === 'tilePlaced') {
    const splitMessageArray = message.split('_');
    const tilePlacementMessage = Object.assign(
      {},
      { tileId: `${splitMessageArray[0]}_${splitMessageArray[1]}` },
      { row: +splitMessageArray[2] },
      { column: +splitMessageArray[3] },
      { rotation: +splitMessageArray[4] },
    ) as TilePlacementMessage;

    return tilePlacementMessage;
  } else {
    const splitMessageArray = message.split('_');
    const mepplePlacementMessage = Object.assign(
      {},
      { meepleId: `${splitMessageArray[0]}` },
      { row: +splitMessageArray[1] },
      { column: +splitMessageArray[2] },
    ) as MeeplePlacementMessage;

    return mepplePlacementMessage;
  }
}

export default WebsocketMessageParser;
