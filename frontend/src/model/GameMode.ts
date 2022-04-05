import Settings, { BoardSize, TileAmount, TurnLength } from './Settings';

type Mode = 'Classic' | 'Fast' | 'Custom';

class GameMode extends Settings {
  public gameMode: Mode;

  constructor(
    turnLength: TurnLength,
    tileAmount: TileAmount,
    boardSizeX: BoardSize,
    boardSizeY: BoardSize,
    gameMode: Mode,
  ) {
    super(turnLength, tileAmount, boardSizeX, boardSizeY);
    this.gameMode = gameMode;
  }
}

export default GameMode;
