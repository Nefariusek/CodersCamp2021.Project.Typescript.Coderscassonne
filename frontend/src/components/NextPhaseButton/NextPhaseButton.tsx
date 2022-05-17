import rootStore from '../../stores/RootStore';
import Button from '../Button/Button';
import { observer } from 'mobx-react';

let buttonLabel = 'Next phase';

export enum GamePhases {
  TILE_PLACEMENT = 1,
  MEEPLE_PLACEMENT,
  SCORE_PHASE,
}

export const NextPhaseButton = observer(() => {
  const currentPhase = rootStore.gameStore.currentPhase;
  const numbers = [1, 2, 3];
  const handleNextPhase = () => {
    rootStore.gameStore.setNextPhase();
    if (currentPhase === 2) {
      buttonLabel = 'End turn';
    } else {
      buttonLabel = 'Next phase';
    }
  };
  const active =
    'rounded-full mt-1 mr-3 border-2 border-solid border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';
  const inactive = 'rounded-full mt-1 mr-3 border-2 border-solid border-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';

  return (
    <div className="flex flex-col mt-2">
      <Button text={buttonLabel} colorVariant="light" onClick={handleNextPhase} />
      <div className="flex">
        {numbers.map((number) => (
          <div key={number} className={currentPhase >= number ? active : inactive} />
        ))}
      </div>
    </div>
  );
});

export default NextPhaseButton;
