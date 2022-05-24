// import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import Project from '../model/Project';
import rootStore from '../stores/RootStore';

export const placeMeeple = (project: Project) => {
  if (project) {
    const meeple = project.addMeeple();
    const currentContainer = rootStore.gameStore.boardState.find(
      (container) => container.tile === rootStore.gameStore.recentlyPlacedTile,
    );
    if (currentContainer) {
      currentContainer.meeple = meeple;
    }
  }
};
