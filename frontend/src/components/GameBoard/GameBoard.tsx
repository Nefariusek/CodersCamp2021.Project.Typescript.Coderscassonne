/* eslint-disable sort-keys */
import _ from 'lodash';
import { FC, ReactElement, useState } from 'react';

import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
import { drawnTiles } from '../DataStoreContext/DataStoreContext';
import TileContainer from '../TileContainer/TileContainer';

export interface BoardState {
  column: number;
  row: number;
  state: TileState;
  tile?: Tile;
}

export const initialBoardState: BoardState[] = [
  { row: 1, column: 0, state: TileState.ACTIVE },
  { row: 0, column: 0, state: TileState.IDLE },
  { row: 0, column: 1, state: TileState.ACTIVE },
  { row: 0, column: 2, state: TileState.IDLE },

  { row: 1, column: 2, state: TileState.ACTIVE },
  { row: 2, column: 0, state: TileState.IDLE },
  { row: 2, column: 1, state: TileState.ACTIVE },
  { row: 2, column: 2, state: TileState.IDLE },
  { row: 1, column: 1, state: TileState.TAKEN, tile: drawnTiles[0] },
];

const GameBoard: FC = (): ReactElement => {
  const [boardState, setBoardState] = useState<BoardState[]>(initialBoardState);

  const sortedBoardState = _.orderBy(boardState, ['row', 'column'], ['asc', 'asc']);
  const tilesGroupedByRows = _.groupBy(sortedBoardState, 'row');

  const extendBoard = (column: number, row: number) => {
    const bottomRow = _.maxBy(boardState, 'row')!.row;
    console.log('bottom row ', bottomRow);
    const topRow = _.minBy(boardState, 'row')!.row;
    console.log('top row ', topRow);
    const leftColumn = _.minBy(boardState, 'column')!.column;
    console.log('left column ', leftColumn);
    const rightColumn = _.maxBy(boardState, 'column')!.column;
    console.log('right column ', rightColumn);
    if (row === bottomRow) {
      for (let col = leftColumn; col <= rightColumn; col++) {
        boardState.push({ row: row + 1, column: col, state: TileState.IDLE });
      }
    }
    if (row === topRow) {
      for (let col = leftColumn; col <= rightColumn; col++) {
        boardState.unshift({ row: row - 1, column: col, state: TileState.IDLE });
      }
    }
    if (column === rightColumn) {
      for (let row = topRow; row <= bottomRow; row++) {
        boardState.push({ row: row, column: column + 1, state: TileState.IDLE });
      }
    }
    if (column === leftColumn) {
      for (let row = topRow; row <= bottomRow; row++) {
        boardState.push({ row: row, column: column - 1, state: TileState.IDLE });
      }
    }
    setBoardState([...boardState]);
  };

  const handleChangeBoardState = (row: number, column: number, newTile: Tile) => {
    const tileToChange = boardState.find((tile) => tile.row === row && tile.column === column);
    if (tileToChange) {
      tileToChange.state = TileState.TAKEN;
      tileToChange.tile = drawnTiles[1];
    }
    extendBoard(column, row);
  };
  console.log(boardState);
  return (
    <div id="gameBoard">
      <table>
        <tbody>
          {Object.entries(tilesGroupedByRows).map(([rowIndex, columnsInRow]) => (
            <tr key={`row-${rowIndex}`}>
              {columnsInRow.map((element) => (
                <td key={`${element.row}-${element.column}`}>
                  <TileContainer
                    tile={element.tile || undefined}
                    initialState={element.state}
                    onChange={handleChangeBoardState}
                    row={element.row}
                    column={element.column}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;
