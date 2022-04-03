import Locations from '../constants/locations';

class Tile {
  edgeLeft: Locations;

  edgeRight: Locations;

  edgeTop: Locations;

  edgeBottom: Locations;

  constructor(edgeLeft: Locations, edgeRight: Locations, edgeTop: Locations, edgeBottom: Locations) {
    this.edgeLeft = edgeLeft;
    this.edgeRight = edgeRight;
    this.edgeTop = edgeTop;
    this.edgeBottom = edgeBottom;
  }
}

export default Tile;
