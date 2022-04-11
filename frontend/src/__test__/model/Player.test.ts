import { DEFAULT_PLAYERS_MEEPLE_COUNT, DEFAULT_TECHNOLOGY } from '../../constants/gameDefaults';
import Player from '../../model/Player';

// temporary classes
class Tile {}
class Meeple {
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }
}
// end of temporary classes

describe('Player model', () => {
  const testName = 'Adam';
  const testPlayer = new Player(testName);
  const testTile = new Tile();
  const testMeeple = new Meeple(testPlayer);
  const testPointsToAdd = 2;
  const testPointsToAddAfterReturnMeeple = 12;

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
    testPlayer.returnMeeple(testMeeple, testPointsToAddAfterReturnMeeple);
    expect(testPlayer.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT);
    expect(testPlayer.score).toBe(testPointsToAddAfterReturnMeeple);
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
    const expectedTotalScore = testPointsToAddAfterReturnMeeple + testPointsToAdd;
    expect(testPlayer.updateScore(testPointsToAdd)).toBe(expectedTotalScore);
    expect(testPlayer.score).toBe(expectedTotalScore);
  });
});
