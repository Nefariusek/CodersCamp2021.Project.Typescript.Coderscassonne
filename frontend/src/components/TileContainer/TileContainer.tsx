import { observer } from 'mobx-react-lite';
import { MouseEvent, ReactElement } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../../constants/layoutElements';
import TileState from '../../constants/tileState';
import Tile from '../../model/Tile';
export interface TileInterface {
  tile: Tile | undefined;
  initialState: TileState;
  onChange?: (row: number, column: number, tile: Tile) => void;
  row?: number;
  column?: number;
}

const TileContainer = observer((props: TileInterface): ReactElement => {
  const { tile, initialState, onChange, row, column } = props;

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    if (onChange && row !== undefined && column !== undefined) {
      onChange(row, column, tile!);
    }
  }

  return (
    <div className="relative flex " onClick={initialState === TileState.ACTIVE ? handleActiveTileClick : undefined}>
      {initialState === TileState.IDLE && (
        <img src={IDLE_TILE_SOURCE} alt={TileState.IDLE} className="hover: cursor-not-allowed" />
      )}
      {initialState === TileState.ACTIVE && (
        <img id="active" src={ACTIVE_TILE_SOURCE} alt={TileState.ACTIVE} className="hover: cursor-pointer" />
      )}
      {initialState === TileState.TAKEN && (
        <img
          id="taken"
          src={tile?.getTileImageSourceById()}
          alt={TileState.TAKEN}
          className={`hover: cursor-not-allowed
      ${tile?.rotation === 90 ? 'rotate-90' : ''}
      ${tile?.rotation === 180 ? 'rotate-180' : ''}
      ${tile?.rotation === 270 ? 'rotate-270' : ''}`}
        />
      )}
    </div>
  );
});

export default TileContainer;
