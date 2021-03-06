/* eslint-disable no-confusing-arrow */
import Locations from '../constants/locations';
import Meeple from './Meeple';
import Player from './Player';
import Tile, { Edges } from './Tile';
import { makeAutoObservable } from 'mobx';
import rootStore from '../stores/RootStore';
import { getOppositeEdgeKey } from '../services/tilePlacementPhase.functions';
class Project {
  public meeples: Meeple[];

  public tiles: Tile[];

  public type: Locations;

  public id: number;

  public isFinished: boolean;

  public openEdgesSet: Set<string>;
  public closedEdgesSet: Set<string>;

  constructor(type: Locations, tile?: Tile, edge?: keyof Edges) {
    this.meeples = [];
    this.id = rootStore.projectStore.allProjects.length;
    this.tiles = [];
    this.type = type;
    this.isFinished = false;
    this.openEdgesSet = new Set<string>();
    this.closedEdgesSet = new Set<string>();

    if (tile) {
      this.addTileOnCreation(tile, edge);
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
    return mode?.player;
  }

  public get currentScore(): number {
    let score: number;
    switch (this.type) {
      case Locations.ROAD || Locations.MONASTERY || Locations.GARDEN:
        score = this.tiles.length;
        break;

      case Locations.CITY:
        score = this.tiles.reduce((sum, curr) => (curr.isSpecial ? sum + 2 : sum + 1), 0);
        score = this.isFinishable ? score * 2 : score;
        break;

      default:
        score = 0;
        break;
    }
    return score;
  }

  public addMeeple() {
    const meepleToAdd = rootStore.playersStore.getCurrentPlayer()?.getMeeple();
    if (meepleToAdd) {
      this.meeples.push(meepleToAdd);
      meepleToAdd.placedAt = this.type;
    }
    return meepleToAdd;
  }

  public finishProject() {
    this.owner.updateScore(this.currentScore);
    this.meeples.forEach((meeple) => meeple.player.returnMeeple(meeple));
    this.meeples.length = 0;
    this.isFinished = true;
  }

  public scoreUnfinishedProject() {
    if (this.owner) {
      this.owner.updateScore(this.currentScore);
      this.meeples.forEach((meeple) => meeple.player.returnMeeple(meeple));
      this.meeples.length = 0;
    }
  }

  public get isFinishable(): boolean {
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
    return new Set<string>([...this.closedEdgesSet, ...this.openEdgesSet]).size === this.closedEdgesSet.size;
  }

  private checkIfMonasteryProjectIsFinishable() {
    return this.tiles.length === 9 ? true : false;
  }

  public addTileOnUpdate(tileToAdd: Tile, edge: keyof Edges, adjacentTile: Tile): void {
    this.tiles.push(tileToAdd);
    const oppositeEdge = getOppositeEdgeKey(edge);

    const edgeToClose = `${adjacentTile.id}|${oppositeEdge}`;

    this.openEdgesSet.delete(edgeToClose);
    this.closedEdgesSet.add(edgeToClose);
    this.closedEdgesSet.add(`${tileToAdd.id}|${edge}`);
    if (this.type === Locations.CITY) {
      Object.entries(tileToAdd.edges).forEach(([edgeName, location]) => {
        if (
          location === Locations.CITY &&
          edgeName !== edge &&
          !this.closedEdgesSet.has(`${tileToAdd.id}|${edgeName}`)
        ) {
          this.openEdgesSet.add(`${tileToAdd.id}|${edgeName}`);
        }
        if (location === Locations.CITY && edgeName === edge) {
          this.closedEdgesSet.add(`${tileToAdd.id}|${edgeName}`);
        }
      });
    }
  }

  public addTileOnCreation(tileToAdd: Tile, edge?: keyof Edges) {
    this.tiles.push(tileToAdd);

    if (this.type === Locations.CITY && !tileToAdd.middle.includes(Locations.CITY)) {
      this.openEdgesSet.add(`${tileToAdd.id}|${edge}`);
    } else if (this.type === Locations.CITY && tileToAdd.middle.includes(Locations.CITY)) {
      Object.entries(tileToAdd.edges).forEach(([edgeName, location]) => {
        if (location === Locations.CITY) {
          this.openEdgesSet.add(`${tileToAdd.id}|${edgeName}`);
        }
      });
    }
  }
}

export default Project;
