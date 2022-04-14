import Locations from '../constants/locations';
import { PREDEFINED_TILES } from '../constants/tiles';
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

  public middle: Locations;

  public placedBy: Player;

  public placementTurn: number;

  public isSpecial: boolean;

  public rotation: Rotation;

  private readonly originalEdges: Edges;

  constructor(edges: Edges, middle: Locations, isSpecial = false) {
    this.edges = edges;
    this.middle = middle;
    this.originalEdges = edges;
    this.isSpecial = isSpecial;
    this.rotation = 0;
  }

  private getCurrentEdges(): Edges {
    return { ...this.edges };
  }

  public rotateLeft(): void {
    const prevEdges = this.getCurrentEdges();
    this.edges = {
      bottom: prevEdges.left,
      left: prevEdges.top,
      right: prevEdges.bottom,
      top: prevEdges.right,
    };
    switch (this.rotation) {
      case 0: {
        this.rotation = 270;
        break;
      }
      case 90: {
        this.rotation = 0;
        break;
      }
      case 180: {
        this.rotation = 90;
        break;
      }
      default: {
        this.rotation = 180;
        break;
      }
    }
  }

  public rotateRight(): void {
    const prevEdges = this.getCurrentEdges();
    this.edges = {
      bottom: prevEdges.right,
      left: prevEdges.bottom,
      right: prevEdges.top,
      top: prevEdges.left,
    };
    switch (this.rotation) {
      case 0: {
        this.rotation = 90;
        break;
      }
      case 90: {
        this.rotation = 180;
        break;
      }
      case 180: {
        this.rotation = 270;
        break;
      }
      default: {
        this.rotation = 0;
        break;
      }
    }
  }

  public getTileImageSource(): string | undefined {
    const foundTile = PREDEFINED_TILES.find(
      (tile) =>
        tile.middle === this.middle &&
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
