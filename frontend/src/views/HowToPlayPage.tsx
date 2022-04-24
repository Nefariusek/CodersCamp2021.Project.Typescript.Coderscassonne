import React, { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';

const HOW_TO_PLAY_TITLE = {
  title: 'How to play',
};

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer url="https://www.youtube.com/watch?v=R1qh-lhxy9s" controls />
    </div>
  );
};

const HowToPlayPage: React.FunctionComponent = (): ReactElement => (
  <div className="flex items-center justify-center flex-col text-DARKTHEME_LIGHT_GREEN_COLOR">
    <header className="text-center mb-2">
      <h2 className="text-2xl mb-2">{HOW_TO_PLAY_TITLE.title}</h2>
    </header>
    <VideoPlayer />
    <footer className="text-center mt-3">
      <Link to={PATH_TO_HOMEPAGE}>Back to Homepage</Link>
    </footer>
  </div>
);

export default HowToPlayPage;
