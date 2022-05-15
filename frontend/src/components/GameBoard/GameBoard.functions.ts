import Locations from '../../constants/locations';
import Tile from '../../model/Tile';
import { Edges } from '../../model/Tile';
import { BoardState } from './GameBoard';
import _ from 'lodash';
import rootStore from '../../stores/RootStore';
import Project from '../../model/Project';

export const manageProjects = (row: number, column: number, boardState: BoardState[]) => {
  const existingLocations: Locations[] = [];
  updateExistingProjects(existingLocations, row, column, boardState);
  createNewProjects(existingLocations);
  mergeProjects();
};

// TODO: remove boardState from context and move to separate store

function mergeProjects() {
  const allProjects = rootStore.projectStore.allProjects;
  const currentTileProjects = allProjects.filter((project) => project.tiles.includes(rootStore.gameStore.tileInHand!));
  const oldRoadProjects = getProjectsOfType(Locations.ROAD, currentTileProjects);
  const oldCityProjects = getProjectsOfType(Locations.ROAD, currentTileProjects);
  const projectsToRemove = [...oldRoadProjects, ...oldCityProjects];
  const mergedRoadProject = createMergedProject(Locations.ROAD, currentTileProjects);
  const mergedCityProject = createMergedProject(Locations.CITY, currentTileProjects);

  _.remove(allProjects, () => projectsToRemove.length);
  allProjects.push(mergedCityProject, mergedRoadProject);
}

function createMergedProject(type: Locations, projects: Project[]) {
  const joinedProjectOfType = new Project(type);
  const tilesOfType = getTilesToMerge(type, projects);
  joinedProjectOfType.tiles.push(...tilesOfType);
  return joinedProjectOfType;
}

function getTilesToMerge(type: Locations, projects: Project[]) {
  const projectsOfType = getProjectsOfType(type, projects);
  const arrayOfTiles: Tile[] = [];
  projectsOfType.forEach((project: Project) => {
    arrayOfTiles.push(...project.tiles);
  });
  const tilesOfType = new Set<Tile>(arrayOfTiles);
  return tilesOfType.values();
}

function getProjectsOfType(type: Locations, projects: Project[]) {
  return projects.filter((project) => project.type === type);
}

function getAdjacentTiles(row: number, column: number, boardState: BoardState[]): Map<keyof Edges, Tile | undefined> {
  const adjacentTiles = new Map<keyof Edges, Tile | undefined>();
  adjacentTiles.set('top', getAdjacentTopTile(row, column, boardState));
  adjacentTiles.set('right', getAdjacentRightTile(row, column, boardState));
  adjacentTiles.set('bottom', getAdjacentBottomTile(row, column, boardState));
  adjacentTiles.set('left', getAdjacentLeftTile(row, column, boardState));

  return adjacentTiles;
}

export const getAdjacentTopTile = (row: number, column: number, boardState: BoardState[]): Tile | undefined => {
  return boardState.find((tile) => tile.column === column && tile.row === row - 1)?.tile;
};

export const getAdjacentBottomTile = (row: number, column: number, boardState: BoardState[]): Tile | undefined => {
  return boardState.find((tile) => tile.column === column && tile.row === row + 1)?.tile;
};

export const getAdjacentRightTile = (row: number, column: number, boardState: BoardState[]): Tile | undefined => {
  return boardState.find((tile) => tile.column === column + 1 && tile.row === row)?.tile;
};

export const getAdjacentLeftTile = (row: number, column: number, boardState: BoardState[]): Tile | undefined => {
  return boardState.find((tile) => tile.column === column - 1 && tile.row === row)?.tile;
};

function updateExistingProjects(existingLocations: Locations[], row: number, column: number, boardState: BoardState[]) {
  const adjacentTiles = getAdjacentTiles(row, column, boardState);
  adjacentTiles.forEach((adjacentTile, edge) => {
    if (adjacentTile) {
      const adjacentTileProject = rootStore.projectStore.allProjects.find(
        (project) =>
          project.tiles.includes(adjacentTile) && project.type === rootStore.gameStore.tileInHand?.edges[edge],
      );
      if (adjacentTileProject) {
        adjacentTileProject.tiles.push(adjacentTile);
        existingLocations.push(adjacentTileProject.type);
      }
    }
  });
}

function createNewProjects(existingLocations: Locations[]) {
  const tileInHand = rootStore.gameStore.tileInHand!;
  const addNewProject = (l: Locations, t: Tile) => rootStore.projectStore.addNewProject(l, t);
  if (!existingLocations.includes(Locations.ROAD) && tileInHand.middle.includes(Locations.ROAD)) {
    const roadProject = addNewProject(Locations.ROAD, tileInHand);
    existingLocations.push(roadProject.type);
  }

  if (!existingLocations.includes(Locations.CITY) && tileInHand.middle.includes(Locations.CITY)) {
    const cityProject = addNewProject(Locations.CITY, tileInHand);
    existingLocations.push(cityProject.type);
  }

  if (tileInHand.middle === Locations.MONASTERY) {
    const monasteryProject = addNewProject(Locations.MONASTERY, tileInHand);
    existingLocations.push(monasteryProject.type);
  }
  const edges = Object.values(tileInHand.edges);

  edges.filter((edge) => !existingLocations.includes(edge)).forEach((edge) => addNewProject(edge, tileInHand));
}
