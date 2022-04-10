import { MouseEvent, ReactElement, useState } from 'react';

import TileState from '../constants/tileState';
import Tile from '../model/Tile';

const idleImagePath = '../../public/Elements/Layout/Tile_board_dark.png';
const activeImagePath = '../../public/Elements/Layout/Tile_board_bright.png';

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

  console.log(currentTileState);

  return (
    <div className="relative flex " onClick={currentTileState === TileState.active ? handleActiveTileClick : undefined}>
      {currentTileState === TileState.idle && <img src={idleImagePath} alt="idle" />}
      {currentTileState === TileState.active && <img id="active" src={activeImagePath} alt="active" />}
      {currentTileState === TileState.taken && <img id="taken" src={TileImageSource} alt="taken" />}
    </div>
  );
};

export default TileContainer;
