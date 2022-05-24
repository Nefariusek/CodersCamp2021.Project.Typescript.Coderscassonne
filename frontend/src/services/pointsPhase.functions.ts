import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import rootStore from '../stores/RootStore';

export function evaluateProjects() {
  if (rootStore.gameStore.currentPhase !== GamePhases.SCORE_PHASE) {
    console.log('wrong phase');
  }
  const finishableProjects = rootStore.projectStore.allProjects.filter(
    (project) => !project.isFinished && project.isFinishable,
  );

  if (finishableProjects.length) {
    finishableProjects.forEach((project) => project.finishProject());
  }
}
