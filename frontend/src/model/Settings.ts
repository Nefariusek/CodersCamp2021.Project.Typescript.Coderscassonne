type boardSize = 2 | 4 | 8 | 16 | 32 | 64;
type tileAmount = 16 | 32 | 64 | 128;
type turnLength = 5 | 10 | 15 | 30 | 60;

class Settings {
  public turnLength: turnLength;
  public tileAmount: tileAmount;
  public boardSizeX: boardSize;
  public boardSizeY: boardSize;

  constructor(turnLength: turnLength, tileAmount: tileAmount, boardSizeX: boardSize, boardSizeY: boardSize) {
    this.turnLength = turnLength;
    this.tileAmount = tileAmount;
    this.boardSizeX = boardSizeX;
    this.boardSizeY = boardSizeY;
  }
}

export default Settings;
export type { boardSize, turnLength, tileAmount };
