import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWorkInProgressModal } from '../components/Modal/WorkInProgressModal';
import Button from '../components/Button/Button';

import { PATH_TO_CREDITS, PATH_TO_HOWTOPLAYPAGE, PATH_TO_CREATE_PLAYERS, PATH_TO_GAMEPAGE } from '../constants/paths';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import Technologies from '../constants/technologies';
import Player from '../model/Player';
//import DataStoreContext, { DataStoreContextInterface } from '../components/DataStoreContext/DataStoreContext';
import GameMode from '../model/GameMode';

const HomePage: React.FunctionComponent = observer((): ReactElement => {
  const navigate = useNavigate();
  //const context = useContext(DataStoreContext);
  const views: { name: string; url: string }[] = [
    { name: 'Play game', url: PATH_TO_CREATE_PLAYERS },
    { name: 'Scoreboard', url: 'TODO' },
    { name: 'How to play', url: PATH_TO_HOWTOPLAYPAGE },
    { name: 'Credits', url: PATH_TO_CREDITS },
  ];

  const handleDevelopmentModeButtonClick = () => rootStore.setIsDevelopmentMode();

  return (
    <div className="flex justify-center mt-30 pt-10">
      <div className="flex flex-col">
        <Button
          text={rootStore.isDevelopmentMode ? 'DEV' : 'PROD'}
          onClick={handleDevelopmentModeButtonClick}
          colorVariant="light"
        />

        {views.map((view) => (
          <div key={view.name} className="my-2">
            <Button
              text={view.name}
              onClick={async () => {
                if (view.url === 'TODO') {
                  openWorkInProgressModal();
                } else {
                  if (rootStore.isDevelopmentMode && view.url === PATH_TO_CREATE_PLAYERS) {
                    initDevelopmentPreset();
                    await rootStore.gameStore.initGameStore();
                    navigate(PATH_TO_GAMEPAGE);
                  } else if (view.url === PATH_TO_CREATE_PLAYERS) {
                    await rootStore.gameStore.initGameStore();
                    navigate(view.url);
                  } else {
                    navigate(view.url);
                  }
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

function initDevelopmentPreset() {
  const playerOne: Player = new Player('Tic', Technologies.HTML);
  const playerTwo: Player = new Player('Tac', Technologies.JS);
  const playerThree: Player = new Player('Toe', Technologies.TS);
  rootStore.playersStore.players.push(playerOne, playerTwo, playerThree);
  // if (context.setAllPlayersData) {
  //   context.setAllPlayersData([playerOne, playerTwo, playerThree]);
  // }

  const mode = new GameMode(60, 128, 64, 64, 'Classic');
  localStorage.setItem('Game mode', JSON.stringify(mode));
}

export default HomePage;
