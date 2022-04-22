import { useEffect, useState } from 'react';

import { TurnLength } from '../../model/Settings';
import TurnTimer from './TurnTimer';

interface GameTimerProps {
  isTurnTimerVisible: boolean;
  turnLength: TurnLength;
}

const GameTimer = (props: GameTimerProps) => {
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

  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
      <p>
        Game time: {minutes}:{seconds}s
      </p>
      {isTurnTimerVisible && <TurnTimer turnLength={turnLength} />}
    </div>
  );
};

export default GameTimer;
