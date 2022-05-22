import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import Project from '../model/Project';
import Tile from '../model/Tile';
import rootStore from '../stores/RootStore';

export const placeMeeple = (tile: Tile, projectId: number) => {
  const currentPlayer = rootStore.playersStore.getCurrentPlayer()!;
  const availableProjects = rootStore.projectStore.getAvailableProjects(tile);

  if ((availableProjects && !availableProjects.length) || !availableProjects) {
    console.log('no available projects');
  }
  if (!currentPlayer.getMeepleCount()) {
    console.log('no meeples available');
  }
  if (rootStore.gameStore.currentPhase !== GamePhases.MEEPLE_PLACEMENT) {
    console.log('wrong game phase');
  }
  const meeple = currentPlayer.getMeeple()!;
  const selectedProject = availableProjects!.find((p: Project) => p.id === projectId);
  if (selectedProject) {
    selectedProject.meeples.push(meeple);
  }
};
