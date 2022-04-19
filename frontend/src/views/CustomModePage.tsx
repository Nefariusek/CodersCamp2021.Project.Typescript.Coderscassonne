import { FC, ReactElement, useState } from 'react';

import GameMode from '../model/GameMode';
import { BoardSize, TileAmount, TurnLength } from '../model/Settings';

const sizes: BoardSize[] = [4, 8, 16, 32, 64];
const amounts: TileAmount[] = [16, 32, 64, 128];
const lengths: TurnLength[] = [5, 10, 15, 30, 60];

const CustomModePage: FC = (): ReactElement => {
  const [boardSize, setBoardSize] = useState<BoardSize>(32);
  const [tileAmount, setTileAmount] = useState<TileAmount>(32);
  const [turnLength, setTurnLength] = useState<TurnLength>(30);

  const handleAmountOnClick = (e: any) => {
    setTileAmount(e.currentTarget.innerHTML);
  };
  const handleSizeOnClick = (e: any) => {
    setBoardSize(e.currentTarget.innerHTML);
  };
  const handleLengthOnClick = (e: any) => {
    setTurnLength(e.currentTarget.innerHTML);
  };
  const handleGameModeSubmit = () => {
    const gameMode = new GameMode(turnLength, tileAmount, boardSize, boardSize, 'Custom');
    localStorage.setItem('Game mode', JSON.stringify(gameMode));
  };

  return (
    <div className="flex flex-col justify-center bg-DARKTHEME_BACKGROUND_COLOR w-full items-center">
      <p className="font-ALMENDRA font-bold text-5xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center mt-[50px]">
        Custom Mode
      </p>
      <div className="flex flex-row justify-around w-full mt-[10px]">
        <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center">
          <p className="text-4xl">Board size</p>
          <p>{boardSize}</p>
          <div className="flex flex-col gap-[10px] py-[30px] items-center">
            {sizes.map((size) => (
              <button
                className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center w-[60px] rounded"
                type="button"
                key={size}
                onClick={handleSizeOnClick}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center">
          <p className="text-4xl">Tile amount</p>
          <p>{tileAmount}</p>
          <div className="flex flex-col gap-[10px] py-[30px] items-center">
            {amounts.map((amount) => (
              <button
                className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center w-[70px] rounded"
                type="button"
                key={amount}
                onClick={handleAmountOnClick}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>
        <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center">
          <p className="text-4xl">Turn length</p>
          <p>{turnLength}</p>
          <div className="flex flex-col gap-[10px] py-[30px] items-center">
            {lengths.map((length) => (
              <button
                className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center w-[60px] rounded"
                type="button"
                key={length}
                onClick={handleLengthOnClick}
              >
                {length}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-4xl text-DARKTHEME_BACKGROUND_COLOR text-center w-[200px] rounded my-[50px]"
        type="button"
        onClick={handleGameModeSubmit}
      >
        Play Game
      </button>
      <img src="../../public/Elements/Layout/castle.png" alt="Custom mode" className="w-full relative bottom-[0px]" />
    </div>
  );
};

export default CustomModePage;
