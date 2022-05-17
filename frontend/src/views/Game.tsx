import React, { ReactElement, useContext, useState } from 'react';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import GameTimer from '../components/GameTimer/GameTimer';
import GameBoard from '../components/GameBoard/GameBoard';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import DrawPile from '../components/DrawPile/DrawPile';
import Legend from '../components/Legend/Legend';
import { MENU_TITLE_SOURCE } from '../constants/layoutElements';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';
import { openEndGameModal, EndGameModal } from '../components/Modal/EndGameModal';
import DataStoreContext from '../components/DataStoreContext/DataStoreContext';
import { InvalidMoveModal } from '../components/Modal/InvalidMoveModal';
import { EndTurnModal } from '../components/Modal/EndTurnModal';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';
import NextPhaseButton from '../components/NextPhaseButton/NextPhaseButton';

const GamePage: React.FunctionComponent = observer((): ReactElement => {
  const context = useContext(DataStoreContext);
  const drawPileLength = rootStore.gameStore.drawPile.length;
  const [currentPlayer] = useState<number>(0);
  if (drawPileLength === 1) {
    openEndGameModal(); //TODO: game summary view
  }

  return (
    <div>
      <div className="flex justify-between p-[10px] z-0">
        <div className="mt-6">
          <Link to={PATH_TO_HOMEPAGE}>
            <img src={MENU_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
          </Link>
        </div>
        <PlayersInfo players={context?.allPlayersData} currentPlayer={currentPlayer} />
        <NextPhaseButton />
        <GameTimer isTurnTimerVisible={false} turnLength={60} />
        <div className="w-[300px] mt-6 flex justify-end">
          <Legend />
        </div>
      </div>
      <div className="flex justify-center">
        <GameBoard />
      </div>
      <div className="flex justify-around p-[10px]">
        {<PlayersHand />}
        <DrawPile numberOfAvailableTiles={drawPileLength} />
      </div>
      <InvalidMoveModal />
      <EndTurnModal />
      <EndGameModal />
    </div>
  );
});

export default GamePage;
