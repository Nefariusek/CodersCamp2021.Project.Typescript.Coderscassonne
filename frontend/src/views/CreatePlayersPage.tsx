import { useState } from 'react';

import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
import Technologies from '../constants/technologies';
// import Player from '../model/Player';

const CreatePlayersPage = () => {
  // const [players, setPlayers] = useState<Player[]>([]);
  const [availableTechnologies] = useState<Technologies[]>([
    Technologies.HTML,
    Technologies.JS,
    Technologies.TS,
    Technologies.NODE,
    Technologies.REDUX,
  ]);
  return (
    <div className="bg-black flex items-center justify-center">
      <CreatePlayer availableTechnologies={availableTechnologies} />
    </div>
  );
};

export default CreatePlayersPage;
