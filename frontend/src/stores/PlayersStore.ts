import { makeAutoObservable } from 'mobx';
import Technologies from '../constants/technologies';
import Player from '../model/Player';

class PlayersStore {
  players: Player[];

  constructor() {
    this.players = [];
    makeAutoObservable(this);
  }

  setPlayer(playerName: string, technology: Technologies) {
    const newPlayer = new Player(playerName, technology);
    this.players.push(newPlayer);
  }

  changeOrderOfPlayers(i: number) {
    [this.players[i - 1], this.players[i]] = [this.players[i], this.players[i - 1]];
  }
}

export default PlayersStore;
