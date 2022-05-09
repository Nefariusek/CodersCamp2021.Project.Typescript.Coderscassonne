import React, { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';
import Button from '../components/Button/Button';

const HOW_TO_PLAY_TITLE = {
  title: 'Watch how to play',
};

const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer url="https://vimeo.com/247851862" controls />
    </div>
  );
};

const HowToPlayPage: React.FunctionComponent = (): ReactElement => (
  <div className="flex items-center justify-center flex-col text-DARKTHEME_LIGHT_GREEN_COLOR">
    <header className="text-center mb-2">
      <h2 className="text-2xl mb-2">{HOW_TO_PLAY_TITLE.title}</h2>
    </header>
    <VideoPlayer />
    <footer className="flex flex-row justify-between text-center mt-4 whitespace-pre-line">
      <div className="mr-5">
        <a target="_blank" href="https://www.wikihow.com/Play-Carcassonne" rel="noreferrer">
          <Button text={`Read\n how to play`} />
        </a>
      </div>
      <div>
        <Link to={PATH_TO_HOMEPAGE}>
          <Button text={`Back\n to Homepage`} />
        </Link>
      </div>
    </footer>
  </div>
);

export default HowToPlayPage;
