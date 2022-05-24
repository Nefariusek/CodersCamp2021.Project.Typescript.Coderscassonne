// import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import Project from '../model/Project';
import rootStore from '../stores/RootStore';

export const placeMeeple = (project: Project) => {
  // const currentPlayer = rootStore.playersStore.getCurrentPlayer()!;
  // const availableProjects = rootStore.projectStore.getAvailableProjects(rootStore.gameStore.recentlyPlacedTile);

  // if ((availableProjects && !availableProjects.length) || !availableProjects) {
  //   console.log('no available projects');
  // }
  // if (!currentPlayer.getMeepleCount()) {
  //   console.log('no meeples available');
  // }
  // if (rootStore.gameStore.currentPhase !== GamePhases.MEEPLE_PLACEMENT) {
  //   console.log('wrong game phase');
  // }
  if (project) {
    console.log(project);
    const meeple = project.addMeeple();
    const currentContainer = rootStore.gameStore.boardState.find(
      (container) => container.tile === rootStore.gameStore.recentlyPlacedTile,
    );
    if (currentContainer) {
      currentContainer.meeple = meeple;
      rootStore.gameStore.setNextPhase();
      rootStore.gameStore.emitMeeplePlacementMessage(project.type, currentContainer.column, currentContainer.column);
    }
  }
};
