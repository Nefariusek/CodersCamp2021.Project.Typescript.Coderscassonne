import { useState } from 'react';

import AddedPlayers from '../components/CreatePlayer/AddedPlayers';
import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
//import DataStoreContext from '../components/DataStoreContext/DataStoreContext';
import Technologies from '../constants/technologies';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';

const CreatePlayersPage = observer(() => {
  const players = rootStore.playersStore.players;

  const [availableTechnologies, setAvailableTechnologies] = useState<Technologies[]>([
    Technologies.HTML,
    Technologies.JS,
    Technologies.TS,
    Technologies.NODE,
    Technologies.REDUX,
  ]);

  return (
    <div className="flex items-center justify-center">
      {availableTechnologies.length > 0 && (
        <CreatePlayer
          availableTechnologies={availableTechnologies}
          setAvailableTechnologies={setAvailableTechnologies}
          playersNames={players.map((player) => player.name)}
        />
      )}
      {players.length > 0 && <AddedPlayers players={players} />}
    </div>
  );
});

export default CreatePlayersPage;
