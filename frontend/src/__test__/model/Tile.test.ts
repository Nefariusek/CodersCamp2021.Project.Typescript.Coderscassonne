import Locations from '../../constants/locations';
import Tile from '../../model/Tile';

test('new Tile is created', () => {
  const newTile = new Tile(Locations.CITY, Locations.FIELD, Locations.CITY, Locations.MONASTERY);
  expect(newTile.edgeLeft).toBe(Locations.CITY);
  expect(newTile.edgeRight).toBe(Locations.FIELD);
  expect(newTile.edgeTop).toBe(Locations.CITY);
  expect(newTile.edgeBottom).toBe(Locations.MONASTERY);
});
