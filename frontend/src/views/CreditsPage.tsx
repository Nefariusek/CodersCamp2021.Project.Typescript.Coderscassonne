import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { IDLE_TILE_SOURCE, TILE_GAME_SOURCE } from '../constants/layoutElements';
import { PATH_TO_HOMEPAGE } from '../constants/paths';

type Authors = {
  name: string;
  url: string;
};

const CREDITS_TITLE = {
  subtitle: 'Meet our team',
  title: 'This is our project during Coders Camp 2021/2022',
};

const CreditsButtons = () => {
  const AUTHORS: Authors[] = [
    { name: 'Szymon', url: 'https://github.com/Nefariusek' },
    { name: 'Sylwia', url: 'https://github.com/mngweb' },
    { name: 'Natalia', url: 'https://github.com/NataliaCichonska' },
    { name: 'Maria', url: 'https://github.com/MariaBanaszkiewicz' },
    { name: 'Ula', url: 'https://github.com/Urszuja' },
    { name: 'Grzegorz', url: 'https://github.com/GRosza' },
  ];
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {AUTHORS.map((author) => (
        <a target="_blank" href={author.url} rel="noreferrer">
          <button
            key={author.name}
            type="button"
            className={`bg-[url('${TILE_GAME_SOURCE}')] hover:bg-[url('${IDLE_TILE_SOURCE}')] bg-contain border hover:border-2 border-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR w-40 h-40`}
          >
            {author.name}
          </button>
        </a>
      ))}
    </div>
  );
};

const CreditsPage: React.FunctionComponent = (): ReactElement => (
  <div className="flex justify-center py-1">
    <div className="flex items-center flex-col text-DARKTHEME_LIGHT_GREEN_COLOR">
      <header className="text-center mb-2">
        <h2 className="text-2xl mb-2">{CREDITS_TITLE.title}</h2>
        <h3 className="text-1xl mb-2">{CREDITS_TITLE.subtitle}</h3>
      </header>
      <CreditsButtons />
      <footer className="text-center mt-3">
        <Link to={PATH_TO_HOMEPAGE}>Back to Homepage</Link>
      </footer>
    </div>
  </div>
);

export default CreditsPage;
