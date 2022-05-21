import GameMode from '../../model/GameMode';

describe('GameMode model', () => {
  const time = 30;
  const number = 32;
  const mode = 'Classic';

  const gameMode = new GameMode(time, number, number, number, mode);

  test('gameMode class has all the attributes', () => {
    expect(gameMode.boardSizeX).toBe(number);
    expect(gameMode.boardSizeY).toBe(number);
    expect(gameMode.tileAmount).toBe(number);
    expect(gameMode.turnLength).toBe(time);
    expect(gameMode.gameMode).toBe(mode);
  });
});
