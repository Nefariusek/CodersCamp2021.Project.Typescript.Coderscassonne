import { createContext, useMemo, useState } from 'react';

import type Player from '../../model/Player';
import type Settings from '../../model/Settings';

export interface DataStoreContextInterface {
  playersData: Player | null;
  setPlayersData?: React.Dispatch<React.SetStateAction<Player | null>>;
  gameSettings: Settings | null;
  setGameSettings?: React.Dispatch<React.SetStateAction<Settings | null>>;
  allPlayersData: Player[];
  setAllPlayersData?: React.Dispatch<React.SetStateAction<Player[]>>;
}

type DataStoreProviderProps = { children: React.ReactNode };

const DataStoreContext = createContext<DataStoreContextInterface>({
  playersData: null,
  gameSettings: null,
  allPlayersData: [],
});

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {
  const [playersData, setPlayersData] = useState<Player | null>(null);
  const [gameSettings, setGameSettings] = useState<Settings | null>(null);
  const [allPlayersData, setAllPlayersData] = useState<Player[]>([]);

  const storeDataWithMemo = useMemo(
    () => ({
      gameSettings,
      playersData,
      setGameSettings,
      setPlayersData,
      allPlayersData,
      setAllPlayersData,
    }),
    [gameSettings, playersData, setGameSettings, setPlayersData, allPlayersData, setAllPlayersData],
  );

  return <DataStoreContext.Provider value={storeDataWithMemo}>{children}</DataStoreContext.Provider>;
};

export default DataStoreContext;
