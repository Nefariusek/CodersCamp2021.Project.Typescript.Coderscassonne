import { useEffect, useState, useContext } from 'react';

import { TurnLength } from '../../model/Settings';
import DataStoreContext from '../DataStoreContext/DataStoreContext';
import NextPhaseButton from '../NextPhaseButton/NextPhaseButton';
import TurnTimer from './TurnTimer';

interface GameTimerProps {
  isTurnTimerVisible: boolean;
  turnLength: TurnLength;
  setEndOfTurn: React.Dispatch<React.SetStateAction<boolean>>;
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

  // const handleTurnEnd = () => {
  //   if (context.setTurnNumber) {
  //     context.setTurnNumber((turnNumber) => turnNumber + 1);
  //   }
  //   props.setEndOfTurn(false);
  // };

  return (
    <div className="font-ALMENDRA font-bold text-3xl w-max text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
      <div className="flex">
        <NextPhaseButton />
        <div className="flex-column ml-5 mt-1">
          <p>Turn number: {context.turnNumber}</p>
          <p>
            Game time: {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
          </p>
          {isTurnTimerVisible && <TurnTimer turnLength={turnLength} />}
        </div>
      </div>
      <div className="flex"></div>
    </div>
  );
};

export default GameTimer;
