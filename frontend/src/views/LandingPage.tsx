import { FC, ReactElement } from 'react';

import DrawPile from '../components/DrawPile/DrawPile';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import mocksPlayers from '../mocks/mocksPlayers';

const LandingPage: FC = (): ReactElement => {
  return (
    <div className="flex justify-center">
      <DrawPile numberOfAvailableTiles={10} />
      <PlayersHand />
      <PlayersInfo players={mocksPlayers} currentPlayer={1} />
    </div>
  );
};

export default LandingPage;
