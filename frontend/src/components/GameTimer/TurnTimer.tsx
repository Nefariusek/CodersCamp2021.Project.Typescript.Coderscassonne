import { useEffect, useState } from 'react';

import { TurnLength } from '../../model/Settings';

interface TurnTimerProps {
  turnLength: TurnLength;
}

const TurnTimer = ({ turnLength }: TurnTimerProps) => {
  const [counter, setCounter] = useState<number>(turnLength);

  useEffect(() => {
    if (counter > 0) setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return <div className="text-2xl"> Time left: {counter}s </div>;
};

export default TurnTimer;
