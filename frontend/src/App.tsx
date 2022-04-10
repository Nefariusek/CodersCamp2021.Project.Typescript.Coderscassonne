import { FC, ReactElement } from 'react';

import DrawPile from './components/DrawPile/DrawPile';
import { APPLICATION_TITLE } from './constants/labels';

const App: FC = (): ReactElement => {
  const testVar = 'test';

  return (
    <>
      <div className="flex justify-center">
        <h1 className="font-bold text-2xl text-blue-900">{APPLICATION_TITLE}</h1>
        <h1 className="font-bold text-2xl text-blue-900 bg-gray-200 text-red-300">{testVar}</h1>
      </div>
      <DrawPile numberOfAvailableTiles={10} />
    </>
  );
};

export default App;
