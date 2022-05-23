import rootStore from '../../stores/RootStore';
import Button from '../Button/Button';
import { observer } from 'mobx-react';

export enum GamePhases {
  TILE_PLACEMENT = 'Tile placement phase',
  MEEPLE_PLACEMENT = 'Meeple placement phase',
  SCORE_PHASE = 'Score points phase',
}
const phases = [GamePhases.TILE_PLACEMENT, GamePhases.MEEPLE_PLACEMENT, GamePhases.SCORE_PHASE];

export const NextPhaseButton = observer(() => {
  const currentPhase = rootStore.gameStore.currentPhase;
  const handleNextPhase = () => {
    rootStore.gameStore.setNextPhase();
  };

  const active =
    'rounded-full mt-1 mr-3 border-2 border-solid border-DARKTHEME_LIGHT_GREEN_COLOR bg-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';
  const inactive = 'rounded-full mt-1 mr-3 border-2 border-solid border-DARKTHEME_LIGHT_GREEN_COLOR h-8 w-8';

  return (
    <div className="inline-flex">
      <div className="flex flex-col mt-2">
        <Button
          text={currentPhase === GamePhases.SCORE_PHASE ? 'End turn' : 'Next phase'}
          colorVariant="light"
          onClick={handleNextPhase}
        />
        <div className="flex">
          {phases.map((phase) => (
            <div key={phase} className={currentPhase === phase ? active : inactive} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default NextPhaseButton;
