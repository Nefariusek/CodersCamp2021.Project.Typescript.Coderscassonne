import Player from '../../model/Player';

interface PlayersInfoProps {
  players: Player[];
  currentPlayer: number;
}
interface PlayerInfoProps {
  player: Player;
  isCurrent: boolean;
}

const PlayerInfo = ({ player, isCurrent }: PlayerInfoProps) => {
  const playerImage = `./Elements/Meeple/${player.technology}_meeple.png`;
  const cardImage = `./Elements/Meeple/Card_${player.technology}.png`;
  if (!isCurrent) {
    return (
      <div className="flex justify-around items-center h-28 w-28 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_DARK_GREEN_COLOR">
        <img src={playerImage} alt={player.technology} />
      </div>
    );
  }
  return (
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
        <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">{1}x</p>
      </div>
    </div>
  );
};

const PlayersInfo = ({ players, currentPlayer }: PlayersInfoProps) => (
  <div className="flex items-center bg-black">
    {players.map((player, i) => (
      <PlayerInfo player={player} isCurrent={i === currentPlayer} />
    ))}
  </div>
);

export default PlayersInfo;