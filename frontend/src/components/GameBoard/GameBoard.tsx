/* eslint-disable sort-keys */
import _ from 'lodash';
import { ReactElement, useEffect, useState } from 'react';

import TileState from '../../constants/tileState';
import Tile, { Rotation } from '../../model/Tile';
import TileContainer from '../TileContainer/TileContainer';
import { GAMEBOARD_LAYOUT_PROPORTION, TILE_SIZE } from '../../constants/gameDefaults';
import rootStore from '../../stores/RootStore';
import { observer } from 'mobx-react';
import { socket } from '../../App';

export interface BoardState {
  column: number;
  row: number;
  state: TileState;
  tile?: Tile;
}

const GameBoard = observer((): ReactElement => {
  const boardState = rootStore.gameStore.boardState;

  const sortedBoardState = _.orderBy(boardState, ['row', 'column'], ['asc', 'asc']);
  const tilesGroupedByRows = _.groupBy(sortedBoardState, 'row');

  const onTilePlacement = (row: number, column: number, fromWebsocket: boolean) => {
    console.log(`tile placement`);
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

  useEffect(() => {
    socket.on('receiveTilePlaced', (data) => {
      // const { tileData, clientId } = data;
      const tileData = data;
      const splitMessageArray = tileData.split('_');

      const id: string = `${splitMessageArray[0]}_${splitMessageArray[1]}`;
      const row: number = +splitMessageArray[2];
      const column: number = +splitMessageArray[3];
      const rotation = +splitMessageArray[4] as Rotation;

      console.log(
        `Tile with id ${id} is placed in ${row} row and ${column} column rotated ${rotation} degrees`,
        // `Tile with id ${id} is placed in ${row} row and ${column} column rotated ${rotation} degrees by client with id ${clientId}`,
      );

      if (row !== 0 || column !== 0) {
        onTilePlacement(row, column, true);
      }
    });
  }, []);

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
