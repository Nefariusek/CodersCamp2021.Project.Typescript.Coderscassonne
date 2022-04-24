import { useContext } from 'react';
import Player from '../../model/Player';
import DataStoreContext from '../DataStoreContext/DataStoreContext';

interface PlayersInfoProps {
  players: Player[] | undefined;
  currentPlayer: number;
}
interface PlayersInfoItemProps {
  player: Player;
  isCurrent: boolean;
}

const PlayersInfoItem = ({ player, isCurrent }: PlayersInfoItemProps) => {
  const playerImage = `./Elements/Meeple/${player.technology}_meeple.png`;
  const cardImage = `./Elements/Meeple/Card_${player.technology}.png`;
  return (
    <>
      {!isCurrent ? (
        <div className="flex justify-around items-center h-28 w-28 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_DARK_GREEN_COLOR">
          <img src={playerImage} alt={player.technology} />
        </div>
      ) : (
        <div className="flex items-center gap-10 h-28 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_DARK_GREEN_COLOR">
          <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">{player.name}</p>
          <div className="flex justify-center">
            <img src={playerImage} alt={player.technology} />
            <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
              {player.getMeepleCount()}x
            </p>
          </div>
          <div className="flex justify-center">
            <img src={cardImage} alt={player.technology} />
            <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">{1}x </p>
          </div>
        </div>
      )}
    </>
  );
};

const PlayersInfo = ({ players }: PlayersInfoProps) => {
  const { turnNumber } = useContext(DataStoreContext);
  return (
    <div className="flex items-center bg-DARKTHEME_BACKGROUND_COLOR">
      {players &&
        players.map((player, i) => (
          <PlayersInfoItem key={player.name} player={player} isCurrent={i === (turnNumber + 1) % players.length} />
        ))}
    </div>
  );
};

export default PlayersInfo;
