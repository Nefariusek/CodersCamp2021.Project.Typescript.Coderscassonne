import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { socket } from '../../App';
import { TurnLength } from '../../model/Settings';
import rootStore from '../../stores/RootStore';
import Button from '../Button/Button';
import TurnTimer from './TurnTimer';

const END_TURN_LABEL = 'End your turn';
interface GameTimerProps {
  isTurnTimerVisible: boolean;
  turnLength: TurnLength;
}

const GameTimer = observer((props: GameTimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const { isTurnTimerVisible, turnLength } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 59) {
        setSeconds(0);
        setMinutes(minutes + 1);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const handleTurnEnd = () => {
    rootStore.gameStore.endCurrentTurn();
    socket.emit('meeplePlacementMessage', 'Meeple placed!');
  };

  return (
    <div className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR">
      <p>Turn number: {rootStore.gameStore.turnNumber}</p>
      <Button text={END_TURN_LABEL} onClick={handleTurnEnd} colorVariant="light" />

      <p>
        Game time: {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
      </p>
      {isTurnTimerVisible && <TurnTimer turnLength={turnLength} />}
    </div>
  );
});

export default GameTimer;
