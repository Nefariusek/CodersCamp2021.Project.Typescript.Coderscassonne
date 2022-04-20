import { observer } from 'mobx-react-lite';
import { MouseEvent, ReactElement, useState } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../../constants/layoutElements';
import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
export interface TileInterface {
  tile: Tile | undefined;
  initialState: TileState;
  onChange: (row: number, column: number, tile: Tile) => void;
  row?: number;
  column?: number;
}
//TODO: change props so that TileContainer receives callback to update parent's state
//TODO: send in callback as props info about row and column of tile that should be rerendered
//TODO: handleClick by invoking callback with parameters (see above), which causes rerender of parent
//TODO: parent knows, which element was changed (row,column)

const TileContainer = observer((props: TileInterface): ReactElement => {
  const { tile, initialState, onChange, row, column } = props;

  const [currentTileState, setTileState] = useState<TileState>(initialState);
  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileState(TileState.TAKEN);
    onChange(row!, column!, tile!);
  }

  return (
    <div className="relative flex " onClick={currentTileState === TileState.ACTIVE ? handleActiveTileClick : undefined}>
      {currentTileState === TileState.IDLE && (
        <img src={IDLE_TILE_SOURCE} alt={TileState.IDLE} className="hover: cursor-not-allowed" />
      )}
      {currentTileState === TileState.ACTIVE && (
        <img id="active" src={ACTIVE_TILE_SOURCE} alt={TileState.ACTIVE} className="hover: cursor-pointer" />
      )}
      {currentTileState === TileState.TAKEN && (
        <img
          id="taken"
          src={tile!.getTileImageSource()}
          alt={TileState.TAKEN}
          className={`hover: cursor-not-allowed
      ${tile!.rotation === 90 ? 'rotate-90' : ''}
      ${tile!.rotation === 180 ? 'rotate-180' : ''}
      ${tile!.rotation === 270 ? 'rotate-270' : ''}`}
        />
      )}
    </div>
  );
});

export default TileContainer;
