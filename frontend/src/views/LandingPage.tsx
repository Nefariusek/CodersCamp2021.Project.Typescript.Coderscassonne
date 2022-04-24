import { FC, ReactElement, useState } from 'react';

import Modal from '../components/Modal/Modal';
import DrawPile from '../components/DrawPile/DrawPile';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import mocksPlayers from '../mocks/mocksPlayers';

const LandingPage: FC = (): ReactElement => {
  const [modalOn, setModalOn] = useState(false);
  const clicked = () => {
    setModalOn(true);
  };
  return (
    <div className="flex justify-center">
      <button className="bg-white text-black h-12" onClick={clicked}>
        Modal
      </button>
      <DrawPile numberOfAvailableTiles={10} />
      <PlayersHand />
      <PlayersInfo players={mocksPlayers} currentPlayer={1} />
      {modalOn && <Modal setModalOn={setModalOn} />}
    </div>
  );
};

export default LandingPage;
