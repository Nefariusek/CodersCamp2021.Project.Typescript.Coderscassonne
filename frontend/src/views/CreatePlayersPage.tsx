import { useState } from 'react';

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

  return (
    <div className="bg-black flex items-center justify-center">
      <CreatePlayer availableTechnologies={availableTechnologies} addPlayer={addPlayer} />
    </div>
  );
};

export default CreatePlayersPage;
