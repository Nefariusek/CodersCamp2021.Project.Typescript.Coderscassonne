import { FC, ReactElement, useState } from 'react';

import GameMode from '../model/GameMode';

const SettingsPage: FC = (): ReactElement => {
  const [isClassicHovering, setIsClassicHovering] = useState(false);
  const [isFastHovering, setIsFastHovering] = useState(false);
  const [isCustomHovering, setIsCustomHovering] = useState(false);
  const handleClassicMouseOver = () => {
    setIsClassicHovering(true);
  };

  const handleClassicMouseOut = () => {
    setIsClassicHovering(false);
  };
  const handleClassicOnClick = () => {
    const gameMode = new GameMode(60, 128, 64, 64, 'Classic');
    localStorage.setItem('Game mode', JSON.stringify(gameMode));
  };

  const handleFastMouseOver = () => {
    setIsFastHovering(true);
  };
  const handleFastMouseOut = () => {
    setIsFastHovering(false);
  };
  const handleFastOnClick = () => {
    const gameMode = new GameMode(10, 32, 16, 16, 'Fast');
    localStorage.setItem('Game mode', JSON.stringify(gameMode));
  };

  const handleCustomMouseOver = () => {
    setIsCustomHovering(true);
  };

  const handleCustomMouseOut = () => {
    setIsCustomHovering(false);
  };
  return (
    <div className="flex-col justify-center bg-DARKTHEME_BACKGROUND_COLOR w-full">
      <div className="flex justify-around pt-[150px] pb-[20px] whitespace-pre-line">
        <div className="bg-[url('../../public/Elements/Layout/Tile_game.png')] w-380px h-380px">
          <button
            type="button"
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[20px] left-[320px] rounded-full"
            onMouseEnter={handleClassicMouseOver}
            onMouseLeave={handleClassicMouseOut}
          >
            I
          </button>
          <p className="font-ALMENDRA font-bold text-5xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center relative top-[50px]">
            Classic mode
          </p>
          <button
            type="button"
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-4xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[100px] left-[100px] rounded"
            onClick={handleClassicOnClick}
          >
            Play game
          </button>
        </div>
        <div className="bg-[url('../../public/Elements/Layout/Tile_fast.png')] w-380px h-380px">
          <button
            type="button"
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[20px] left-[320px] rounded-full"
            onMouseEnter={handleFastMouseOver}
            onMouseLeave={handleFastMouseOut}
          >
            I
          </button>
          <p className="font-ALMENDRA font-bold text-5xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center relative top-[50px]">
            Fast mode
          </p>
          <button
            type="button"
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-4xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[100px] left-[100px] rounded"
            onClick={handleFastOnClick}
          >
            Play game
          </button>
        </div>
        <div className="bg-[url('../../public/Elements/Layout/Tile_game.png')] w-380px h-380px">
          <button
            type="button"
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[20px] left-[320px] rounded-full"
            onMouseEnter={handleCustomMouseOver}
            onMouseLeave={handleCustomMouseOut}
          >
            I
          </button>
          <p className="font-ALMENDRA font-bold text-5xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center relative top-[50px]">
            Custom mode
          </p>
          <button
            type="button"
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-4xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[100px] left-[100px] rounded"
          >
            Play game
          </button>
        </div>
      </div>
      <div className="h-[50px]">
        {isClassicHovering && (
          <p className="font-ALMENDRA font-bold text-2xl text-center text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
            Take your time! Turns are long!
          </p>
        )}
        {isCustomHovering && (
          <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center">
            Make your own custom game mode!
          </p>
        )}
        {isFastHovering && (
          <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center">
            Think quickly! Short turns and small board
          </p>
        )}
      </div>
      <img src="../../public/Elements/Layout/castle.png" alt="Custom mode" className="w-full relative bottom-[0px]" />
    </div>
  );
};

export default SettingsPage;
