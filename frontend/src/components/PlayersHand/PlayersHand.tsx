import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';

import TileContainer, { TileInterface } from '../TileContainer/TileContainer';
import ArrowButton from './ArrowButton';
import TileState from '../../constants/tileState';

const PlayersHand = observer((props: TileInterface): ReactElement => {
  const { tile } = props;

  return (
    <div className="flex justify-center">
      <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Your tile:</p>
      <ArrowButton tile={tile!} direction="right" />
      <TileContainer tile={tile!} initialState={TileState.TAKEN} />
      <ArrowButton tile={tile!} direction="left" />
    </div>
  );
});

export default PlayersHand;
