import { FC, ReactElement } from 'react';

import Locations from '../../constants/locations';
import Tile from '../../model/Tile';
import TileContainer from '../TileContainer';

const PlayersHand: FC = (): ReactElement => {
  const tile = new Tile(
    { bottom: Locations.FIELD, left: Locations.CITY, right: Locations.FIELD, top: Locations.CITY },
    Locations.CITY,
    false,
  );

  return (
    <div className="flex justify-center">
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Your tile:</p>
      <TileContainer tile={tile} />
    </div>
  );
};

export default PlayersHand;
