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
import DataStoreContext, { drawnTiles } from '../components/DataStoreContext/DataStoreContext';

const GamePage: React.FunctionComponent = (): ReactElement => {
  const context = useContext(DataStoreContext);
  const [currentPlayer] = useState<number>(0);
  const [endOfTurn, setEndOfTurn] = useState<boolean>(false);
  const drawTilesLeft = drawnTiles.length - context.turnNumber > 0 ? drawnTiles.length - context.turnNumber : 0;
  const { turnNumber } = useContext(DataStoreContext);
  let tilesLeft = drawnTiles.length - turnNumber;
  if (tilesLeft == 1) {
    openEndGameModal();
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
        <GameTimer isTurnTimerVisible={false} turnLength={60} setEndOfTurn={setEndOfTurn} />
        <div className="w-[300px] mt-6 flex justify-end">
          <Legend />
        </div>
      </div>
      <div className="flex justify-center">
        <GameBoard endOfTurn={endOfTurn} setEndOfTurn={setEndOfTurn} />
      </div>
      <div className="flex justify-around p-[10px]">
        {!endOfTurn && <PlayersHand />}
        <DrawPile numberOfAvailableTiles={drawTilesLeft} />
      </div>
      <EndGameModal />
    </div>
  );
};

export default GamePage;
