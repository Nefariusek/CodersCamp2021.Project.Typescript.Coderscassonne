import { makeAutoObservable } from 'mobx';

import Locations from '../constants/locations';
import { PREDEFINED_TILE_IMAGES } from '../constants/tileImages';
import type Player from './Player';

export type Rotation = 0 | 90 | 180 | 270;

export type Edges = {
  bottom: Locations;
  left: Locations;
  right: Locations;
  top: Locations;
};

class Tile {
  public edges: Edges;

  public id: string;

  public middle: Locations[];

  public placedBy: Player;

  public placementTurn: number;

  public isSpecial: boolean;

  public rotation: Rotation;

  private readonly originalEdges: Edges;

  constructor(edges: Edges, middle: Locations[], isSpecial = false, id: string) {
    this.id = id;
    this.edges = edges;
    this.middle = [...middle];
    this.originalEdges = edges;
    this.isSpecial = isSpecial;
    this.rotation = 0;
    makeAutoObservable(this);
  }

  private getCurrentEdges(): Edges {
    return { ...this.edges };
  }

  public rotateLeft(): void {
    this.rotation -= 90;
    if (this.rotation === -90) {
      this.rotation = 270;
    }
    const prevEdges = this.getCurrentEdges();
    this.edges = {
      bottom: prevEdges.left,
      left: prevEdges.top,
      right: prevEdges.bottom,
      top: prevEdges.right,
    };
  }

  public rotateRight(): void {
    this.rotation += 90;
    if (this.rotation === 360) {
      this.rotation = 0;
    }
    const prevEdges = this.getCurrentEdges();
    this.edges = {
      bottom: prevEdges.right,
      left: prevEdges.bottom,
      right: prevEdges.top,
      top: prevEdges.left,
    };
  }

  public getTileImageSourceById(): string | undefined {
    const splitIdArray = this.id.split('_');
    const tileImageId = splitIdArray[0];
    const foundTile = PREDEFINED_TILE_IMAGES.find((tileImage) => tileImage.id === tileImageId);
    if (foundTile) {
      return foundTile.imageSource;
    }
    return undefined;
  }

  public getTileImageSourceByLocations(): string | undefined {
    const foundTile = PREDEFINED_TILE_IMAGES.find(
      (tile) =>
        tile.bottom === this.originalEdges.bottom &&
        tile.right === this.originalEdges.right &&
        tile.left === this.originalEdges.left &&
        tile.top === this.originalEdges.top,
    );
    if (foundTile) {
      return foundTile.imageSource;
    }
    return undefined;
  }
}

export default Tile;
