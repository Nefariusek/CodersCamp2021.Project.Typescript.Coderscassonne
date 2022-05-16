import { useEffect, useState } from 'react';
import { TurnLength } from '../../model/Settings';

import TurnTimer from './TurnTimer';
import rootStore from '../../stores/RootStore';
import { observer } from 'mobx-react';

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
  };
  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
      <div className="flex">
        <div className="flex-column ml-5 mt-1"></div>
        <p>Turn number: {rootStore.gameStore.turnNumber}</p>
        <p>
          Game time: {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
        </p>
        {isTurnTimerVisible && <TurnTimer turnLength={turnLength} />}
      </div>
    </div>
  );
});

export default GameTimer;
