import { FC, ReactElement } from 'react';

import DrawPile from '../components/DrawPile/DrawPile';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import TileContainer from '../components/TileContainer';
import { APPLICATION_TITLE } from '../constants/labels';
import Locations from '../constants/locations';
import Tile from '../model/Tile';

const LandingPage: FC = (): ReactElement => {
  const testVar = 'test';

  const tile = new Tile(
    { bottom: Locations.CITY, left: Locations.CITY, right: Locations.CITY, top: Locations.CITY },
    Locations.CITY,
    true,
  );
  return (
    <div className="flex justify-center">
      <h1 className="font-bold text-2xl text-blue-900">{APPLICATION_TITLE}</h1>
      <h1 className="font-bold text-2xl text-blue-900 bg-gray-200 text-red-300">{testVar}</h1>
      <TileContainer tile={tile} />
      <DrawPile numberOfAvailableTiles={10} />
      <PlayersInfo currentPlayer={0} />
    </div>
  );
};

export default LandingPage;
