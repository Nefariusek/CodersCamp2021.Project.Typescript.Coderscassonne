import { createContext, useMemo, useState } from 'react';

type DataStoreProviderProps = { children: React.ReactNode };

const DataStoreContext = createContext(null);

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {
  const [playersData, setPlayersData] = useState(null);
  const [gameSettings, setGameSettings] = useState(null);

  const storeDataWithMemo = useMemo(
    () => ({
      gameSettings,
      playersData,
      setGameSettings,
      setPlayersData,
    }),
    [gameSettings, playersData, setGameSettings, setPlayersData],
  );

  return <DataStoreContext.Provider value={storeDataWithMemo}>{children}</DataStoreContext.Provider>;
};

export default DataStoreContext;
