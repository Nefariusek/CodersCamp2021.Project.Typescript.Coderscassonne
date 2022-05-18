import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_SETTINGS } from '../constants/paths';

import AddedPlayers from '../components/CreatePlayer/AddedPlayers';
import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
//import DataStoreContext from '../components/DataStoreContext/DataStoreContext';
import Technologies from '../constants/technologies';
//import Player from '../model/Player';
import rootStore from '../stores/RootStore';
import { observer } from 'mobx-react';

const CreatePlayersPage = observer(() => {
  const players = rootStore.playersStore.players;
  const setPlayer = rootStore.playersStore.setPlayer;
  const changeOrderOfPlayers = rootStore.playersStore.changeOrderOfPlayers;
  const navigate = useNavigate();
  // const context = useContext(DataStoreContext);
  // const [players, setPlayers] = useState<Player[]>([]);
  const [availableTechnologies, setAvailableTechnologies] = useState<Technologies[]>([
    Technologies.HTML,
    Technologies.JS,
    Technologies.TS,
    Technologies.NODE,
    Technologies.REDUX,
  ]);

  const addPlayer = (playerName: string, technology: Technologies) => {
    // const player: Player = new Player(playerName, technology);
    // setPlayers([...players, player]);
    setPlayer(playerName, technology);
    setAvailableTechnologies(availableTechnologies.filter((tech) => tech !== technology));
  };

  // const changeOrderOfPlayers = (i: number) => {
  //   [players[i - 1], players[i]] = [players[i], players[i - 1]];
  //   setPlayers([...players]);
  // };

  const savePlayers = () => {
    // if (context.setAllPlayersData) {
    //   context.setAllPlayersData(players);
    // }

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
    </div>
  );
});

export default CreatePlayersPage;
