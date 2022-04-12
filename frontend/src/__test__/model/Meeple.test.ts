import Meeple from '../../model/Meeple';
import Player from '../../model/Player';

const player = new Player('Adam');

const meeple = new Meeple(player);

test('Meeple class is constructed', () => {
  expect(meeple.player).toBe(player);
  expect(meeple.isPlaced).not.toBeTruthy;
  expect(meeple.placedAt).toBeUndefined;
  expect(meeple.tile).toBeUndefined;
});
