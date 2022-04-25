/* eslint-disable sort-keys */
import _ from 'lodash';
import { ReactElement, useContext, useState } from 'react';

import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
import DataStoreContext, { drawnTiles } from '../DataStoreContext/DataStoreContext';
import TileContainer from '../TileContainer/TileContainer';
import { openInvalidMoveModal } from '../Modal/InvalidMoveModal';
import { openEndTurnModal } from '../Modal/EndTurnModal';

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

interface GameBoardProps {
  endOfTurn: boolean;
  setEndOfTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameBoard = ({ endOfTurn, setEndOfTurn }: GameBoardProps): ReactElement => {
  const [boardState, setBoardState] = useState<BoardState[]>(initialBoardState);

  const { tileInHand } = useContext(DataStoreContext);
  const sortedBoardState = _.orderBy(boardState, ['row', 'column'], ['asc', 'asc']);
  const tilesGroupedByRows = _.groupBy(sortedBoardState, 'row');

  const extendBoard = (row: number, column: number) => {
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
    setBoardState([...boardState]);
  };

  const activateAdjacentTiles = (row: number, column: number) => {
    const upperTile = boardState.find((tile) => tile.column === column && tile.row === row - 1);
    if (upperTile && upperTile.state === TileState.IDLE) {
      upperTile.state = TileState.ACTIVE;
    }

    const lowerTile = boardState.find((tile) => tile.column === column && tile.row === row + 1);
    if (lowerTile && lowerTile.state === TileState.IDLE) {
      lowerTile.state = TileState.ACTIVE;
    }

    const rightTile = boardState.find((tile) => tile.column === column + 1 && tile.row === row);
    if (rightTile && rightTile.state === TileState.IDLE) {
      rightTile.state = TileState.ACTIVE;
    }

    const leftTile = boardState.find((tile) => tile.column === column - 1 && tile.row === row);
    if (leftTile && leftTile.state === TileState.IDLE) {
      leftTile.state = TileState.ACTIVE;
    }
  };

  const tilePlacementValidator = (row: number, column: number): boolean => {
    const upperTile = boardState.find((tile) => tile.column === column && tile.row === row - 1);
    if (upperTile && upperTile.state === TileState.TAKEN && upperTile.tile?.edges.bottom !== tileInHand?.edges.top) {
      return false;
    }

    const lowerTile = boardState.find((tile) => tile.column === column && tile.row === row + 1);
    if (lowerTile && lowerTile.state === TileState.TAKEN && lowerTile.tile?.edges.top !== tileInHand?.edges.bottom) {
      return false;
    }

    const rightTile = boardState.find((tile) => tile.column === column + 1 && tile.row === row);
    if (rightTile && rightTile.state === TileState.TAKEN && rightTile.tile?.edges.left !== tileInHand?.edges.right) {
      return false;
    }

    const leftTile = boardState.find((tile) => tile.column === column - 1 && tile.row === row);
    if (leftTile && leftTile.state === TileState.TAKEN && leftTile.tile?.edges.right !== tileInHand?.edges.left) {
      return false;
    }
    return true;
  };

  const handleChangeBoardState = (row: number, column: number) => {
    const tileToChange = boardState.find((tile) => tile.row === row && tile.column === column);
    if (tileToChange && tileInHand) {
      if (endOfTurn) {
        openEndTurnModal();
      } else {
        if (tilePlacementValidator(row, column)) {
          tileToChange.state = TileState.TAKEN;
          tileToChange.tile = tileInHand;
          extendBoard(row, column);
          activateAdjacentTiles(row, column);
          setEndOfTurn(true);
        } else {
          openInvalidMoveModal();
        }
      }
    }
  };
  return (
    <>
      <div id="gameBoard">
        <table>
          <tbody>
            {Object.entries(tilesGroupedByRows)
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .map(([rowIndex, columnsInRow]) => (
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
    </>
  );
};

export default GameBoard;
