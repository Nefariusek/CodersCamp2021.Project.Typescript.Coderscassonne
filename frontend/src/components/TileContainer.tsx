import { observer } from 'mobx-react-lite';
import { MouseEvent, ReactElement, useState } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../constants/layoutElements';
import TileState from '../constants/tileState';
import Tile from '../model/Tile';

export interface TileInterface {
  tile: Tile;
}

const TileContainer = observer((props: TileInterface): ReactElement => {
  const { tile } = props;

  const [currentTileState, setTileState] = useState<TileState>(TileState.ACTIVE);

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileState(TileState.TAKEN);
    console.log(tile.rotation);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
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
          src={tile.getTileImageSource()}
          alt={TileState.TAKEN}
          className={`hover: cursor-not-allowed
      ${tile.rotation === 90 ? 'rotate-90' : ''}
      ${tile.rotation === 180 ? 'rotate-180' : ''}
      ${tile.rotation === 270 ? 'rotate-270' : ''}`}
        />
      )}
      <p>{tile.rotation}</p>
    </div>
  );
});

export default TileContainer;
