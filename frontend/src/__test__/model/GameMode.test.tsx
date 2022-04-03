import GameMode from '../../model/GameMode';

const number = 64;
const mode = 'Normal';

const gameMode = new GameMode(number, number, number, mode);

test('gameMode class has all the attributes', () => {
  expect(gameMode.boardSize).toBe(number);
  expect(gameMode.tileAmount).toBe(number);
  expect(gameMode.turnLength).toBe(number);
  expect(gameMode.gameMode).toBe(mode);
});
