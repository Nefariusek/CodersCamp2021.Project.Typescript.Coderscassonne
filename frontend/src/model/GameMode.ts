import Settings, { boardSize, tileAmount, turnLength } from './Settings';

type mode = 'Classic' | 'Fast' | 'Custom';

class GameMode extends Settings {
  public gameMode: mode;

  constructor(
    turnLength: turnLength,
    tileAmount: tileAmount,
    boardSizeX: boardSize,
    boardSizeY: boardSize,
    gameMode: mode,
  ) {
    super(turnLength, tileAmount, boardSizeX, boardSizeY);
    this.gameMode = gameMode;
  }
}

export default GameMode;
