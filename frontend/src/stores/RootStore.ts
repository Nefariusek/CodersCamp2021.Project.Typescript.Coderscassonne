import { makeAutoObservable } from 'mobx';
import ProjectStore from './ProjectStore';
import GameStore from './GameStore';

class RootStore {
  projectStore: ProjectStore;
  gameStore: GameStore;
  isDevelopmentMode = false;

  constructor() {
    this.projectStore = new ProjectStore(this);
    this.gameStore = new GameStore();
    makeAutoObservable(this);
  }

  setIsDevelopmentMode() {
    this.isDevelopmentMode = !this.isDevelopmentMode;
  }
}

const rootStore = new RootStore();
export default rootStore;
export type { RootStore };
