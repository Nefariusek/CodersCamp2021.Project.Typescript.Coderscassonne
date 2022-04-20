/* eslint-disable no-confusing-arrow */
import Locations from '../constants/locations';
import Meeple from './Meeple';
import Player from './Player';
import Tile from './Tile';

class Project {
  public meeples: Meeple[];

  public tiles: Tile[];

  public type: Locations;

  public isFinished: boolean;

  constructor(meeple: Meeple, tile: Tile, type: Locations) {
    this.meeples = [meeple];
    this.tiles = [tile];
    this.type = type;
  }

  public get owner(): Player {
    const mode = this.meeples.reduce(
      (ownerMeeple, currentMeeple, _i, arr) =>
        arr.filter((meeple) => meeple.player === ownerMeeple.player).length >=
        arr.filter((meeple) => meeple.player === currentMeeple.player).length
          ? ownerMeeple
          : currentMeeple,
      this.meeples[0],
    );
    return mode.player;
  }

  public getCurrentScore(): number {
    let score: number;
    switch (this.type) {
      case Locations.ROAD || Locations.MONASTERY || Locations.GARDEN:
        score = this.tiles.length;
        break;

      case Locations.CITY:
        score = this.tiles.reduce((sum, curr) => (curr.isSpecial ? sum + 2 : sum + 1), 0);
        score = this.isFinished ? score * 2 : score;
        break;

      default:
        score = 0;
        break;
    }
    return score;
  }

  public finishProject() {
    this.isFinished = true;
    this.meeples.map((meeple) => meeple.player.returnMeeple(meeple));
    this.owner.updateScore(this.getCurrentScore());
  }

  public scoreUnfinishedProject() {
    this.owner.updateScore(this.getCurrentScore());
  }
}

export default Project;
