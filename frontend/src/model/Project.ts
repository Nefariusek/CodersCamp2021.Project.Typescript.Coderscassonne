/* eslint-disable no-confusing-arrow */
import Locations from '../constants/locations';
import Meeple from './Meeple';
import Player from './Player';
import Tile, { Edges } from './Tile';
import { makeAutoObservable } from 'mobx';
import rootStore from '../stores/RootStore';
class Project {
  public meeples: Meeple[];

  public tiles: Tile[];

  public type: Locations;

  public id: number;

  private openEdgesSet: Set<string>;

  constructor(type: Locations, tile?: Tile, edge?: keyof Edges) {
    this.meeples = [];
    this.id = rootStore.projectStore.allProjects.length;
    this.tiles = [];
    this.type = type;
    this.openEdgesSet = new Set<string>();

    if (tile) {
      this.addTile(tile, edge);
    }
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

  public addTileOnUpdate(tileToAdd: Tile, oppositeEdge: keyof Edges, adjacentTile: Tile): void {
    this.tiles.push(tileToAdd);
    console.log(this.openEdgesSet.size);
    this.openEdgesSet.delete(`${adjacentTile.id}|${oppositeEdge}`);
    console.log('opposite Edges Set ', this.openEdgesSet);
    console.log(`${adjacentTile.id}|${oppositeEdge}`);
    console.log(this.openEdgesSet.size);
  }
  public addTile(tileToAdd: Tile, edge?: keyof Edges) {
    this.tiles.push(tileToAdd);
    console.log(edge);

    // console.log(location);

    // debugger;

    if (this.type === Locations.CITY && !tileToAdd.middle.includes(Locations.CITY)) {
      this.openEdgesSet.add(tileToAdd.id + edge);
    } else if (this.type === Locations.CITY && tileToAdd.middle.includes(Locations.CITY)) {
      console.log('ts');
      Object.entries(tileToAdd.edges).forEach(([edge, location]) => {
        // console.log(edge);
        // console.log(location);
        if (location === Locations.CITY) {
          this.openEdgesSet.add(`${tileToAdd.id}|${edge}`);
        }
      });
    }

    console.log(this.openEdgesSet);
  }
}

export default Project;
