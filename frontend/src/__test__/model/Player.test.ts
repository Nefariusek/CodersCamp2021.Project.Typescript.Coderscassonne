import Player from '../../model/Player';
import Technologies from '../../constants/technologies';
import { defaultTechnology, defaultPlayersMeepleCount } from '../../constants/gameDefaults';

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
  const testNegativePointsToAdd = -2;
  const testPointsToAddAfterReturnMeeple = 12;

  test('Player is created', () => {
    expect(player.name).toBe(testName);
    expect(player.technology).toBe(Technologies.HTML);
    expect(player.computeScore()).toBe(0);
    expect(player.getPlacedTiles()).toEqual([]);
    expect(player.getMeepleCount()).toBe(defaultPlayersMeepleCount);
  });

  test("Player's info is valid", () => {
    const playersInfo = player.toString();
    const expectedPlayersInfo = `${testName} (${defaultTechnology}) has 0 points, placed 0 tiles, ${defaultPlayersMeepleCount} meeples left.`;
    expect(playersInfo).toBe(expectedPlayersInfo);
  });

  test('Player placed a tile', () => {
    player.updatePlacedTiles(testTile);
    expect(player.getPlacedTiles().length).toBe(1);
  });

  test("Get player's tiles", () => {
    const playersTiles = player.getPlacedTiles();
    expect(playersTiles.length).toBe(1);
  });

  test("Get player's meeple", () => {
    const meeple = player.getMeeple();
    expect(meeple).toBeDefined();
    expect(player.getMeepleCount()).toBe(defaultPlayersMeepleCount - 1);
  });

  test('Player returned a meeple', () => {
    player.returnMeeple(testMeeple, testPointsToAddAfterReturnMeeple);
    expect(player.getMeepleCount()).toBe(defaultPlayersMeepleCount);
    expect(player.computeScore()).toBe(testPointsToAddAfterReturnMeeple);
  });

  test('Player has no meeple', () => {
    for (let i = player.getMeepleCount(); i > 0; i--) {
      player.getMeeple();
    }
    const meeple = player.getMeeple();
    expect(meeple).toBeNull();
    expect(player.getMeepleCount()).toBe(0);
  });

  test('Points to add are negative', () => {
    const scoreBefore = player.computeScore();
    const scoreAfter = player.computeScore(testNegativePointsToAdd);
    expect(scoreAfter).toBe(scoreBefore);
  });

  test("Player's score is computed", () => {
    const expectedTotalScore = testPointsToAddAfterReturnMeeple + testPointsToAdd;
    expect(player.computeScore(testPointsToAdd)).toBe(expectedTotalScore);
    expect(player.computeScore()).toBe(expectedTotalScore);
  });
});
