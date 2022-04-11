import { FC, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Game from './views/Game';
import HomePage from './views/HomePage';
import LandingPage from './views/LandingPage';

const App: FC = (): ReactElement => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
);

export default App;
