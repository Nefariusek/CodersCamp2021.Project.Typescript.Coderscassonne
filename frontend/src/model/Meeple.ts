/* eslint-disable max-classes-per-file */
import Locations from '../constants/locations';

class Player {}
class Tile {}

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
