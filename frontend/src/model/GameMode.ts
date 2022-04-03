import Settings from './Settings';

class GameMode extends Settings {
  gameMode: string;

  constructor(turnLength: number, tileAmount: number, boardSize: number, gameMode: string) {
    super(turnLength, tileAmount, boardSize);
    this.gameMode = gameMode;
  }
}

export default GameMode;
