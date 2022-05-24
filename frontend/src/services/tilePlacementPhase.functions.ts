import Locations from '../constants/locations';
import Tile from '../model/Tile';
import { Edges } from '../model/Tile';
import _ from 'lodash';
import rootStore, { boardState } from '../stores/RootStore';
import Project from '../model/Project';
import TileState from '../constants/tileState';
import { BoardState } from '../components/GameBoard/GameBoard';
import Meeple from '../model/Meeple';

export const manageProjects = (row: number, column: number) => {
  const existingLocations: Locations[] = [Locations.FIELD];
  updateExistingProjects(existingLocations, row, column);
  createNewProjects(existingLocations);
  mergeProjects();
};

function updateExistingProjects(existingLocations: Locations[], row: number, column: number) {
  const adjacentTiles = getAdjacentTiles(row, column);
  adjacentTiles.forEach((adjacentTile, edge) => {
    if (adjacentTile) {
      const adjacentTileProject = adjacentProjectOfType(adjacentTile, edge);
      if (adjacentTileProject) {
        console.log(edge);
        adjacentTileProject.addTileOnUpdate(rootStore.gameStore.tileInHand!, edge, adjacentTile);

        existingLocations.push(adjacentTileProject.type);
      }
    }
  });
}

function adjacentProjectOfType(adjacentTile: Tile, edge: keyof Edges) {
  return rootStore.projectStore.allProjects.find(
    (project) => project.tiles.includes(adjacentTile) && project.type === rootStore.gameStore.tileInHand?.edges[edge],
  );
}

function getAdjacentTiles(row: number, column: number): Map<keyof Edges, Tile | undefined> {
  const adjacentTiles = new Map<keyof Edges, Tile | undefined>();
  adjacentTiles.set('top', getAdjacentBoardStateByEdge(row, column, 'top')?.tile);
  adjacentTiles.set('right', getAdjacentBoardStateByEdge(row, column, 'right')?.tile);
  adjacentTiles.set('bottom', getAdjacentBoardStateByEdge(row, column, 'bottom')?.tile);
  adjacentTiles.set('left', getAdjacentBoardStateByEdge(row, column, 'left')?.tile);

  return adjacentTiles;
}

function createNewProjects(existingLocations: Locations[]) {
  const tileInHand = rootStore.gameStore.tileInHand!;
  const addNewProject = (l: Locations, t: Tile, e?: keyof Edges) => rootStore.projectStore.addNewProject(l, t, e);

  if (!existingLocations.includes(Locations.ROAD) && tileInHand.middle.includes(Locations.ROAD)) {
    const roadProject = addNewProject(Locations.ROAD, tileInHand);
    existingLocations.push(roadProject.type);
  }
  if (!existingLocations.includes(Locations.CITY) && tileInHand.middle.includes(Locations.CITY)) {
    const cityProject = addNewProject(Locations.CITY, tileInHand);
    existingLocations.push(cityProject.type);
  }
  if (tileInHand.middle.includes(Locations.MONASTERY)) {
    const monasteryProject = addNewProject(Locations.MONASTERY, tileInHand);
    existingLocations.push(monasteryProject.type);
  }
  const edges = Object.entries(tileInHand.edges);

  edges
    .filter(([_edge, location]) => !existingLocations.includes(location))
    .forEach(([edge, location]) => addNewProject(location, tileInHand, edge as keyof Edges));
}

function mergeProjects() {
  const allProjects = rootStore.projectStore.allProjects;

  const currentTileProjects = allProjects.filter((project) => project.tiles.includes(rootStore.gameStore.tileInHand!));

  const oldRoadProjects = getProjectsOfType(Locations.ROAD, currentTileProjects);
  const oldCityProjects = getProjectsOfType(Locations.CITY, currentTileProjects);

  if (oldRoadProjects.length) {
    createMergedProject(Locations.ROAD, currentTileProjects);
  }

  if (oldCityProjects.length) {
    createMergedProject(Locations.CITY, currentTileProjects);
  }

  const projectsToRemove = [...oldRoadProjects, ...oldCityProjects];
  _.pullAll(allProjects, projectsToRemove);
}

function createMergedProject(type: Locations, projects: Project[]) {
  const joinedProjectOfType = rootStore.projectStore.addNewProject(type);
  const { tilesToMerge, openEdgesToMerge, closedEdgesToMerge, meeplesToMerge } = getFieldsToMerge(type, projects);

  joinedProjectOfType.tiles.push(...tilesToMerge);
  joinedProjectOfType.meeples.push(...meeplesToMerge);

  if (type === Locations.CITY) {
    joinedProjectOfType.openEdgesSet = openEdgesToMerge;
    joinedProjectOfType.closedEdgesSet = closedEdgesToMerge;
  }
}

