import { BASE_URL } from '../constants/restResources';
import getTiles from '../api/getTiles';
import GameModeParser from '../components/GameModeParser';
import GameStore from '../stores/GameStore';
import { JSONData } from '../mocks/mocksTiles';
import rootStore, { setBoardStateVariableReference } from '../stores/RootStore';

export default async function startGameWithTilesRetrieval() {
  const { data } = await getTiles(`${BASE_URL}api/tiles`);
  let parsedTilesInGame;
  if (!!data) {
    parsedTilesInGame = GameModeParser(data);
  } else {
    parsedTilesInGame = GameModeParser(JSONData);
  }
  rootStore.gameStore = new GameStore(rootStore, parsedTilesInGame);
  setBoardStateVariableReference();
}
