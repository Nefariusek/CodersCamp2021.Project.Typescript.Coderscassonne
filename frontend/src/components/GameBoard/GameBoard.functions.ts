import Locations from '../../constants/locations';
import Tile from '../../model/Tile';
import { Edges } from '../../model/Tile';
import { BoardState } from './GameBoard';

import rootStore from '../../stores/RootStore';

export const getAdjacentUpperTile = (tile: Tile, row: number, column: number, boardState: BoardState[]) => {
  return boardState.find((tile) => tile.column === column && tile.row === row - 1);
};

export const getAdjacentLowerTile = (tile: Tile, row: number, column: number, boardState: BoardState[]) => {
  return boardState.find((tile) => tile.column === column && tile.row === row + 1);
};

export const getAdjacentRightTile = (tile: Tile, row: number, column: number, boardState: BoardState[]) => {
  return boardState.find((tile) => tile.column === column + 1 && tile.row === row);
};

export const getAdjacentLeftTile = (tile: Tile, row: number, column: number, boardState: BoardState[]) => {
  return boardState.find((tile) => tile.column === column - 1 && tile.row === row);
};

export const manageProjects = (tile: Tile, row: number, column: number, boardState: BoardState[]) => {
  const existingProjects = [];

  const tileInHand = rootStore.gameStore.tileInHand!;
  const addNewProject = (t: Tile, l: Locations) => rootStore.projectStore.addNewProject(t, l);

  if (tileInHand.middle.includes(Locations.ROAD)) {
    const roadProject = addNewProject(tileInHand, Locations.ROAD);
    existingProjects.push(roadProject);
  }
  if (tileInHand.middle.includes(Locations.CITY)) {
    const cityProject = addNewProject(tileInHand, Locations.CITY);
    existingProjects.push(cityProject);
  }
  if (tileInHand.middle === Locations.MONASTERY) {
    const monasteryProject = addNewProject(tileInHand, Locations.MONASTERY);
    existingProjects.push(monasteryProject);
  }
  const edges = Object.values(tileInHand.edges);

  // if (!existingProjects.some((project) => project.type === Locations.CITY)) {
  //   edges.forEach((edge) => addNewProject(tileInHand, edge));
  // }

  // if (!existingProjects.some((project) => project.type === Locations.ROAD)) {
  //   edges.forEach((edge) => addNewProject(tileInHand, edge));
  // }

  const occupiedLocations = existingProjects.map((project) => project.type);
  edges.filter((edge) => !occupiedLocations.includes(edge)).forEach((edge) => addNewProject(tileInHand, edge));
};
