/* eslint-disable sort-keys */
import _ from 'lodash';
import { ReactElement, useEffect } from 'react';

import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
import TileContainer from '../TileContainer/TileContainer';
import { openInvalidMoveModal } from '../Modal/InvalidMoveModal';
import { openEndTurnModal } from '../Modal/EndTurnModal';
import { manageProjects } from './GameBoard.functions';
import rootStore from '../../stores/RootStore';

import { tilePlacementValidator, activateAdjacentTiles, extendBoard } from './GameBoard.functions';
export interface BoardState {
  column: number;
  row: number;
  state: TileState;
  tile?: Tile;
}

interface GameBoardProps {
  endOfTurn: boolean;
  setEndOfTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameBoard = ({ endOfTurn, setEndOfTurn }: GameBoardProps): ReactElement => {
  const boardState = rootStore.gameStore.boardState;
  const tileInHand = rootStore.gameStore.tileInHand;

  const sortedBoardState = _.orderBy(boardState, ['row', 'column'], ['asc', 'asc']);
  const tilesGroupedByRows = _.groupBy(sortedBoardState, 'row');

  const onTilePlacement = (row: number, column: number) => {
    const tileToChange = boardState.find((tile) => tile.row === row && tile.column === column);
    if (tileToChange && tileInHand) {
      if (endOfTurn) {
        openEndTurnModal();
      } else {
        if (tilePlacementValidator(row, column, boardState)) {
          tileToChange.state = TileState.TAKEN;
          tileToChange.tile = tileInHand;
          extendBoard(row, column, boardState);
          activateAdjacentTiles(row, column, boardState);
          manageProjects(row, column, boardState);
          setEndOfTurn(true);
        } else {
          openInvalidMoveModal();
        }
      }
    }
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
