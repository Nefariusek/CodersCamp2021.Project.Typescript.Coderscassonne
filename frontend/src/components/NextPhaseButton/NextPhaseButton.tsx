import rootStore from '../../stores/RootStore';
import Button from '../Button/Button';

const NEXT_PHASE_LABEL = 'Next phase';

export enum GamePhases {
  TILE_PLACEMENT = 1,
  MEEPLE_PLACEMENT,
  SCORE_PHASE,
}

export const NextPhaseButton = () => {
  const currentPhase = rootStore.gameStore.currentPhase;
  const numbers = [1, 2, 3];
  console.log(currentPhase);
  const handleNextPhase = () => {
    rootStore.gameStore.setNextPhase();
    console.log(currentPhase);
    console.log('nextPhaseButton');
  };
  const active = 'rounded-full mt-1 mr-3 border-2 border-solid bg-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';
  const inactive = 'rounded-full mt-1 mr-3 border-2 border-solid border-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';

  return (
    <div className="flex flex-col">
      <Button text={NEXT_PHASE_LABEL} colorVariant="light" onClick={handleNextPhase} />
      <div className="flex">
        {numbers.map((number) => (
          <div key={number} className={currentPhase >= number ? active : inactive} />
        ))}
      </div>
    </div>
  );
};

export default NextPhaseButton;
