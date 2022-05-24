enum WebSocketEvent {
  SEND_TILE_PLACED = 'sendTilePlaced',
  RECEIVE_TILE_PLACED = 'receiveTilePlaced',

  SEND_TILE_ROTATED = 'sendTileRotated',
  RECEIVE_TILE_ROTATED = 'receiveTileRotated',

  SEND_MEEPLE_PLACED = 'sendMeeplePlaced',
  RECEIVE_MEEPLE_PLACED = 'receiveMeeplePlaced',

  SEND_NEXT_PHASE = 'sendNextPhase',
  RECEIVE_NEXT_PHASE = 'receiveNextPhase',

  SEND_MESSAGE_TO_ROOM = 'sendMessageToRoom',
  RECEIVE_MESSAGE_TO_ROOM = 'receiveMessageToRoom',

  CLIENT_JOINED = 'clientJoined',
  YOU_ARE_HOST = 'youAreHost',

  CREATE_ROOM = 'createRoom',
  JOINED_ROOM = 'joinedRoom',

  SEND_MESSAGE = 'sendMessage',
  RECEIVE_MESSAGE = 'receiveMessage',
}

export default WebSocketEvent;
