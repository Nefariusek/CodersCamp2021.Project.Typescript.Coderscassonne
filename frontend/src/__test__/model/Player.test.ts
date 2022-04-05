import Player from '../../model/Player';
import Technologies from '../../constants/technologies';
import { DEFAULT_TECHNOLOGY, DEFAULT_PLAYERS_MEEPLE_COUNT } from '../../constants/gameDefaults';

const player = new Player('Adam');

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
  const testTile = new Tile();
  const testMeeple = new Meeple(player);
  const testPointsToAdd = 2;
  const testPointsToAddAfterReturnMeeple = 12;

  test('Player is created', () => {
    expect(player.name).toBe(testName);
    expect(player.technology).toBe(Technologies.HTML);
    expect(player.score).toBe(0);
    expect(player.placedTiles).toEqual([]);
    expect(player.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT);
  });

  test("Player's info is valid", () => {
    const playersInfo = player.getPlayerInfo();
    const expectedPlayersInfo = `${testName} (${DEFAULT_TECHNOLOGY}) has 0 points, ${DEFAULT_PLAYERS_MEEPLE_COUNT} meeples left and placed 0 tiles.`;
    expect(playersInfo).toBe(expectedPlayersInfo);
  });

  test('Player placed a tile', () => {
    player.placeTile = testTile;
    expect(player.placedTiles.length).toBe(1);
  });

  test("Get player's tiles", () => {
    const playersTiles = player.placedTiles;
    expect(playersTiles.length).toBe(1);
  });

  test("Get player's meeple", () => {
    const meeple = player.getMeeple();
    expect(meeple).toBeDefined();
    expect(player.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT - 1);
  });

  test('Player returned a meeple', () => {
    player.returnMeeple(testMeeple, testPointsToAddAfterReturnMeeple);
    expect(player.getMeepleCount()).toBe(DEFAULT_PLAYERS_MEEPLE_COUNT);
    expect(player.score).toBe(testPointsToAddAfterReturnMeeple);
  });

  test('Player has no meeple', () => {
    for (let i = player.getMeepleCount(); i > 0; i--) {
      player.getMeeple();
    }
    const meeple = player.getMeeple();
    expect(meeple).toBeNull();
    expect(player.getMeepleCount()).toBe(0);
  });

  test("Player's score is computed", () => {
    const expectedTotalScore = testPointsToAddAfterReturnMeeple + testPointsToAdd;
    expect(player.updateScore(testPointsToAdd)).toBe(expectedTotalScore);
    expect(player.score).toBe(expectedTotalScore);
  });
});
