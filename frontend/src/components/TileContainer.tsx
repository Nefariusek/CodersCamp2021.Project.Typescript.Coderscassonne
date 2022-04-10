import { MouseEvent, ReactElement, useState } from 'react';

import { TILE_BOARD_BRIGHT_SOURCE, TILE_BOARD_DARK_SOURCE } from '../constants/layoutElements';
import TileState from '../constants/tileState';
import Tile from '../model/Tile';

const idleImagePath = TILE_BOARD_DARK_SOURCE;
const activeImagePath = TILE_BOARD_BRIGHT_SOURCE;
interface TileInterface {
  tile: Tile;
}

const TileContainer = (props: TileInterface): ReactElement => {
  const { tile } = props;
  const TileImageSource = tile.getTileImage();

  const [currentTileState, setTileState] = useState<TileState>(TileState.active);

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileState(TileState.taken);
  }
  return (
    <div className="relative flex " onClick={currentTileState === TileState.active ? handleActiveTileClick : undefined}>
      {currentTileState === TileState.idle && <img src={idleImagePath} alt="idle" />}
      {currentTileState === TileState.active && <img id="active" src={activeImagePath} alt="active" />}
      {currentTileState === TileState.taken && <img id="taken" src={TileImageSource} alt="taken" />}
    </div>
  );
};

export default TileContainer;
