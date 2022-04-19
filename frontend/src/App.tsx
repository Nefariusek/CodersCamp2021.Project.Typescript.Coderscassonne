import { FC, ReactElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeaderSection, Castle } from './components/Layout';
import { PATH_TO_GAMEPAGE, PATH_TO_HOMEPAGE, PATH_TO_LANDINGPAGE } from './constants/paths';
import GamePage from './views/Game';
import HomePage from './views/HomePage';
import LandingPage from './views/LandingPage';

const paths = [
  { element: <LandingPage />, url: PATH_TO_LANDINGPAGE },
  { element: <HomePage />, url: PATH_TO_HOMEPAGE },
  { element: <GamePage />, url: PATH_TO_GAMEPAGE },
];
const pathsWithoutHeader = [PATH_TO_GAMEPAGE];

const App: FC = (): ReactElement => {
  const { pathname } = useLocation();
  const pageValidation = pathsWithoutHeader.includes(pathname);
  return (
    <div className="h-screen bg-DARKTHEME_BACKGROUND_COLOR ">
      {pageValidation ? null : <AppHeaderSection />}
      <Routes>
        {paths.map((path) => (
          <Route key={path.url} path={path.url} element={path.element} />
        ))}
      </Routes>
      {/* {pageValidation ? null : <Castle />} */}
    </div>
  );
};

export default App;
