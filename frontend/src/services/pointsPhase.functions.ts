import { GamePhases } from '../components/NextPhaseButton/NextPhaseButton';
import Locations from '../constants/locations';
import Project from '../model/Project';
import Tile from '../model/Tile';
import rootStore from '../stores/RootStore';

export const evaluatePoints = (tile: Tile) => {
  if (rootStore.gameStore.currentPhase !== GamePhases.SCORE_PHASE) {
    console.log('wrong phase');
  }
  evaluateRoadProjects(tile);
  evaluateCityProjects(tile);
  evaluateMonasteryProjects();
  if (rootStore.gameStore.drawPile.length < 1) {
    evaluateUnfinishedProjects();
  }
};

function evaluateRoadProjects(tile: Tile) {
  const roadProjects = rootStore.projectStore.allProjects.filter(
    (project) => project.type === Locations.ROAD && project.tiles.includes(tile),
  );

  if (roadProjects) {
    roadProjects.forEach((project) => {
      const roadEnds = project.tiles.filter((t) => t.middle.every((m) => m !== Locations.ROAD));

      if (roadEnds.length > 1) {
        finishProject(project, 2);
      }
    });
  }
}
function evaluateCityProjects(tile: Tile) {
  const cityProjects = rootStore.projectStore.allProjects.filter(
    (project) => project.type === Locations.CITY && project.tiles.includes(tile),
  );
  if (cityProjects) {
    cityProjects.forEach((project) => {
      if (false) {
        finishProject(project, 2);
      }
    });
  }
}

function evaluateMonasteryProjects() {
  const monasteryProjects = rootStore.projectStore.allProjects.filter(
    (project) => project.type === Locations.MONASTERY,
  );
  if (monasteryProjects) {
    monasteryProjects.forEach((project) => {
      if (project.meeples.length > 8) {
        finishProject(project, 1);
      }
    });
  }
}

function finishProject(project: Project, factor: number) {
  project.meeples.forEach((meeple) => {
    meeple.player.updateScore(project.tiles.length * factor);
    meeple.player.returnMeeple(meeple);
  });
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
