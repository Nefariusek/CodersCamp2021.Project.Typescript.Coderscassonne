import { observer } from 'mobx-react-lite';
import { MouseEvent, ReactElement } from 'react';

import { ACTIVE_TILE_SOURCE, IDLE_TILE_SOURCE } from '../../constants/layoutElements';
import TileState from '../../constants/tileState';
import Meeple from '../../model/Meeple';
import Tile, { Edges } from '../../model/Tile';

const stylesForEdges = new Map<keyof Edges | 'middle', React.CSSProperties>([
  ['top', { position: 'absolute', top: 0, left: '60px' }],
  ['bottom', { position: 'absolute', bottom: 0, left: '60px' }],
  ['left', { position: 'absolute', left: 0, top: '60px' }],
  ['right', { position: 'absolute', right: 0, top: '60px' }],
  ['middle', { position: 'absolute', right: '60px', top: '60px' }],
]);

export interface TileInterface {
  tile: Tile | undefined;
  initialState: TileState;
  onChange?: (row: number, column: number, fromWebSocket: boolean, tile: Tile) => void;
  row?: number;
  column?: number;
  meeple?: Meeple;
}

const TileContainer = observer((props: TileInterface): ReactElement => {
  const { tile, initialState, onChange, row, column, meeple } = props;
  let edgeForMeeple;
  if (meeple && tile) {
    edgeForMeeple = Object.entries(tile.edges).find(([_edge, location]) => location === meeple.placedAt);
    console.log(edgeForMeeple);
  }

  function handleActiveTileClick(event: MouseEvent<HTMLImageElement>): void {
    event.preventDefault();
    if (onChange && row !== undefined && column !== undefined) {
      onChange(row, column, false, tile!);
    }
  }

  return (
    <div className="relative flex " onClick={initialState === TileState.ACTIVE ? handleActiveTileClick : undefined}>
      {initialState === TileState.IDLE && (
        <img src={IDLE_TILE_SOURCE} alt={TileState.IDLE} className="hover: cursor-not-allowed" />
      )}
      {initialState === TileState.ACTIVE && (
        <img id="active" src={ACTIVE_TILE_SOURCE} alt={TileState.ACTIVE} className="hover: cursor-pointer" />
      )}
      {initialState === TileState.TAKEN && (
        <img
          id="taken"
          src={tile?.getTileImageSourceById()}
          alt={TileState.TAKEN}
          className={`hover: cursor-not-allowed
      ${tile?.rotation === 90 ? 'rotate-90' : ''}
      ${tile?.rotation === 180 ? 'rotate-180' : ''}
      ${tile?.rotation === 270 ? 'rotate-270' : ''}`}
        />
      )}
      {meeple && (
        <div style={edgeForMeeple ? stylesForEdges.get(edgeForMeeple[0] as keyof Edges) : stylesForEdges.get('middle')}>
          <img
            src={`./Elements/Meeple/${meeple.player.technology}_meeple.png`}
            alt={meeple.player.technology}
            width="60px"
          />
        </div>
      )}
    </div>
  );
});

export default TileContainer;
