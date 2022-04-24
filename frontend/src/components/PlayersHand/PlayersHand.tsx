import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import TileContainer from '../TileContainer/TileContainer';
import ArrowButton from './ArrowButton';
import DataStoreContext from '../DataStoreContext/DataStoreContext';
import TileState from '../../constants/tileState';

const PlayersHand = observer((): ReactElement => {
  const { tileInHand } = useContext(DataStoreContext);

  return (
    <div className="flex justify-center">
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Your tile:</p>
      <ArrowButton tile={tileInHand} direction="right" />
      <TileContainer tile={tileInHand} initialState={TileState.TAKEN} />
      <ArrowButton tile={tileInHand} direction="left" />
    </div>
  );
});

export default PlayersHand;
