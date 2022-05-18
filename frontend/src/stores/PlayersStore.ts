import { makeAutoObservable } from 'mobx';
import Technologies from '../constants/technologies';
import Player from '../model/Player';
import { RootStore } from './RootStore';

class PlayersStore {
  players: Player[];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.players = [];
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setPlayer(playerName: string, technology: Technologies) {
    const newPlayer = new Player(playerName, technology);
    this.players.push(newPlayer);
  }

  changeOrderOfPlayers(i: number) {
    [this.players[i - 1], this.players[i]] = [this.players[i], this.players[i - 1]];
  }
  getCurrentPlayer() {
    return this.players.find(
      (_player, index) => index === (this.rootStore.gameStore.turnNumber - 1) % this.players.length,
    );
  }
}

export default PlayersStore;
