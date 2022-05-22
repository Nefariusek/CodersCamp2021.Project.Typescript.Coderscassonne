enum WebSocketEvent {
  SEND_TILE_PLACED = 'sendTilePlaced',
  RECEIVE_TILE_PLACED = 'receiveTilePlaced',

  SEND_TILE_ROTATED = 'sendTileRotated',
  RECEIVE_TILE_ROTATED = 'receiveTileRotated',

  SEND_MEEPLE_PLACED = 'sendMeeplePlaced', // 'meeplePlacementMessage',
  RECEIVE_MEEPLE_PLACED = 'receiveMeeplePlaced', // 'messageToClientAfterMeeplePlacement',

  SEND_NEXT_PHASE = 'sendNextPhase',
  RECEIVE_NEXT_PHASE = 'receiveNextPhase',

  SEND_MESSAGE_TO_ROOM = 'sendMessageToRoom', // 'messageToRoom',
  RECEIVE_MESSAGE_TO_ROOM = 'receiveMessageToRoom', // 'messageToRoom',

  SEND_MESSAGE = 'sendMessage',
  RECEIVE_MESSAGE = 'receiveMessage',

  CREATE_ROOM = 'createRoom',
  JOINED_ROOM = 'joinedRoom',
}

export default WebSocketEvent;
