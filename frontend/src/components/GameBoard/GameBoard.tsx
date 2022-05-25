/* eslint-disable sort-keys */
import _ from 'lodash';
import { ReactElement, useEffect, useState } from 'react';

import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
import TileContainer from '../TileContainer/TileContainer';
import { GAMEBOARD_LAYOUT_PROPORTION, TILE_SIZE } from '../../constants/gameDefaults';
import {
  useTilePlacementReceiver,
  useTileRotationReceiver,
  useNextPhaseReceiver,
  useMeeplePlacementReceiver,
} from './GameBoard.hooks';
import rootStore from '../../stores/RootStore';
import { observer } from 'mobx-react';
import Meeple from '../../model/Meeple';

export interface BoardState {
  column: number;
  row: number;
  state: TileState;
  tile?: Tile;
  meeple?: Meeple;
}

const GameBoard = observer((): ReactElement => {
  const boardState = rootStore.gameStore.boardState;

  const sortedBoardState = _.orderBy(boardState, ['row', 'column'], ['asc', 'asc']);
  const tilesGroupedByRows = _.groupBy(sortedBoardState, 'row');

  const onTilePlacement = (row: number, column: number, fromWebsocket: boolean) => {
    rootStore.gameStore.placeTile(row, column, fromWebsocket);
  };

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowHeight(window.innerHeight));
  }, []);

  useEffect(() => {
    onTilePlacement(0, 0, false);
    rootStore.gameStore.endCurrentTurn();
  }, []);

  if (!!rootStore.websocket) {
    useTilePlacementReceiver(onTilePlacement);
    useTileRotationReceiver();
    useNextPhaseReceiver();
    useMeeplePlacementReceiver();
  }

  function gameBoardAutoScale(): number {
    const rowsCount = Object.entries(tilesGroupedByRows).length;
    const gameBoardWindowHeight = GAMEBOARD_LAYOUT_PROPORTION * windowHeight;
    const gameBoardHeight = TILE_SIZE * rowsCount;

    const scale = gameBoardWindowHeight / gameBoardHeight - 0.05 + 0.005 * (rowsCount - 3);

    return scale;
  }

  return (
    <>
      <div id="gameBoard" style={{ zoom: `${gameBoardAutoScale()}` }}>
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
                        meeple={element.meeple}
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
});

export default GameBoard;
