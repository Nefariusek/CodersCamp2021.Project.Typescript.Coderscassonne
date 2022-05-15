import { useEffect, useState } from 'react';
import Button from '../Button/Button';

import { TurnLength } from '../../model/Settings';
//import DataStoreContext from '../DataStoreContext/DataStoreContext';
import TurnTimer from './TurnTimer';
import rootStore from '../../stores/RootStore';

const END_TURN_LABEL = 'End your turn';
interface GameTimerProps {
  isTurnTimerVisible: boolean;
  turnLength: TurnLength;
  setEndOfTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameTimer = (props: GameTimerProps) => {
  // const context = useContext(DataStoreContext);
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
    // if (context.setTurnNumber) {
    //   context.setTurnNumber((turnNumber) => turnNumber + 1);
    // }

    rootStore.gameStore.increaseTurnNumber();
    props.setEndOfTurn(false);
  };

  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
      <p>Turn number: {rootStore.gameStore.turnNumber}</p>
      <Button text={END_TURN_LABEL} onClick={handleTurnEnd} colorVariant="light" />

      <p>
        Game time: {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
      </p>
      {isTurnTimerVisible && <TurnTimer turnLength={turnLength} />}
    </div>
  );
};

export default GameTimer;
