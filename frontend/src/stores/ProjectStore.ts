import { makeAutoObservable } from 'mobx';
import { BoardState } from '../components/GameBoard/GameBoard';
import Locations from '../constants/locations';
import TileState from '../constants/tileState';
import Project from '../model/Project';
import Tile from '../model/Tile';
import type { RootStore } from './RootStore';

class ProjectStore {
  allProjects: Array<Project>;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.allProjects = [];
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  addNewProject(tile: Tile, location: Locations) {
    const newProject = new Project(tile, location);
    this.allProjects.push(newProject);

    return newProject;
  }

  // updateProject(adjacentTile: BoardState, project: Project) {
  //   const projectToUpdate = this.allProjects.find((project) => project.tiles.includes(adjacentTile.tile!));
  //   const tileInHand = this.rootStore.gameStore.tileInHand;
  //   if (tileInHand) {
  //     projectToUpdate && projectToUpdate.tiles.push(tileInHand);
  //   }
  // }
}
export default ProjectStore;