function getFieldsToMerge(type: Locations, projects: Project[]) {
  const projectsOfType = getProjectsOfType(type, projects);
  const arrayOfTiles: Tile[] = [];
  const meeples: Meeple[] = [];
  const openEdges: string[] = [];
  const closedEdges: string[] = [];

  projectsOfType.forEach((project: Project) => {
    arrayOfTiles.push(...project.tiles);
    openEdges.push(...project.openEdgesSet);
    closedEdges.push(...project.closedEdgesSet);
    meeples.push(...project.meeples);
  });

  const tilesToMerge = new Set<Tile>(arrayOfTiles).values();
  const openEdgesToMerge = new Set<string>(openEdges);
  const closedEdgesToMerge = new Set<string>(closedEdges);
  const meeplesToMerge = new Set<Meeple>(meeples).values();

  return { tilesToMerge, openEdgesToMerge, closedEdgesToMerge, meeplesToMerge };
}

function getProjectsOfType(type: Locations, projects: Project[]) {
  return projects.filter((project) => project.type === type);
}

export function validateTilePlacement(row: number, column: number): boolean {
  const isValidTop = validateEdge(row, column, 'top');
  const isValidBottom = validateEdge(row, column, 'bottom');
  const isValidLeft = validateEdge(row, column, 'left');
  const isValidRight = validateEdge(row, column, 'right');

  return isValidRight && isValidLeft && isValidBottom && isValidTop;
}

function validateEdge(row: number, column: number, edge: keyof Edges) {
  const tileContainer = getAdjacentBoardStateByEdge(row, column, edge);
  if (
    tileContainer &&
    tileContainer.state === TileState.TAKEN &&
    tileContainer.tile?.edges[getOppositeEdgeKey(edge)] !== rootStore.gameStore.tileInHand?.edges[edge]
  ) {
    return false;
  }
  return true;
}

export function getOppositeEdgeKey(edge: keyof Edges): keyof Edges {
  switch (edge) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'top':
      return 'bottom';
  }
}

export const activateAdjacentTiles = (row: number, column: number) => {
  activateAdjacentTileContainer(row, column, 'top');
  activateAdjacentTileContainer(row, column, 'bottom');
  activateAdjacentTileContainer(row, column, 'left');
  activateAdjacentTileContainer(row, column, 'right');
};

function activateAdjacentTileContainer(row: number, column: number, edge: keyof Edges) {
  const tileContainer = getAdjacentBoardStateByEdge(row, column, edge);
  if (tileContainer && tileContainer.state === TileState.IDLE) {
    tileContainer.state = TileState.ACTIVE;
  }
}

const adjacentContainerOffsetMap = new Map<keyof Edges, { row: number; column: number }>([
  ['top', { row: -1, column: 0 }],
  ['bottom', { row: 1, column: 0 }],
  ['right', { row: 0, column: 1 }],
  ['left', { row: 0, column: -1 }],
]);

const getAdjacentBoardStateByEdge = (row: number, column: number, edge: keyof Edges): BoardState | undefined => {
  const offsets = adjacentContainerOffsetMap.get(edge);
  if (offsets) {
    return boardState.find((tile) => tile.column === column + offsets.column && tile.row === row + offsets.row);
  }
  return;
};
export const extendBoard = (row: number, column: number) => {
  let bottomRow = _.maxBy(boardState, 'row')!.row;
  let topRow = _.minBy(boardState, 'row')!.row;
  let leftColumn = _.minBy(boardState, 'column')!.column;
  let rightColumn = _.maxBy(boardState, 'column')!.column;

  if (row === bottomRow) {
    for (let col = leftColumn; col <= rightColumn; col++) {
      boardState.push({ row: row + 1, column: col, state: TileState.IDLE });
    }
    bottomRow += 1;
  }

  if (row === topRow) {
    for (let col = leftColumn; col <= rightColumn; col++) {
      boardState.unshift({ row: row - 1, column: col, state: TileState.IDLE });
    }
    topRow -= 1;
  }
  if (column === rightColumn) {
    for (let row = topRow; row <= bottomRow; row++) {
      boardState.push({ row: row, column: column + 1, state: TileState.IDLE });
    }
    rightColumn += 1;
  }
  if (column === leftColumn) {
    for (let row = topRow; row <= bottomRow; row++) {
      boardState.push({ row: row, column: column - 1, state: TileState.IDLE });
    }
    leftColumn -= 1;
  }
};
