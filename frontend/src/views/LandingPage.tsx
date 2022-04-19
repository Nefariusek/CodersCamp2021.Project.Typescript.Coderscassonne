import { FC, ReactElement } from 'react';

import DrawPile from '../components/DrawPile/DrawPile';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import Locations from '../constants/locations';
import Tile from '../model/Tile';
import TileState from '../constants/tileState';
import GameBoard from '../components/GameBoard/GameBoard';
const LandingPage: FC = (): ReactElement => {
  const tile = new Tile(
    { bottom: Locations.FIELD, left: Locations.CITY, right: Locations.FIELD, top: Locations.CITY },
    Locations.CITY,
    false,
  );

  return (
    <div className="flex justify-center flex-col">
      <GameBoard />
      <div className="flex justify-center">
        <DrawPile numberOfAvailableTiles={10} />
        <PlayersHand tile={tile} initialState={TileState.ACTIVE} />
      </div>
    </div>
  );
};

export default LandingPage;
