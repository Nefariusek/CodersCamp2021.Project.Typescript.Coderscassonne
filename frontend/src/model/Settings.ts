class Settings {
  turnLength: number;
  tileAmount: number;
  boardSize: number;

  constructor(turnLength: number, tileAmount: number, boardSize: number) {
    this.turnLength = turnLength;
    this.tileAmount = tileAmount;
    this.boardSize = boardSize;
  }
}

export default Settings;
