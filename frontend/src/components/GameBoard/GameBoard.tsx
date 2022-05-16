/* eslint-disable sort-keys */
import _ from 'lodash';
import { ReactElement, useEffect } from 'react';

import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
import TileContainer from '../TileContainer/TileContainer';
import rootStore from '../../stores/RootStore';

export interface BoardState {
  column: number;
  row: number;
  state: TileState;
  tile?: Tile;
}

const GameBoard = (): ReactElement => {
  const boardState = rootStore.gameStore.boardState;

  const sortedBoardState = _.orderBy(boardState, ['row', 'column'], ['asc', 'asc']);
  const tilesGroupedByRows = _.groupBy(sortedBoardState, 'row');

  const onTilePlacement = (row: number, column: number) => {
    rootStore.gameStore.placeTile(row, column);
  };

  useEffect(() => {
    onTilePlacement(0, 0);
  }, []);

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
                        onChange={onTilePlacement}
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
