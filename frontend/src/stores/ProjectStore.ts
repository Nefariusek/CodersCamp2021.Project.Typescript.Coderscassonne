import { makeAutoObservable } from 'mobx';
import Locations from '../constants/locations';
import Project from '../model/Project';
import Tile, { Edges } from '../model/Tile';
import type { RootStore } from './RootStore';

class ProjectStore {
  allProjects: Array<Project>;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.allProjects = [];
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  addNewProject(location: Locations, tile?: Tile, edge?: keyof Edges) {
    const newProject = new Project(location, tile, edge);
    this.allProjects.push(newProject);

    return newProject;
  }

  get availableProjects() {
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

  initProjectStore() {
    this.allProjects = [];
  }
}

export default ProjectStore;
