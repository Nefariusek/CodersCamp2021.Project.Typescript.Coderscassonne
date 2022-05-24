import Player from '../../model/Player';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_GAME_MODE_PAGE } from '../../constants/paths';
import { observer } from 'mobx-react';
import rootStore from '../../stores/RootStore';
import { openModal } from '../Modal/Modal';

interface AddedPlayersProps {
  players: Player[];
}

interface AddedPlayersItemProps {
  player: Player;
  number: number;
  last: boolean;
}

const AddedPlayersItem = observer(({ player, number, last }: AddedPlayersItemProps) => {
  const playerImage = `./Elements/Meeple/${player.technology}_meeple.png`;
  const changeOrderOfPlayers = (num: number) => {
    if (rootStore.room) {
      rootStore.websocket?.emitChangeOrderOfPlayers(num);
    } else {
      rootStore.playersStore.changeOrderOfPlayers(num);
    }
  };

  return (
    <div className="flex items-center justify-between w-80">
      <div className="flex items-center justify-center">
        {number !== 1 ? (
          <input
            className="h-12"
            type="image"
            src="./Elements/Layout/up_arrow.png"
            alt="up"
            onClick={() => changeOrderOfPlayers(number - 1)}
          />
        ) : (
          <input className="h-12 opacity-0" type="image" src="./Elements/Layout/up_arrow.png" alt="up" disabled />
        )}
        <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">{number}. </p>
        {!last ? (
          <input
            className="h-12"
            type="image"
            src="./Elements/Layout/down_arrow.png"
            alt="down"
            onClick={() => changeOrderOfPlayers(number)}
          />
        ) : (
          <input className="h-12 opacity-0" type="image" src="./Elements/Layout/down_arrow.png" alt="down" disabled />
        )}
      </div>
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">{player.name}</p>
      <img src={playerImage} alt={player.technology} />
    </div>
  );
});

const AddedPlayers = observer(({ players }: AddedPlayersProps) => {
  const navigate = useNavigate();
  const handleContinueButton = () => {
    if (rootStore.room) {
      openModal('waitingForPayers');
      rootStore.websocket?.emitContinue();
    } else {
      navigate(PATH_TO_GAME_MODE_PAGE);
    }
  };
  return (
    <div className="flex flex-col items-center justify-between w-96 h-[580px] bg-DARKTHEME_BACKGROUND_COLOR border-4 border-DARKTHEME_LIGHT_GREEN_COLOR">
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Players</p>
      <div className="flex flex-col items-center justify-around">
        {players.map((player, i) => (
          <AddedPlayersItem key={player.name} player={player} number={i + 1} last={i + 1 === players.length} />
        ))}
      </div>
      {players.length > 1 && (!rootStore.room || rootStore.clientName) ? (
        <div className="m-10">
          <Button text="Continue" onClick={handleContinueButton} colorVariant="light" />
        </div>
      ) : (
        <div className="h-10 m-10 w-44" />
      )}
    </div>
  );
});
export default AddedPlayers;
