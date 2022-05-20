import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_SETTINGS } from '../constants/paths';

import AddedPlayers from '../components/CreatePlayer/AddedPlayers';
import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
import DataStoreContext from '../components/DataStoreContext/DataStoreContext';
import Technologies from '../constants/technologies';
import Player from '../model/Player';
import { SettingsModal } from '../components/Modal/SettingsModal';

const CreatePlayersPage = () => {
  const navigate = useNavigate();
  const context = useContext(DataStoreContext);
  const [players, setPlayers] = useState<Player[]>([]);
  const [availableTechnologies, setAvailableTechnologies] = useState<Technologies[]>([
    Technologies.HTML,
    Technologies.JS,
    Technologies.TS,
    Technologies.NODE,
    Technologies.REDUX,
  ]);

  const addPlayer = (playerName: string, technology: Technologies) => {
    const player: Player = new Player(playerName, technology);

    setPlayers([...players, player]);
    setAvailableTechnologies(availableTechnologies.filter((tech) => tech !== technology));
  };

  const changeOrderOfPlayers = (i: number) => {
    [players[i - 1], players[i]] = [players[i], players[i - 1]];
    setPlayers([...players]);
  };

  const savePlayers = () => {
    if (context.setAllPlayersData) {
      context.setAllPlayersData(players);
    }

    navigate(PATH_TO_SETTINGS);
  };

  return (
    <div className="flex items-center justify-center">
      {availableTechnologies.length > 0 && (
        <CreatePlayer
          availableTechnologies={availableTechnologies}
          playersNames={players.map((player) => player.name)}
          addPlayer={addPlayer}
        />
      )}
      {players.length > 0 && <AddedPlayers players={players} save={savePlayers} change={changeOrderOfPlayers} />}
      <SettingsModal />
    </div>
  );
};

export default CreatePlayersPage;
