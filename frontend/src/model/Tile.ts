import Locations from '../constants/locations';
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

  constructor(edges: Edges, player: Player, placementTurn: number) {
    this.edges = edges;
    this.placedBy = player;
    this.placementTurn = placementTurn;
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
}

export default Tile;
