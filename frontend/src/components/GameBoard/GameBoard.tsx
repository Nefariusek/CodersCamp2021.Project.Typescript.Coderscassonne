/* eslint-disable sort-keys */
import _ from 'lodash';
import { FC, ReactElement, useState } from 'react';

import TileState from '../../constants/tileState';
import { JSONData } from '../../mocks/mocks';
import Tile from '../../model/Tile';
import GameModeParser from '../GameModeParser';
import TileContainer from '../TileContainer/TileContainer';

export const drawnTiles = GameModeParser(JSONData);

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

  const handleChangeBoardState = (row: number, column: number, newTile: Tile) => {
    setBoardState((boardState) => [...boardState, { row: row, column: column, state: TileState.TAKEN, tile: newTile }]);
  };

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
