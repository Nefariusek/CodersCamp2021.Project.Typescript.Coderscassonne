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
  RECEIVE_MESSAGE_FROM_ROOM = 'receiveMessageToRoom',

  SEND_MESSAGE = 'sendMessage',
  RECEIVE_MESSAGE = 'receiveMessage',

  CLIENT_JOINED = 'clientJoined',
  YOU_ARE_HOST = 'youAreHost',

  CREATE_ROOM = 'createRoom',
  CREATE_ROOM_ERROR = 'createRoomError',

  JOIN_ROOM = 'joinRoom',
  JOINED_ROOM = 'joinedRoom',
  JOIN_ROOM_ERROR = 'joinRoomError',

  LEAVE_ROOM = 'leaveRoom',
  LEFT_ROOM = 'leftRoom',

  GET_ROOMS = 'getRooms',
  SEND_ROOMS = 'availableRooms',

  GET_PLAYERS = 'getPlayers',
  SEND_PLAYERS = 'sendPlayers',

  CREATE_PLAYER = 'createPlayer',
  CREATE_PLAYER_ERROR = 'createPlayerError',

  READY = 'ready',
  CONTINUE = 'continue',

  GET_TECH = 'getTechnologies',
  SEND_TECH = 'sendTechnologies',

  CHANGE_ORDER = 'changeOrder',
}

export default WebSocketEvent;
