import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';

import GameMode from '../model/GameMode';
import { BoardSize, TileAmount, TurnLength } from '../model/Settings';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_GAMEPAGE } from '../constants/paths';

const sizes: BoardSize[] = [4, 8, 16, 32, 64];
const amounts: TileAmount[] = [16, 32, 64, 128];
const lengths: TurnLength[] = [5, 10, 15, 30, 60];

interface CustomModeFormProps {
  options: BoardSize[] | TileAmount[] | TurnLength[];
  property: 'Board size' | 'Tile amount' | 'Turn Length';
  value: number;
  setFunction: Dispatch<SetStateAction<number>>;
}

const CustomModeForm = (props: CustomModeFormProps) => {
  const { options, property, value, setFunction } = props;

  const handleOnClick = (e: any) => {
    const selectedValue = parseFloat(e.currentTarget.innerHTML);
    setFunction(selectedValue);
  };

  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-10 text-center">
      <p className="text-4xl">{property}</p>
      <button
        id="dropdownDefault"
        data-dropdown-toggle={property}
        className="text-DARKTHEME_BACKGROUND_COLOR hover:text-white font-ALMENDRA font-bold text-3xl bg-DARKTHEME_LIGHT_GREEN_COLOR hover:bg-DARKTHEME_DARK_GREEN_COLOR focus:ring-4 focus:outline-none rounded-lg px-4 py-2.5 mt-3 text-center inline-flex items-center"
        type="button"
      >
        {value}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div id={property} className="z-10 hidden bg-DARKTHEME_LIGHT_GREEN_COLOR divide-gray-100 rounded shadow w-44">
        <ul className="py-1 text-sm text-DARKTHEME_BACKGROUND_COLOR" aria-labelledby="dropdownDefault">
          {options.map((opt) => (
            <li key={`${property}_${opt}`}>
              <a
                onClick={handleOnClick}
                className="block px-4 py-2 hover:bg-DARKTHEME_DARK_GREEN_COLOR hover:text-white"
              >
                {opt}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CustomModePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [boardSize, setBoardSize] = useState<number>(32);
  const [tileAmount, setTileAmount] = useState<number>(32);
  const [turnLength, setTurnLength] = useState<number>(30);

  const handleGameModeSubmit = () => {
    const gameMode = new GameMode(
      turnLength as TurnLength,
      tileAmount as TileAmount,
      boardSize as BoardSize,
      boardSize as BoardSize,
      'Custom',
    );
    localStorage.setItem('Game mode', JSON.stringify(gameMode));
    navigate(PATH_TO_GAMEPAGE);
  };

  return (
    <div className="flex flex-col justify-center bg-DARKTHEME_BACKGROUND_COLOR w-full items-center">
      <p className="font-ALMENDRA font-bold text-5xl text-DARKTHEME_LIGHT_GREEN_COLOR text-center m mt-[50px]">
        Custom Mode
      </p>
      <div className="flex flex-row justify-center px-5 w-full mt-[10px]">
        <CustomModeForm options={sizes} value={boardSize} property="Board size" setFunction={setBoardSize} />
        <CustomModeForm options={amounts} value={tileAmount} property="Tile amount" setFunction={setTileAmount} />
        <CustomModeForm options={lengths} value={turnLength} property="Turn Length" setFunction={setTurnLength} />
      </div>
      <button
        className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-4xl text-DARKTHEME_BACKGROUND_COLOR text-center w-[200px] rounded my-[50px]"
        type="button"
        onClick={handleGameModeSubmit}
      >
        Play Game
      </button>
      <img src="./Elements/Layout/castle.png" alt="Custom mode" className="w-full relative bottom-[0px]" />
    </div>
  );
};

export default CustomModePage;
