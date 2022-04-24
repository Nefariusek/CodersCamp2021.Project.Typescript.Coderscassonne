import { createContext, useEffect, useMemo, useState } from 'react';
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
  allPlayersData: Player[];
  setAllPlayersData?: React.Dispatch<React.SetStateAction<Player[]>>;
  turnNumber: number;
  setTurnNumber?: React.Dispatch<React.SetStateAction<number>>;
}

type DataStoreProviderProps = { children: React.ReactNode };

const DataStoreContext = createContext<DataStoreContextInterface>({
  playersData: null,
  gameSettings: null,
  tileInHand: undefined,
  allPlayersData: [],
  turnNumber: 1,
});

export const DataStoreProvider = ({ children }: DataStoreProviderProps) => {
  const [playersData, setPlayersData] = useState<Player | null>(null);
  const [gameSettings, setGameSettings] = useState<Settings | null>(null);
  const [tileInHand, setTileInHand] = useState<Tile | undefined>(drawnTiles[1]);
  const [allPlayersData, setAllPlayersData] = useState<Player[]>([]);
  const [turnNumber, setTurnNumber] = useState(1);

  useEffect(() => {
    setTileInHand(drawnTiles[turnNumber]);
  }, [turnNumber]);

  const storeDataWithMemo = useMemo(
    () => ({
      gameSettings,
      playersData,
      setGameSettings,
      setPlayersData,
      tileInHand,
      setTileInHand,
      allPlayersData,
      setAllPlayersData,
      turnNumber,
      setTurnNumber,
    }),
    [
      gameSettings,
      playersData,
      setGameSettings,
      setPlayersData,
      allPlayersData,
      setAllPlayersData,
      tileInHand,
      setTileInHand,
      turnNumber,
      setTurnNumber,
    ],
  );

  return <DataStoreContext.Provider value={storeDataWithMemo}>{children}</DataStoreContext.Provider>;
};

export default DataStoreContext;
