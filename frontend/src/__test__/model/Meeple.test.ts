import Meeple from '../../model/Meeple';
class Player {}

const player = new Player();

const meeple = new Meeple(player);

test('Meeple class is constructed', () => {
  expect(meeple.playerRef).toBe(player);
  expect(meeple.isPlaced).not.toBeTruthy;
  expect(meeple.placedAt).toBeUndefined;
  expect(meeple.tileRef).toBeUndefined;
});
