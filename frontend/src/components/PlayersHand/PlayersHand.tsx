import { FC, ReactElement } from 'react';

import Locations from '../../constants/locations';
import Tile from '../../model/Tile';
import TileContainer from '../TileContainer';
import ArrowButton from './ArrowButton';

const PlayersHand: FC = (): ReactElement => {
  const tile = new Tile(
    { bottom: Locations.GARDEN, left: Locations.GARDEN, right: Locations.GARDEN, top: Locations.GARDEN },
    Locations.GARDEN,
    true,
  );

  return (
    <div className="flex justify-center">
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Your tile:</p>
      <ArrowButton tile={tile} direction="right" />
      <TileContainer tile={tile} />
      <ArrowButton tile={tile} direction="left" />
    </div>
  );
};

export default PlayersHand;
