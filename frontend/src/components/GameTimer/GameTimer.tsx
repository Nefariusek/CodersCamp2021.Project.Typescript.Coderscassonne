import { useEffect, useState } from 'react';

import { TurnLength } from '../../model/Settings';
import TurnTimer from './TurnTimer';

interface GameTimerProps {
  isTurnTimerVisible: boolean;
  turnLength: TurnLength;
}

const GameTimer = ({ isTurnTimerVisible = false, turnLength }: GameTimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

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
  if (isTurnTimerVisible) {
    return (
      <div className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
        <p>
          Game time: {minutes}:{seconds}s
        </p>
        <TurnTimer turnLength={turnLength} />
      </div>
    );
  }
  return (
    <div className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR" p-3>
      <p>Game time: {seconds}s</p>
    </div>
  );
};

export default GameTimer;
