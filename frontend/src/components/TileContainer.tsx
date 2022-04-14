import { MouseEvent, ReactElement, useState } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../constants/layoutElements';
import TileState from '../constants/tileState';
import Tile, { Rotation } from '../model/Tile';
import ArrowButton from './PlayersHand/ArrowButton';

interface TileInterface {
  tile: Tile;
}

const TileContainer = (props: TileInterface): ReactElement => {
  const { tile } = props;

  const [currentTileState, setTileState] = useState<TileState>(TileState.ACTIVE);
  const [tileRotation, setTileRotation] = useState<Rotation>(tile.rotation);

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileState(TileState.TAKEN);
  }

  function handleTileRotation(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    setTileRotation(tile.rotation);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="relative flex "
      onClick={currentTileState === TileState.ACTIVE ? handleActiveTileClick : handleTileRotation}
    >
      <ArrowButton tile={tile} direction="right" />
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
      ${tileRotation === 90 ? 'rotate-90' : ''}
      ${tileRotation === 180 ? 'rotate-180' : ''}
      ${tileRotation === 270 ? 'rotate-270' : ''}`}
        />
      )}
      <ArrowButton tile={tile} direction="left" />
    </div>
  );
};

export default TileContainer;
