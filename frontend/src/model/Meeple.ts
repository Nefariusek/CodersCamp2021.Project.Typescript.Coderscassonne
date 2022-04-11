import Locations from '../constants/locations';
import Player from './Player';
import Tile from './Tile';

class Meeple {
  public player: Player;

  public placedAt: Locations | undefined;

  public tile: Tile | undefined;

  constructor(player: Player) {
    this.player = player;
  }

  public get isPlaced(): boolean {
    return !!this.tile;
  }
}

export default Meeple;
