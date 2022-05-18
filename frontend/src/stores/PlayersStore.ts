import { makeAutoObservable } from 'mobx';
import Player from '../model/Player';

class PlayersStore {
  playersData: Player | null;
  allPlayersData: Player[];

  constructor() {
    this.playersData = null;
    this.allPlayersData = [];
    makeAutoObservable(this);
  }
}

export default PlayersStore;
