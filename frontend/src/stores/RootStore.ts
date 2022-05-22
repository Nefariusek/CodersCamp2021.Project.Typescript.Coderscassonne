import { makeAutoObservable } from 'mobx';
import ProjectStore from './ProjectStore';
import GameStore from './GameStore';
import PlayersStore from './PlayersStore';
import WebSocketConnection from '../model/websocket/WebSocketConnection';

class RootStore {
  gameStore: GameStore;
  playersStore: PlayersStore;
  projectStore: ProjectStore;
  websocket: WebSocketConnection;
  isDevelopmentMode = false;

  constructor() {
    this.gameStore = new GameStore();
    this.playersStore = new PlayersStore(this);
    this.projectStore = new ProjectStore(this);

    makeAutoObservable(this);
  }

  setIsDevelopmentMode() {
    this.isDevelopmentMode = !this.isDevelopmentMode;
  }
}

const rootStore = new RootStore();

export type { RootStore };
export const boardState = rootStore.gameStore.boardState;
export default rootStore;
