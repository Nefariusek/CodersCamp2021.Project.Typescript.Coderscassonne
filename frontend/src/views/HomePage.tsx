import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWorkInProgressModal } from '../components/Modal/WorkInProgressModal';
import Button from '../components/Button/Button';

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
          <div key={view.name} className="my-2">
            <Button
              text={view.name}
              onClick={() => {
                if (view.url === 'TODO') {
                  openWorkInProgressModal();
                } else {
                  navigate(view.url);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
