import { FC, ReactElement } from 'react';

import DrawPile from '../components/DrawPile/DrawPile';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import PlayersHand from '../components/PlayersHand/PlayersHand';

import { APPLICATION_TITLE } from '../constants/labels';
import Locations from '../constants/locations';
import mocksPlayers from '../mocks/mocksPlayers';
import Tile from '../model/Tile';

const LandingPage: FC = (): ReactElement => {
  const testVar = 'test';
  const tile = new Tile(
    { bottom: Locations.FIELD, left: Locations.CITY, right: Locations.FIELD, top: Locations.CITY },
    Locations.CITY,
    false,
  );

  return (
    <div className="flex justify-center">
      <h1 className="font-bold text-2xl text-blue-900">{APPLICATION_TITLE}</h1>
      <h1 className="font-bold text-2xl text-blue-900 bg-gray-200 text-red-300">{testVar}</h1>
      <DrawPile numberOfAvailableTiles={10} />
      <PlayersInfo players={mocksPlayers} currentPlayer={1} />
      <PlayersHand tile={tile} />

    </div>
  );
};

export default LandingPage;
