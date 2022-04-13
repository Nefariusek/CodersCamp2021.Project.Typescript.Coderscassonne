import { createContext, useState } from 'react';

const DataStoreContext = createContext(null);

export const DataStoreProvider = ({ children }) => {
  const [playersData, setPlayersData] = useState(null);
  const [gameSettings, setGameSettings] = useState(null);

  return (
    <DataStoreContext.Provider
      value={{
        playersData,
        setPlayersData,
        gameSettings,
        setGameSettings,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export default DataStoreContext;
