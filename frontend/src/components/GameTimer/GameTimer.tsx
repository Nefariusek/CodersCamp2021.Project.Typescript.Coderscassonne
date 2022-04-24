import { useEffect, useState, useContext } from 'react';

import { TurnLength } from '../../model/Settings';
import DataStoreContext from '../DataStoreContext/DataStoreContext';
import TurnTimer from './TurnTimer';

const END_TURN_LABEL = 'End your turn';
interface GameTimerProps {
  isTurnTimerVisible: boolean;
  turnLength: TurnLength;
}

const GameTimer = (props: GameTimerProps) => {
  const context = useContext(DataStoreContext);
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
    if (context.setTurnNumber) {
      context.setTurnNumber((turnNumber) => turnNumber + 1);
    }
  };

  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
      <p>Turn number: {context.turnNumber}</p>
      <button
        className="bg-transparent hover:bg-DARKTHEME_DARK_GREEN_COLOR border border-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR w-60 py-2 px-4 my-3 "
        onClick={handleTurnEnd}
      >
        {END_TURN_LABEL}
      </button>

      <p>
        Game time: {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
      </p>
      {isTurnTimerVisible && <TurnTimer turnLength={turnLength} />}
    </div>
  );
};

export default GameTimer;
