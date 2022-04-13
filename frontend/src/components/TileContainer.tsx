import { MouseEvent, ReactElement, useState } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../constants/layoutElements';
import TileState from '../constants/tileState';
import Tile from '../model/Tile';

interface TileInterface {
  tile: Tile;
}

type Position = 0 | 90 | 180 | 270;

const TileContainer = (props: TileInterface): ReactElement => {
  const { tile } = props;

  const [currentTileState, setTileState] = useState<TileState>(TileState.ACTIVE);
  const [rotation, setRotation] = useState<Position>(0);

  // function rotateImg(direction: 'right' | 'left') {
  //   if (direction === 'right') {
  //     switch (rotation) {
  //       case 0: {
  //         setRotation(90);
  //         break;
  //       }
  //       case 90: {
  //         setRotation(180);
  //         break;
  //       }
  //       case 180: {
  //         setRotation(270);
  //         break;
  //       }
  //       default: {
  //         setRotation(0);
  //         break;
  //       }
  //     }
  //   }
  //   if (direction === 'left') {
  //     switch (rotation) {
  //       case 0: {
  //         setRotation(270);
  //         break;
  //       }
  //       case 90: {
  //         setRotation(0);
  //         break;
  //       }
  //       case 180: {
  //         setRotation(90);
  //         break;
  //       }
  //       default: {
  //         setRotation(180);
  //         break;
  //       }
  //     }
  //   }
  // }

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileState(TileState.TAKEN);
    setRotation(0); // Na chwilę, żeby vsc nie rzucał błędów
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
          src={tile.getTileImageSource()}
          alt={TileState.TAKEN}
          className={`hover: cursor-not-allowed
      ${rotation === 90 ? 'rotate-90' : ''}
      ${rotation === 180 ? 'rotate-180' : ''}
      ${rotation === 270 ? 'rotate-270' : ''}`}
        />
      )}
    </div>
  );
};

export default TileContainer;
