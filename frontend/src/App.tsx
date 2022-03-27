import { FC, ReactElement } from 'react';
import './App.css';

const App: FC = (): ReactElement => {
  const testVar = 'test;';

  return (
    <div className="flex justify-center">
      <h1 className="font-bold text-2xl text-blue-900">{testVar}</h1>
    </div>
  );
};

export default App;
