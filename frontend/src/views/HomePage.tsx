import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWorkInProgressModal } from '../components/Modal/WorkInProgressModal';

import { PATH_TO_CREDITS, PATH_TO_HOWTOPLAYPAGE, PATH_TO_CREATE_PLAYERS } from '../constants/paths';

const HomePage: React.FunctionComponent = (): ReactElement => {
  const navigate = useNavigate();
  const views: { name: string; url: string }[] = [
    { name: 'Play game', url: PATH_TO_CREATE_PLAYERS },
    { name: 'Scoreboard', url: 'TODO' },
    { name: 'How to play', url: PATH_TO_HOWTOPLAYPAGE },
    { name: 'Credits', url: PATH_TO_CREDITS },
  ];
  return (
    <div className="flex justify-center mt-30 pt-10">
      <div className="flex flex-col">
        {views.map((view) => (
          <button
            key={view.name}
            type="button"
            className="bg-DARKTHEME_BACKGROUND_COLOR hover:bg-DARKTHEME_DARK_GREEN_COLOR border border-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR w-60 py-2 px-4 my-3 "
            onClick={() => {
              if (view.url === 'TODO') {
                openWorkInProgressModal();
              } else {
                navigate(view.url);
              }
            }}
          >
            {view.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
