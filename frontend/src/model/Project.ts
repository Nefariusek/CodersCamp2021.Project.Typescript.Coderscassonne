/* eslint-disable no-confusing-arrow */
import Locations from '../constants/locations';
import Meeple from './Meeple';
import Player from './Player';
import Tile from './Tile';
import { makeAutoObservable } from 'mobx';
import rootStore from '../stores/RootStore';
class Project {
  public meeples: Meeple[];

  public tiles: Tile[];

  public type: Locations;

  public id: number;

  constructor(type: Locations, tile?: Tile) {
    this.meeples = [];
    this.id = rootStore.projectStore.allProjects.length;
    this.tiles = tile ? [tile] : [];
    this.type = type;
    makeAutoObservable(this);
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
    this.meeples.map((meeple) => meeple.player.returnMeeple(meeple));
    this.owner.updateScore(this.getCurrentScore());
  }

  public scoreUnfinishedProject() {
    this.owner.updateScore(this.getCurrentScore());
  }

  public get isFinished(): boolean {
    if (this.type === Locations.ROAD) {
      return this.checkIfRoadProjectIsFinishable();
    } else if (this.type === Locations.CITY) {
      return this.checkIfCityProjectIsFinishable();
    } else if (this.type === Locations.MONASTERY) {
      return this.checkIfMonasteryProjectIsFinishable();
    }

    return false;
  }

  private checkIfRoadProjectIsFinishable() {
    const roadEnds = this.tiles.filter((t) => !t.middle.includes(Locations.ROAD));

    return roadEnds.length === 2 ? true : false;
  }

  private checkIfCityProjectIsFinishable() {
    return false;
  }

  private checkIfMonasteryProjectIsFinishable() {
    return this.tiles.length === 9 ? true : false;
  }
}

export default Project;
