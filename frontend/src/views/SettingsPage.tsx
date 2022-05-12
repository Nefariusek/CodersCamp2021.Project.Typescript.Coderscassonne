import { FC, ReactElement, useState } from 'react';
import { PATH_TO_GAMEPAGE, PATH_TO_CUSTOM_MODE_FORM } from '../constants/paths';
import Button from '../components/Button/Button';

import { useNavigate } from 'react-router-dom';

import GameMode from '../model/GameMode';

const classicModeText = 'Take your time! Turns are long!';
const fastModeText = 'Think quickly! Short turns and small board';
const customModeText = 'Make your own custom game mode!';

interface GameModeContainerProps {
  gameMode: 'Classic' | 'Fast' | 'Custom';
  infoText: string;
}

const GameModeContainer = (props: GameModeContainerProps) => {
  const { gameMode, infoText } = props;
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handlePlayGameButtonClick = () => {
    if (gameMode === 'Classic') {
      const mode = new GameMode(60, 128, 64, 64, gameMode);
      localStorage.setItem('Game mode', JSON.stringify(mode));
      navigate(PATH_TO_GAMEPAGE);
    } else if (gameMode === 'Fast') {
      const mode = new GameMode(10, 32, 4, 4, gameMode);
      localStorage.setItem('Game mode', JSON.stringify(mode));
      navigate(PATH_TO_GAMEPAGE);
    } else {
      navigate(PATH_TO_CUSTOM_MODE_FORM);
    }
  };

  return (
    <div className="bg-[url('../Elements/Layout/Tile_game.png')] w-380px h-380px">
      <button
        type="button"
        className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center relative top-[20px] left-[320px] rounded-full"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        I
      </button>
      <p className="font-ALMENDRA font-bold text-5xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center relative top-[50px]">
        {`${gameMode} mode`}
      </p>
      <div className="p-3 flex justify-center relative top-[100px]">
        <Button text="Play game" onClick={handlePlayGameButtonClick} colorVariant="light" />
      </div>
      {isHovering && (
        <p className="font-ALMENDRA font-bold text-2xl text-center text-DARKTHEME_LIGHT_GREEN_COLOR p-3 relative top-[150px]">
          {infoText}
        </p>
      )}
    </div>
  );
};

const SettingsPage: FC = (): ReactElement => (
  <div className="flex-col justify-center bg-DARKTHEME_BACKGROUND_COLOR w-full">
    <div className="flex justify-around pt-[150px] pb-[20px] whitespace-pre-line">
      <GameModeContainer gameMode="Classic" infoText={classicModeText} />
      <GameModeContainer gameMode="Fast" infoText={fastModeText} />
      <GameModeContainer gameMode="Custom" infoText={customModeText} />
    </div>
    <div className="h-[50px]" />
    <img src="./Elements/Layout/castle.png" alt="Custom mode" className="w-full relative bottom-[0px]" />
  </div>
);

export default SettingsPage;
