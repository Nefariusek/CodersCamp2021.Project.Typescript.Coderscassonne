import Locations from '../../constants/locations';
import mocksPlayers from '../../mocks/mocksPlayers';
import Project from '../../model/Project';
import Tile from '../../model/Tile';

describe('Project model', () => {
  const meeple = mocksPlayers[0].getMeeple();
  const tile = new Tile(
    {
      bottom: Locations.CITY,
      left: Locations.FIELD,
      right: Locations.FIELD,
      top: Locations.ROAD,
    },
    [Locations.FIELD],
    false,
    'first',
  );
  let city: Project;
  if (meeple) {
    city = new Project(Locations.CITY, tile);
    city.meeples.push(meeple);
  }
  test('Model Project has all attributes', () => {
    expect(city.type).toBe(Locations.CITY);
    expect(city.owner).toBe(mocksPlayers[0]);
    expect(city.isFinished).not.toBeTruthy;
  });

  test('Owner is indicated correctly', () => {
    const meeple1 = mocksPlayers[1].getMeeple();
    if (meeple1) {
      city.meeples.push(meeple1);
    }
    const meeple2 = mocksPlayers[1].getMeeple();
    if (meeple2) {
      city.meeples.push(meeple2);
    }
    expect(city.owner).toBe(mocksPlayers[1]);
  });
});
