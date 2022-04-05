import Technologies from '../constants/technologies';
import { defaultTechnology, defaultPlayersMeepleCount } from '../constants/gameDefaults';

// temporary classes
class Tile {}
class Meeple {
  player: Player;
  constructor(player: Player) {
    this.player = player;
  }
}
// end of temporary classes

class Player {
  public name: string;
  public technology: Technologies;
  private score: number;
  private placedTiles: Tile[];
  private meepleList: Meeple[];

  constructor(name: string, technology: Technologies = defaultTechnology) {
    this.name = name;
    this.technology = technology;

    this.initializePlayerState();
  }

  initializePlayerState() {
    this.score = 0;
    this.placedTiles = [];
    this.meepleList = [];

    for (let i = 0; i < defaultPlayersMeepleCount; i++) {
      this.meepleList.push(new Meeple(this));
    }
  }

  computeScore(pointsToAdd: number = 0): number {
    if (pointsToAdd >= 0) {
      return (this.score += pointsToAdd);
    } else {
      console.log('Points to add should not be negative!');
      return this.score;
    }
  }

  updatePlacedTiles(tile: Tile): void {
    this.placedTiles.push(tile);
  }

  getPlacedTiles(): Tile[] {
    return this.placedTiles;
  }

  getMeeple(): Meeple | null {
    const meepleCount = this.meepleList.length;
    if (meepleCount > 0) {
      const meeple = this.meepleList[meepleCount - 1];
      this.meepleList.pop();
      return meeple;
    } else {
      return null;
    }
  }

  getMeepleCount(): number {
    return this.meepleList.length;
  }

  returnMeeple(meeple: Meeple, pointsToAdd: number): void {
    this.score += pointsToAdd;
    this.meepleList.push(meeple);
  }

  toString(): string {
    return `${this.name} (${this.technology}) has ${this.score} points, placed ${this.placedTiles.length} tiles, ${this.meepleList.length} meeples left.`;
  }
}

export default Player;
