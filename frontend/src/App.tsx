import { FC, ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PATH_TO_GAMEPAGE, PATH_TO_HOMEPAGE, PATH_TO_LANDINGPAGE } from './constants/paths';
import GamePage from './views/Game';
import HomePage from './views/HomePage';
import LandingPage from './views/LandingPage';

const paths = [
  { element: <LandingPage />, url: PATH_TO_LANDINGPAGE },
  { element: <HomePage />, url: PATH_TO_HOMEPAGE },
  { element: <GamePage />, url: PATH_TO_GAMEPAGE },
];

const App: FC = (): ReactElement => (
  <BrowserRouter>
    <Routes>
      {paths.map((path) => (
        <Route key={path.url} path={path.url} element={path.element} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default App;
