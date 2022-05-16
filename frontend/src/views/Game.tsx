import React, { ReactElement, useContext, useState } from 'react';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import GameTimer from '../components/GameTimer/GameTimer';
import GameBoard from '../components/GameBoard/GameBoard';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import DrawPile from '../components/DrawPile/DrawPile';
import Legend from '../components/Legend/Legend';
import { GAMEBOARD_LAYOUT_PROPORTION } from '../constants/gameDefaults';
import { MENU_TITLE_SOURCE } from '../constants/layoutElements';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';
import { openEndGameModal, EndGameModal } from '../components/Modal/EndGameModal';
import DataStoreContext, { drawnTiles } from '../components/DataStoreContext/DataStoreContext';
import { InvalidMoveModal } from '../components/Modal/InvalidMoveModal';
import { EndTurnModal } from '../components/Modal/EndTurnModal';

const GamePage: React.FunctionComponent = (): ReactElement => {
  const context = useContext(DataStoreContext);
  const [currentPlayer] = useState<number>(0);
  const [endOfTurn, setEndOfTurn] = useState<boolean>(false);
  const drawTilesLeft = drawnTiles.length - context.turnNumber > 0 ? drawnTiles.length - context.turnNumber : 0;
  const { turnNumber } = useContext(DataStoreContext);

  const gamebordLayoutProportion = `${GAMEBOARD_LAYOUT_PROPORTION * 100}%`;
  const playersInfoLayoutProportion = `${((1 - GAMEBOARD_LAYOUT_PROPORTION) / 2) * 100 - 1}%`;
  const drawPileLayoutProportion = `${((1 - GAMEBOARD_LAYOUT_PROPORTION * 100) / 2) * 100 - 1}%`;

  let tilesLeft = drawnTiles.length - turnNumber;
  if (tilesLeft == 1) {
    openEndGameModal();
  }

  return (
    <div style={{ height: '97vh' }}>
      <div
        className="flex justify-between items-center z-50"
        style={{ height: playersInfoLayoutProportion, maxHeight: playersInfoLayoutProportion, minHeight: '128px' }}
      >
        <div className="flex justify-center">
          <Link to={PATH_TO_HOMEPAGE}>
            <img src={MENU_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
          </Link>
        </div>
        <PlayersInfo players={context?.allPlayersData} currentPlayer={currentPlayer} />
        <GameTimer isTurnTimerVisible={false} turnLength={60} setEndOfTurn={setEndOfTurn} />
        <div className="flex justify-end">
          <Legend />
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ height: gamebordLayoutProportion, maxHeight: gamebordLayoutProportion, overflow: 'auto' }}
      >
        <GameBoard endOfTurn={endOfTurn} setEndOfTurn={setEndOfTurn} />
      </div>
      <div
        className="flex justify-around"
        style={{ bottom: 0, height: drawPileLayoutProportion, maxHeight: drawPileLayoutProportion }}
      >
        {!endOfTurn && <PlayersHand />}
        <DrawPile numberOfAvailableTiles={drawTilesLeft} />
      </div>
      <InvalidMoveModal />
      <EndTurnModal />
      <EndGameModal />
    </div>
  );
};

export default GamePage;
