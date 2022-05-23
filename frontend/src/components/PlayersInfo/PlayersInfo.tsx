import { observer } from 'mobx-react';
import Player from '../../model/Player';
import rootStore from '../../stores/RootStore';

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

  return (
    <>
      {!isCurrent ? (
        <div className="flex justify-around items-center h-20 w-20 xl:h-28 xl:w-28 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_DARK_GREEN_COLOR text-2xl">
          <div className="flex justify-center w-[60px]">
            <img src={playerImage} alt={player.technology} width="60px" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 xl:gap-5 h-20 xl:h-28 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_DARK_GREEN_COLOR px-1 lg:px-2">
          <p className="font-ALMENDRA font-bold text-2xl lg:text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR py-3 sm:px-1 lg:px-2">
            {player.name}
          </p>
          <p className="font-ALMENDRA font-bold text-2xl lg:text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR py-3 sm:px-1 lg:px-2">
            {player.getMeepleCount()}x
          </p>
          <div className="flex justify-center w-[60px]">
            <img src={playerImage} alt={player.technology} width="60px" />
          </div>
          <p className="font-ALMENDRA font-bold text-2xl lg:text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR py-3 sm:px-1 lg:px-2">
            {`score: ${player.score}`}
          </p>
        </div>
      )}
    </>
  );
};

const PlayersInfo = observer(({ players }: PlayersInfoProps) => {
  const turnNumber = rootStore.gameStore.turnNumber;
  return (
    <div className="flex items-center bg-DARKTHEME_BACKGROUND_COLOR m-2">
      {players &&
        players.map((player, i) => (
          <PlayersInfoItem key={player.name} player={player} isCurrent={i === (turnNumber - 1) % players.length} />
        ))}
    </div>
  );
});

export default PlayersInfo;
