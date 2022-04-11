import { MouseEvent, ReactElement, useState } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../constants/layoutElements';
import TileState from '../constants/tileState';
import Tile from '../model/Tile';

interface TileInterface {
  tile: Tile;
}

const TileContainer = (props: TileInterface): ReactElement => {
  const { tile } = props;

  const [currentTileState, setTileState] = useState<TileState>(TileState.ACTIVE);

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileState(TileState.TAKEN);
  }
  return (
    <div className="relative flex " onClick={currentTileState === TileState.ACTIVE ? handleActiveTileClick : undefined}>
      {currentTileState === TileState.IDLE && (
        <img src={IDLE_TILE_SOURCE} alt="idle" className="hover: cursor-not-allowed" />
      )}
      {currentTileState === TileState.ACTIVE && (
        <img id="active" src={ACTIVE_TILE_SOURCE} alt="active" className="hover: cursor-pointer" />
      )}
      {currentTileState === TileState.TAKEN && (
        <img id="taken" src={tile.getTileImage()} alt="taken" className="hover: cursor-not-allowed" />
      )}
    </div>
  );
};

export default TileContainer;
