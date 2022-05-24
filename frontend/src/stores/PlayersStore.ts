import { makeAutoObservable } from 'mobx';
import Technologies from '../constants/technologies';
import Player from '../model/Player';
import { RootStore } from './RootStore';

class PlayersStore {
  players: Array<Player>;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.players = [];
    this.rootStore = rootStore;
    makeAutoObservable(this);
    const playerOne: Player = new Player('Tic', Technologies.HTML);
    const playerTwo: Player = new Player('Tac', Technologies.JS);
    const playerThree: Player = new Player('Toe', Technologies.TS);
    this.players.push(playerOne, playerTwo, playerThree);
  }

  addPlayer(playerName: string, technology: Technologies) {
    const newPlayer = new Player(playerName, technology);
    this.players.push(newPlayer);
  }

  changeOrderOfPlayers(i: number) {
    if (!this.players) {
      this.players = [];
    }
    [this.players[i - 1], this.players[i]] = [this.players[i], this.players[i - 1]];
  }
  getCurrentPlayer() {
    return this.players.find(
      (_player, index) => index === (this.rootStore.gameStore.turnNumber - 1) % this.players.length,
    );
  }
}

export default PlayersStore;
