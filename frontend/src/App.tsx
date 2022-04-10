import { FC, ReactElement } from 'react';

import TileContainer from './components/TileContainer';
import { APPLICATION_TITLE } from './constants/labels';
import Locations from './constants/locations';
import Player from './model/Player';
import Tile from './model/Tile';

const App: FC = (): ReactElement => {
  const testVar = 'test';

  const tile = new Tile(
    { bottom: Locations.FIELD, left: Locations.CITY, right: Locations.FIELD, top: Locations.CITY },
    new Player(),
    1,
  );
  return (
    <div className="flex justify-center">
      <h1 className="font-bold text-2xl text-blue-900">{APPLICATION_TITLE}</h1>
      <h1 className="font-bold text-2xl text-blue-900 bg-gray-200 text-red-300">{testVar}</h1>
      <TileContainer tile={tile} />
    </div>
  );
};

export default App;
