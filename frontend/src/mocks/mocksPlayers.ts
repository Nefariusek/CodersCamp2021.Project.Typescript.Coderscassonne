import Technologies from '../constants/technologies';
import Player from '../model/Player';

const mocksPlayers = [
  new Player('Player 1', Technologies.HTML),
  new Player('Player 2', Technologies.JS),
  new Player('Player 3', Technologies.REDUX),
  new Player('Player 4', Technologies.TS),
  new Player('Player 5', Technologies.NODE),
];

export default mocksPlayers;
