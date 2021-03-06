import { makeAutoObservable } from 'mobx';
import ProjectStore from './ProjectStore';
import GameStore from './GameStore';
import PlayersStore from './PlayersStore';

class RootStore {
  gameStore: GameStore;
  playersStore: PlayersStore;
  projectStore: ProjectStore;
  isDevelopmentMode = false;

  constructor() {
    this.gameStore = new GameStore(this);
    this.playersStore = new PlayersStore(this);
    this.projectStore = new ProjectStore(this);

    makeAutoObservable(this);
  }

  setIsDevelopmentMode() {
    this.isDevelopmentMode = !this.isDevelopmentMode;
  }

  resetStores() {
    this.gameStore.initGameStore();
    this.playersStore.initPlayersStore();
    this.projectStore.initProjectStore();
  }
}

const rootStore = new RootStore();

export type { RootStore };
export const boardState = rootStore.gameStore.boardState;
export default rootStore;
