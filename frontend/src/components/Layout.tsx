import { FC } from 'react';

import { APPLICATION_TITLE } from '../constants/labels';
import { CASTLE_SOURCE, SETTINGS_ICON_SOURCE, TILE_TITLE_SOURCE } from '../constants/layoutElements';
import { Link } from 'react-router-dom';
import { PATH_TO_HOMEPAGE } from '../constants/paths';
import { openSettingsModal } from '../components/Modal/SettingsModal';

export const AppHeaderSection: FC = () => (
  <div className="flex justify-center h-40 bg-DARKTHEME_BACKGROUND_COLOR">
    <div className="mt-2">
      <div className="absolute top-5 right-7 ">
        <img src={SETTINGS_ICON_SOURCE} onClick={openSettingsModal} alt="titile_tile" className="w-30 h-30" />
      </div>
      <div className="absolute">
        <img src={TILE_TITLE_SOURCE} alt="title_tile" className="w-30 h-30" />
      </div>
      <div className="font-ALMENDRA text-DARKTHEME_LIGHT_GREEN_COLOR font-regular mt-1 text-9xl ml-3 select-none">
        <Link to={PATH_TO_HOMEPAGE}>{APPLICATION_TITLE}</Link>
      </div>
    </div>
  </div>
);

export const Castle: FC = () => (
  <div className="absolute inset-x-0 bottom-0 z-30">
    <img src={CASTLE_SOURCE} className="opacity-40 h-72 w-full" alt="castle" />
  </div>
);
