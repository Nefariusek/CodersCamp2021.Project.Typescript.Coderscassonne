import Locations from '../constants/locations';
import { PREDEFINED_TILES } from '../constants/tiles';
import Player from './Player';

type Edges = {
  bottom: Locations;
  left: Locations;
  right: Locations;
  top: Locations;
};

class Tile {
  public edges: Edges;

  public placedBy: Player;

  public placementTurn: number;

  public isSpecial: boolean;

  private readonly originalEdges: Edges;

  constructor(edges: Edges, player: Player, placementTurn: number, isSpecial = false) {
    this.edges = edges;
    this.placedBy = player;
    this.placementTurn = placementTurn;
    this.originalEdges = edges;
    this.isSpecial = isSpecial;
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
  }

  public rotateRight(): void {
    const prevEdges = this.getCurrentEdges();
    this.edges = {
      bottom: prevEdges.right,
      left: prevEdges.bottom,
      right: prevEdges.top,
      top: prevEdges.left,
    };
  }

  public getTileImage(): string | undefined {
    const foundTile = PREDEFINED_TILES.find(
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
