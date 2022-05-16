import { useState } from 'react';
import Button from '../Button/Button';

const NEXT_PHASE_LABEL = 'Next phase';

export const NextPhaseButton = () => {
  const [counter, setCounter] = useState(0);
  const numbers = [1, 2, 3];

  const handleNextPhase = () => {
    setCounter((count) => count + 1);
  };
  const active = 'rounded-full mt-1 mr-3 border-2 border-solid bg-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';
  const inactive = 'rounded-full mt-1 mr-3 border-2 border-solid border-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';
  return (
    <div className="flex flex-col">
      <Button text={NEXT_PHASE_LABEL} colorVariant="light" onClick={handleNextPhase} />
      <div className="flex">
        {numbers.map((number) => (
          <div key={number} className={counter >= number ? active : inactive} />
        ))}
      </div>
    </div>
  );
};

export default NextPhaseButton;
