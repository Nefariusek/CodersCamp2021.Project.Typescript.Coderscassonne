import GameModeParser from '../../components/GameModeParser';
import { JSONData } from '../../mocks/mocksTiles';

const jsonData = JSONData;
const tileArray = GameModeParser(jsonData);

test('One tile has all the attributes', () => {
  const tile = tileArray[0];

  expect(tile.edges.bottom).toBe('field');
  expect(tile.edges.left).toBe('road');
  expect(tile.edges.right).toBe('road');
  expect(tile.edges.top).toBe('field');
});
