import { DEFAULT_PLAYERS_MEEPLE_COUNT, DEFAULT_TECHNOLOGY } from '../../constants/gameDefaults';
import Locations from '../../constants/locations';
import Meeple from '../../model/Meeple';
import Player from '../../model/Player';
import Tile from '../../model/Tile';

describe('Player model', () => {
  const testName = 'Adam';
  const testPlayer = new Player(testName);
  const testMeeple = new Meeple(testPlayer);
  const testTile = new Tile(
    {
      bottom: Locations.CITY,
      left: Locations.FIELD,
      right: Locations.MONASTERY,
      top: Locations.ROAD,
    },
    Locations.TAVERN,
    false,
    'first',
  );
  const testPointsToAdd = 2;

  test('Player is created', () => {
    expect(testPlayer.name).toBe(testName);
    expect(testPlayer.technology).toBe(DEFAULT_TECHNOLOGY);
    expect(testPlayer.score).toBe(0);
    expect(testPlayer.placedTiles).toEqual([]);
    expect(testPlayer.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT);
  });

  test("Player's info is valid", () => {
    const playersInfo = testPlayer.getPlayerInfo();
    const expectedPlayersInfo = `${testName} (${DEFAULT_TECHNOLOGY}) has 0 points, ${DEFAULT_PLAYERS_MEEPLE_COUNT} meeples left and placed 0 tiles.`;
    expect(playersInfo).toBe(expectedPlayersInfo);
  });

  test('Player placed a tile', () => {
    testPlayer.placeTile = testTile;
    expect(testPlayer.placedTiles.length).toBe(1);
  });

  test("Get player's tiles", () => {
    const playersTiles = testPlayer.placedTiles;
    expect(playersTiles.length).toBe(1);
  });

  test("Get player's meeple", () => {
    const meeple = testPlayer.getMeeple();
    expect(meeple).toBeDefined();
    expect(testPlayer.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT - 1);
  });

  test('Player returned a meeple', () => {
    testPlayer.returnMeeple(testMeeple);
    expect(testPlayer.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT);
  });

  test('Player has no meeple', () => {
    for (let i = testPlayer.getMeepleCount(); i > 0; i--) {
      testPlayer.getMeeple();
    }
    const meeple = testPlayer.getMeeple();
    expect(meeple).toBeNull();
    expect(testPlayer.getMeepleCount()).toBe(0);
  });

  test("Player's score is computed", () => {
    const expectedTotalScore = testPointsToAdd;
    expect(testPlayer.updateScore(testPointsToAdd)).toBe(expectedTotalScore);
    expect(testPlayer.score).toBe(expectedTotalScore);
  });
});
