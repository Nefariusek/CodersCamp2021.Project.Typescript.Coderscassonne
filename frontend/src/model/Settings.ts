class Settings {
  turnLength: number;
  tileAmount: number;
  boardSize: number;
  gameMode: string;

  constructor(turnLength: number, tileAmount: number, boardSize: number, gameMode: string) {
    this.turnLength = turnLength;
    this.tileAmount = tileAmount;
    this.boardSize = boardSize;
    this.gameMode = gameMode;
  }
}

export default Settings;
