import Locations from '../constants/locations';
class Player {}
class Tile {}

class Meeple {
  playerRef: Player;
  isPlaced: boolean;
  placedAt: Locations | undefined;
  tileRef: Tile | undefined;

  constructor(player: Player) {
    this.playerRef = player;
    this.isPlaced = false;
  }
}

export default Meeple;
