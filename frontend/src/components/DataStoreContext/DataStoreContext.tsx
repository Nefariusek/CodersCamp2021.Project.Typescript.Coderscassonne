import { createContext, useMemo, useState } from 'react';

import type Technologies from '../../constants/technologies';
import type Meeple from '../../model/Meeple';
import { BoardSize, TileAmount, TurnLength } from '../../model/Settings';
import type Tile from '../../model/Tile';

export interface PlayersDataInterface {
  name: string;
  technology: Technologies;
  score: number;
  placedTiles: Tile[];
  meeples: Meeple[];
}
export interface GameSettingsInterface {
  turnLength: TurnLength;
  tileAmount: TileAmount;
  boardSizeX: BoardSize;
  boardSizeY: BoardSize;
}
interface DataStoreContextInterface {
  playersData: PlayersDataInterface | null;
  setPlayersData: React.Dispatch<React.SetStateAction<PlayersDataInterface | null>>;
  gameSettings: GameSettingsInterface | null;
  setGameSettings: React.Dispatch<React.SetStateAction<GameSettingsInterface | null>>;
}

type DataStoreProviderProps = { children: React.ReactNode };

const DataStoreContext = createContext<DataStoreContextInterface | null>(null);

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {
  const [playersData, setPlayersData] = useState<PlayersDataInterface | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettingsInterface | null>(null);

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
