import Locations from '../constants/locations';

type Edges = {
  bottom: Locations;
  left: Locations;
  right: Locations;
  top: Locations;
};

class Player {
  //TODO: import Player model
}
class Tile {
  public edges: Edges;
  public placedBy: Player;
  public placementTurn: number;
  constructor(edges: Edges, player: Player, placementTurn: number) {
    this.edges = edges;
    this.placedBy = player;
    this.placementTurn = placementTurn;
  }

  rotateLeft() {
    let prevEdges = { ...this.edges };
    this.edges = {
      bottom: prevEdges.left,
      left: prevEdges.top,
      right: prevEdges.bottom,
      top: prevEdges.right,
    };
  }

  rotateRight() {
    let prevEdges = { ...this.edges };
    this.edges = {
      bottom: prevEdges.right,
      left: prevEdges.bottom,
      right: prevEdges.top,
      top: prevEdges.left,
    };
  }
}

export default Tile;
