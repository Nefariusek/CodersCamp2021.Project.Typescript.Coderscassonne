import React, { ReactElement, useState } from 'react';
// @ts-ignore
import { MapInteractionCSS } from 'react-map-interaction';
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
import { InvalidMoveModal } from '../components/Modal/InvalidMoveModal';
import { EndTurnModal } from '../components/Modal/EndTurnModal';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';
import NextPhaseButton from '../components/NextPhaseButton/NextPhaseButton';
import DropDown from '../components/DropDown/DropDown';

const GamePage: React.FunctionComponent = observer((): ReactElement => {
  const players = rootStore.playersStore.players;
  const drawPileLength = rootStore.gameStore.drawPile.length;
  const [currentPlayer] = useState<number>(0);

  const gamebordLayoutProportion = `${GAMEBOARD_LAYOUT_PROPORTION * 100}%`;
  const playersInfoLayoutProportion = `${((1 - GAMEBOARD_LAYOUT_PROPORTION) / 2) * 100 - 1}%`;
  const drawPileLayoutProportion = `${((1 - GAMEBOARD_LAYOUT_PROPORTION * 100) / 2) * 100 - 1}%`;

  if (drawPileLength === 1) {
    openEndGameModal(); //TODO: game summary view
  }

  return (
    <div style={{ height: '97vh' }}>
      <div
        className="flex justify-between items-center z-0"
        style={{ height: playersInfoLayoutProportion, maxHeight: playersInfoLayoutProportion, minHeight: '128px' }}
      >
        <div className="flex justify-center">
          <Link to={PATH_TO_HOMEPAGE}>
            <img src={MENU_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
          </Link>
        </div>
        <PlayersInfo players={players} currentPlayer={currentPlayer} />
        <NextPhaseButton />
        <DropDown />
        <GameTimer isTurnTimerVisible={false} turnLength={60} />
        <div className="flex justify-end">
          <Legend />
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ height: gamebordLayoutProportion, maxHeight: gamebordLayoutProportion, overflow: 'auto' }}
      >
        <MapInteractionCSS minScale={0.5} maxScale={3}>
          <div className={`flex justify-center items-center w-screen`} style={{ height: gamebordLayoutProportion }}>
            <GameBoard />
          </div>
        </MapInteractionCSS>
      </div>
      <div
        className="flex justify-around"
        style={{ bottom: 0, height: drawPileLayoutProportion, maxHeight: drawPileLayoutProportion }}
      >
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
