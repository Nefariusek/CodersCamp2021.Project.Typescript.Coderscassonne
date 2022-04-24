import React, { ReactElement, useContext, useState } from 'react';
import DataStoreContext from '../components/DataStoreContext/DataStoreContext';
import PlayersInfo from '../components/PlayersInfo/PlayersInfo';
import GameTimer from '../components/GameTimer/GameTimer';
import GameBoard from '../components/GameBoard/GameBoard';
import PlayersHand from '../components/PlayersHand/PlayersHand';
import DrawPile from '../components/DrawPile/DrawPile';
import Legend from '../components/Legend/Legend';

const GamePage: React.FunctionComponent = (): ReactElement => {
  const context = useContext(DataStoreContext);
  const [currentPlayer] = useState<number>(0);

  return (
    <div>
      <div className="flex justify-between p-[10px] z-0">
        <PlayersInfo players={context?.allPlayersData} currentPlayer={currentPlayer} />
        <GameTimer isTurnTimerVisible={false} turnLength={60} />
        <div className="w-[300px] flex justify-end">
          <Legend />
        </div>
      </div>
      <div className="flex justify-center">
        <GameBoard />
      </div>
      <div className="flex justify-around p-[10px]">
        <PlayersHand />
        <DrawPile numberOfAvailableTiles={20} />
      </div>
    </div>
  );
};

export default GamePage;
