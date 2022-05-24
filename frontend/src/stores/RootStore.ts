import { makeAutoObservable } from 'mobx';
import ProjectStore from './ProjectStore';
import GameStore from './GameStore';
import PlayersStore from './PlayersStore';
import WebSocketConnection from '../model/websocket/WebSocketConnection';

class RootStore {
  gameStore: GameStore;
  playersStore: PlayersStore;
  projectStore: ProjectStore;
  websocket: WebSocketConnection | undefined;
  isDevelopmentMode = false;
  room: string;
  clientName: string;

  constructor() {
    this.gameStore = new GameStore(this);
    this.playersStore = new PlayersStore(this);
    this.projectStore = new ProjectStore(this);

    makeAutoObservable(this);
  }

  setIsDevelopmentMode() {
    this.isDevelopmentMode = !this.isDevelopmentMode;
  }

  setRoom(roomName: string) {
    this.room = roomName;
  }
}

const rootStore = new RootStore();

export type { RootStore };
export const boardState = rootStore.gameStore.boardState;
export default rootStore;
