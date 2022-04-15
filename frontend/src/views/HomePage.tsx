import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH_TO_GAMEPAGE, PATH_TO_LANDINGPAGE } from '../constants/paths';

const HomePage: React.FunctionComponent = (): ReactElement => {
  const navigate = useNavigate();
  const views = [
    { name: 'Play game', url: PATH_TO_GAMEPAGE },
    { name: 'Scoreboard', url: PATH_TO_LANDINGPAGE },
    { name: 'How to play', url: PATH_TO_LANDINGPAGE },
    { name: 'Credits', url: PATH_TO_LANDINGPAGE },
  ];
  return (
    <div className=" bg-DARKTHEME_BACKGROUND_COLOR flex justify-center mt-30 pt-10">
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

export default HomePage;
