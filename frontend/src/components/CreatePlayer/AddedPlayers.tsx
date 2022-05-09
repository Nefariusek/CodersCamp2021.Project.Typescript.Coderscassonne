import Player from '../../model/Player';
import Button from '../Button/Button';

interface AddedPlayersProps {
  players: Player[];
  save: () => void;
  change: (arg0: number) => void;
}

interface AddedPlayersItemProps {
  player: Player;
  number: number;
  last: boolean;
  change: (arg0: number) => void;
}

const AddedPlayersItem = ({ player, number, last, change }: AddedPlayersItemProps) => {
  const playerImage = `./Elements/Meeple/${player.technology}_meeple.png`;
  return (
    <div className="flex items-center justify-between w-80">
      <div className="flex items-center justify-center">
        {number !== 1 ? (
          <input
            className="h-12"
            type="image"
            src="./Elements/Layout/up_arrow.png"
            alt="up"
            onClick={() => change(number - 1)}
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
            onClick={() => change(number)}
          />
        ) : (
          <input className="h-12 opacity-0" type="image" src="./Elements/Layout/down_arrow.png" alt="down" disabled />
        )}
      </div>
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">{player.name}</p>
      <img src={playerImage} alt={player.technology} />
    </div>
  );
};

const AddedPlayers = ({ players, save, change }: AddedPlayersProps) => (
  <div className="flex flex-col items-center justify-between w-96 h-[550px] border-4 border-DARKTHEME_LIGHT_GREEN_COLOR">
    <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Players</p>
    <div className="flex flex-col items-center justify-around">
      {players.map((player, i) => (
        <AddedPlayersItem
          key={player.name}
          player={player}
          number={i + 1}
          last={i + 1 === players.length}
          change={change}
        />
      ))}
    </div>
    {players.length > 1 ? (
      <div className="m-10">
        <Button text="Continue" onClick={save} colorVariant="light" />
      </div>
    ) : (
      <div className="h-10 m-10 w-44" />
    )}
  </div>
);
export default AddedPlayers;
