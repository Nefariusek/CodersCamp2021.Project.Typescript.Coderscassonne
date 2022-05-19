import { makeAutoObservable } from 'mobx';
import Locations from '../constants/locations';
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

  addNewProject(location: Locations, tile?: Tile) {
    const newProject = new Project(location, tile); //TODO: change tile <=> location after change of arguments order
    this.allProjects.push(newProject);

    return newProject;
  }

  getAvailableProjects() {
    const recentlyPlacedTile = this.rootStore.gameStore.recentlyPlacedTile;
    if (recentlyPlacedTile) {
      return this.allProjects.filter(
        (project) => project.tiles.includes(recentlyPlacedTile) && project.meeples.length === 0,
      );
    }
    return;
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
