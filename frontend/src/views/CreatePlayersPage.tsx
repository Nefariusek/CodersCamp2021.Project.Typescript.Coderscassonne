import { useEffect, useState } from 'react';

import AddedPlayers from '../components/CreatePlayer/AddedPlayers';
import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
import Technologies from '../constants/technologies';
import { SettingsModal } from '../components/Modal/SettingsModal';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';
import WebSocketEvent from '../constants/webSocketEvents';
import Player from '../model/Player';
import { PATH_TO_GAME_MODE_PAGE } from '../constants/paths';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalEvents } from '../components/Modal/Modal';

const CreatePlayersPage = observer(() => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(rootStore.playersStore.players);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [availableTechnologies, setAvailableTechnologies] = useState<Technologies[]>([
    Technologies.HTML,
    Technologies.JS,
    Technologies.TS,
    Technologies.NODE,
    Technologies.REDUX,
  ]);

  useEffect(() => {
    rootStore.websocket?.emitGetPlayers();
    rootStore.websocket?.emitGetTechnologies();
  }, []);

  useEffect(() => {
    setErrorMessage('');
    rootStore.websocket?.socket.on(WebSocketEvent.SEND_PLAYERS, (data) => {
      if (data) {
        rootStore.playersStore.players = data.map(
          (p: { playerName: string; playerMeeple: Technologies }) => new Player(p.playerName, p.playerMeeple),
        );
        setPlayers(rootStore.playersStore.players);
      }
    });
    rootStore.websocket?.socket.on(WebSocketEvent.SEND_TECH, (data) => {
      if (data) {
        let tmp = availableTechnologies;
        data.forEach((tech: Technologies) => {
          tmp = tmp.filter((t) => t !== tech);
        });
        setAvailableTechnologies(tmp);
      }
    });

    rootStore.websocket?.socket.on(WebSocketEvent.READY, () => {
      rootStore.playersStore.players = players;
      navigate(PATH_TO_GAME_MODE_PAGE);
    });
    rootStore.websocket?.socket.on(WebSocketEvent.CREATE_PLAYER_ERROR, (errorMsg) => {
      setErrorMessage(errorMsg);
      return;
    });
  });

  return (
    <div className="flex items-center justify-center">
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10 self-center">
        {errorMessage}
      </p>
      {availableTechnologies.length > 0 && (
        <CreatePlayer
          availableTechnologies={availableTechnologies}
          setAvailableTechnologies={setAvailableTechnologies}
          playersNames={players.map((player) => player.name)}
        />
      )}
      {players.length > 0 && <AddedPlayers players={players} />}
      <SettingsModal />
      <Modal eventType={'waitingForPayers' as ModalEvents} />
    </div>
  );
});

export default CreatePlayersPage;
