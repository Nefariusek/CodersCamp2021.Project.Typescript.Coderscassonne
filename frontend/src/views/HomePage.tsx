import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { CASTLE_SOURCE } from '../constants/layoutElements';
import { PATH_TO_GAMEPAGE, PATH_TO_LANDINGPAGE } from '../constants/paths';

const NavButtons = () => {
  const navigate = useNavigate();
  const views = [
    { name: 'Play game', url: PATH_TO_GAMEPAGE },
    { name: 'Scoreboard', url: PATH_TO_LANDINGPAGE },
    { name: 'How to play', url: PATH_TO_LANDINGPAGE },
    { name: 'Credits', url: PATH_TO_LANDINGPAGE },
  ];
  return (
    <div className="flex justify-center mt-30 py-20">
      <div className="flex flex-col">
        {views.map(({ url, name }) => (
          <button
            key={name}
            type="button"
            className="bg-transparent hover:bg-DARKTHEME_DARK_GREEN_COLOR border border-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR w-60 py-2 px-4 my-3 "
            onClick={() => {
              navigate(url);
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FunctionComponent = (): ReactElement => (
  <div className="absolute h-full w-full bg-DARKTHEME_BACKGROUND_COLOR">
    <Header />
    <NavButtons />
    <div className="flex justify-center mt-4">
      <img src={CASTLE_SOURCE} alt="castle" />
    </div>
  </div>
);

export default HomePage;
