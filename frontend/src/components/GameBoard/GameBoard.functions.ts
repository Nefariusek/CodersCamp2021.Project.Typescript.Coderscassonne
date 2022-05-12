import Locations from '../../constants/locations';
import Tile from '../../model/Tile';
import { Edges } from '../../model/Tile';
import { BoardState } from './GameBoard';

import rootStore from '../../stores/RootStore';

export const manageProjects = (row: number, column: number, boardState: BoardState[]) => {
  const existingLocations: Locations[] = [];
  updateExistingProjects(existingLocations, row, column, boardState);
  createNewProjects(existingLocations);
  // TODO: merge projects
  // filter projects with current Tile, if filter return more than 1 -> merge projects.
};

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
  const addNewProject = (t: Tile, l: Locations) => rootStore.projectStore.addNewProject(t, l);

  if (!existingLocations.includes(Locations.ROAD) && tileInHand.middle.includes(Locations.ROAD)) {
    const roadProject = addNewProject(tileInHand, Locations.ROAD);
    existingLocations.push(roadProject.type);
  }

  if (!existingLocations.includes(Locations.CITY) && tileInHand.middle.includes(Locations.CITY)) {
    const cityProject = addNewProject(tileInHand, Locations.CITY);
    existingLocations.push(cityProject.type);
  }

  if (tileInHand.middle === Locations.MONASTERY) {
    const monasteryProject = addNewProject(tileInHand, Locations.MONASTERY);
    existingLocations.push(monasteryProject.type);
  }
  const edges = Object.values(tileInHand.edges);

  edges.filter((edge) => !existingLocations.includes(edge)).forEach((edge) => addNewProject(tileInHand, edge));
}
