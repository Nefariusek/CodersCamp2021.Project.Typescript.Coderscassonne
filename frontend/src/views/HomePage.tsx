import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWorkInProgressModal } from '../components/Modal/WorkInProgressModal';
import { SettingsModal } from '../components/Modal/SettingsModal';
import Button from '../components/Button/Button';
import WebSocketConnection from '../model/websocket/WebSocketConnection';

import { PATH_TO_CREDITS, PATH_TO_HOWTOPLAYPAGE, PATH_TO_CREATE_PLAYERS, PATH_TO_GAMEPAGE } from '../constants/paths';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import Technologies from '../constants/technologies';
import Player from '../model/Player';
import GameMode from '../model/GameMode';

const HomePage: React.FunctionComponent = observer((): ReactElement => {
  const navigate = useNavigate();
  const views: { name: string; url: string }[] = [
    { name: 'Play Local Game', url: PATH_TO_CREATE_PLAYERS },
    { name: 'Play Mutliplayer', url: PATH_TO_CREATE_PLAYERS },
    { name: 'Scoreboard', url: 'TODO' },
    { name: 'How to play', url: PATH_TO_HOWTOPLAYPAGE },
    { name: 'Credits', url: PATH_TO_CREDITS },
  ];

  useEffect(() => {
    if (!!rootStore.websocket) rootStore.websocket = undefined;
  }, []);

  return (
    <div className="flex justify-center mt-30 pt-10">
      <div className="flex flex-col">
        {views.map((view) => (
          <div key={view.name} className="my-2">
            <Button
              text={view.name}
              onClick={async () => {
                if (view.url === 'TODO') {
                  openWorkInProgressModal();
                } else {
                  if (rootStore.isDevelopmentMode) {
                    if (view.url === PATH_TO_CREATE_PLAYERS) {
                      initDevelopmentPreset();
                      await rootStore.gameStore.initGameStore();
                      navigate(PATH_TO_GAMEPAGE);
                    } else if (view.url === PATH_TO_CREATE_PLAYERS && view.name === 'Play Mutliplayer') {
                      initDevelopmentPreset();
                      rootStore.websocket = new WebSocketConnection();
                      await rootStore.gameStore.initGameStore();
                      navigate(view.url);
                    }
                  } else if (view.url === PATH_TO_CREATE_PLAYERS && view.name === 'Play Mutliplayer') {
                    rootStore.websocket = new WebSocketConnection();
                    await rootStore.gameStore.initGameStore();
                    navigate(view.url);
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
      <SettingsModal />
    </div>
  );
});

function initDevelopmentPreset() {
  const playerOne: Player = new Player('Tic', Technologies.HTML);
  const playerTwo: Player = new Player('Tac', Technologies.JS);
  const playerThree: Player = new Player('Toe', Technologies.TS);
  rootStore.playersStore.players.push(playerOne, playerTwo, playerThree);

  const mode = new GameMode(60, 128, 64, 64, 'Classic');
  localStorage.setItem('Game mode', JSON.stringify(mode));
}

export default HomePage;
