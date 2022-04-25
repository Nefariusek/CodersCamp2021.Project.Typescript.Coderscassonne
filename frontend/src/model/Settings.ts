type BoardSize = 2 | 4 | 8 | 16 | 32 | 64;
type TileAmount = 16 | 32 | 64 | 128;
type TurnLength = 5 | 10 | 15 | 30 | 60;

class Settings {
  public turnLength: TurnLength;

  public tileAmount: TileAmount;

  public boardSizeX: BoardSize;

  public boardSizeY: BoardSize;

  constructor(turnLength: TurnLength, tileAmount: TileAmount, boardSizeX: BoardSize, boardSizeY: BoardSize) {
    this.turnLength = turnLength;
    this.tileAmount = tileAmount;
    this.boardSizeX = boardSizeX;
    this.boardSizeY = boardSizeY;
  }
}

export default Settings;
export type { BoardSize, TileAmount, TurnLength };
