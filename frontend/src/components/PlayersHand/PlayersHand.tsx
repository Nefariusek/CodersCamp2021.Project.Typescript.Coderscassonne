import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import TileContainer from '../TileContainer/TileContainer';
import ArrowButton from './ArrowButton';
import TileState from '../../constants/tileState';
import rootStore from '../../stores/RootStore';

const PlayersHand = observer((): ReactElement => {
  const tileInHand = rootStore.gameStore.tileInHand;

  return tileInHand ? (
    <div className="flex justify-center">
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Your tile:</p>
      <ArrowButton tile={tileInHand} direction="right" />
      <TileContainer tile={tileInHand} initialState={TileState.TAKEN} />
      <ArrowButton tile={tileInHand} direction="left" />
    </div>
  ) : (
    <div>
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Tile placed!</p>
    </div>
  );
});

export default PlayersHand;
