import Locations from '../constants/locations';

type Edges = {
  bottom: Locations;
  left: Locations;
  right: Locations;
  top: Locations;
};
class Tile {
  public edges: Edges;

  constructor(edges: Edges) {
    this.edges = edges;
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
