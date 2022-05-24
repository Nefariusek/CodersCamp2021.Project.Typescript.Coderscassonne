import { FC, ReactElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppHeaderSection, Castle } from './components/Layout';
import { WorkInProgressModal } from './components/Modal/WorkInProgressModal';
import {
  PATH_TO_CREATE_PLAYERS,
  PATH_TO_CREDITS,
  PATH_TO_GAMEPAGE,
  PATH_TO_HOMEPAGE,
  PATH_TO_HOWTOPLAYPAGE,
  PATH_TO_GAME_MODE_PAGE,
  PATH_TO_CUSTOM_MODE_FORM,
  PATH_TO_ROOMS,
} from './constants/paths';
import CreatePlayersPage from './views/CreatePlayersPage';
import CreditsPage from './views/CreditsPage';
import CustomModePage from './views/CustomModePage';
import GamePage from './views/Game';
import GameModePage from './views/GameModePage';
import HomePage from './views/HomePage';
import HowToPlayPage from './views/HowToPlayPage';
import JoinRoomPage from './views/JoinRoomPage';

const paths = [
  { element: <HomePage />, url: PATH_TO_HOMEPAGE },
  { element: <GamePage />, url: PATH_TO_GAMEPAGE },
  { element: <HowToPlayPage />, url: PATH_TO_HOWTOPLAYPAGE },
  { element: <CreatePlayersPage />, url: PATH_TO_CREATE_PLAYERS },
  { element: <CreditsPage />, url: PATH_TO_CREDITS },
  { element: <GameModePage />, url: PATH_TO_GAME_MODE_PAGE },
  { element: <CustomModePage />, url: PATH_TO_CUSTOM_MODE_FORM },
  { element: <JoinRoomPage />, url: PATH_TO_ROOMS },
];
const pathsWithoutHeader = [PATH_TO_GAMEPAGE];

const App: FC = (): ReactElement => {
  const { pathname } = useLocation();
  const pageValidation = pathsWithoutHeader.includes(pathname);

  return (
    <div className="h-full min-h-screen bg-DARKTHEME_BACKGROUND_COLOR ">
      {pageValidation ? null : <AppHeaderSection />}
      <div className="relative z-50">
        <Routes>
          {paths.map((path) => (
            <Route key={path.url} path={path.url} element={path.element} />
          ))}
        </Routes>
      </div>
      {pageValidation ? <div className="bg-DARKTHEME_BACKGROUND_COLOR" /> : <Castle />}
      <WorkInProgressModal />
    </div>
  );
};

export default App;
