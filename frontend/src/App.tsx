import { FC, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GamePage from './views/Game';
import HomePage from './views/HomePage';
import LandingPage from './views/LandingPage';

const paths = [
  { element: <HomePage />, url: '/homepage' },
  { element: <GamePage />, url: '/gamepage' },
];

const App: FC = (): ReactElement => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {paths.map((path) => (
        <Route key={path.url} path={path.url} element={path.element} />
      ))}
    </Routes>
  </Router>
);

export default App;
