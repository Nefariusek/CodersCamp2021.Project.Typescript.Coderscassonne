import { createContext, useMemo, useState } from 'react';
import { JSONData } from '../../mocks/mocks';

import type Player from '../../model/Player';
import type Settings from '../../model/Settings';
import Tile from '../../model/Tile';
import GameModeParser from '../GameModeParser';

export const drawnTiles = GameModeParser(JSONData);
interface DataStoreContextInterface {
  playersData: Player | null;
  setPlayersData?: React.Dispatch<React.SetStateAction<Player | null>>;
  gameSettings: Settings | null;
  setGameSettings?: React.Dispatch<React.SetStateAction<Settings | null>>;
  tileInHand: Tile | undefined;
  setTileInHand?: React.Dispatch<React.SetStateAction<Tile | undefined>>;
}

type DataStoreProviderProps = { children: React.ReactNode };

const DataStoreContext = createContext<DataStoreContextInterface>({
  playersData: null,
  gameSettings: null,
  tileInHand: undefined,
});

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {
  const [playersData, setPlayersData] = useState<Player | null>(null);
  const [gameSettings, setGameSettings] = useState<Settings | null>(null);
  const [tileInHand, setTileInHand] = useState<Tile | undefined>(drawnTiles[1]);

  const storeDataWithMemo = useMemo(
    () => ({
      gameSettings,
      playersData,
      setGameSettings,
      setPlayersData,
      tileInHand,
      setTileInHand,
    }),
    [gameSettings, playersData, setGameSettings, setPlayersData, tileInHand, setTileInHand],
  );

  return <DataStoreContext.Provider value={storeDataWithMemo}>{children}</DataStoreContext.Provider>;
};

export default DataStoreContext;