import { useState } from 'react';

import AddedPlayers from '../components/CreatePlayer/AddedPlayers';
import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
import Technologies from '../constants/technologies';
import Player from '../model/Player';

const CreatePlayersPage = () => {
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

  const playerChange = (i: number) => {
    [players[i - 1], players[i]] = [players[i], players[i - 1]];
    setPlayers([...players]);
  };

  const savePlayers = () => {
    alert('saved');
  };

  return (
    <div className="bg-DARKTHEME_BACKGROUND_COLOR flex items-center justify-center">
      {availableTechnologies.length > 0 && (
        <CreatePlayer availableTechnologies={availableTechnologies} addPlayer={addPlayer} />
      )}
      {players.length > 0 && <AddedPlayers players={players} save={savePlayers} change={playerChange} />}
    </div>
  );
};

export default CreatePlayersPage;
