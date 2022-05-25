import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import Locations from '../constants/locations';
import rootStore from '../stores/RootStore';

export function evaluateProjects() {
  if (rootStore.gameStore.currentPhase !== GamePhases.SCORE_PHASE) {
    // console.log('wrong phase');
  }
  const finishableProjects = rootStore.projectStore.allProjects.filter(
    (project) => !project.isFinished && project.isFinishable,
  );

  if (finishableProjects.length) {
    finishableProjects.forEach((project) => project.finishProject());
  }

  if (rootStore.gameStore.drawPile.length < 1) {
    const unfinishedProjects = rootStore.projectStore.allProjects.filter((project) => !project.isFinished);
    unfinishedProjects.forEach((project) => project.scoreUnfinishedProject());
  }
}

export const evaluateUnfinishedProjects = () => {
  const unfinishedProjects = rootStore.projectStore.allProjects.filter((project) => !project.isFinished);
  unfinishedProjects.forEach((project) => {
    if (project.type !== Locations.MONASTERY) {
      project.meeples.forEach((meeple) => {
        meeple.player.updateScore(project.tiles.length);
        meeple.player.returnMeeple(meeple);
      });
    }
  });
};
