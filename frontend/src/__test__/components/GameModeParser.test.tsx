import GameModeParser from '../../components/GameModeParser';
import { JSONData } from '../../mocks/mocks';

const jsonData = JSONData;
const length = 3;
const tileArray = GameModeParser(jsonData);

test('Array has all the tiles', () => {
  expect(tileArray.length).toBe(length);
});

test('One tile has all the attributes', () => {
  const tile = tileArray[0];

  expect(tile.edges.bottom).toBe('field');
  expect(tile.edges.left).toBe('field');
  expect(tile.edges.right).toBe('field');
  expect(tile.edges.top).toBe('field');
  expect(tile.placedBy).toBe('player1');
  expect(tile.placementTurn).toBe(10);
});
