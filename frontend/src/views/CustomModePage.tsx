import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';

import GameMode from '../model/GameMode';
import { BoardSize, TileAmount, TurnLength } from '../model/Settings';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_GAMEPAGE } from '../constants/paths';
import { SettingsModal } from '../components/Modal/SettingsModal';
import Button from '../components/Button/Button';

const sizes: BoardSize[] = [4, 8, 16, 32, 64];
const amounts: TileAmount[] = [16, 32, 64, 128];
const lengths: TurnLength[] = [5, 10, 15, 30, 60];

interface NumberDropdown {
  options: BoardSize[] | TileAmount[] | TurnLength[];
  property: 'Board Size' | 'Tile Amount' | 'Turn Length';
  value: number;
  setFunction: Dispatch<SetStateAction<number>>;
}

const CustomModeForm = (props: NumberDropdown) => {
  const { options, property, setFunction } = props;

  const handleOnClick = (e: any) => {
    const selectedValue = parseFloat(e.currentTarget.innerHTML);
    setFunction(selectedValue);
  };

  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR mt-40 p-10 text-center">
      <p className="text-4xl">{property}</p>
      <select
        onClick={handleOnClick}
        className="text-DARKTHEME_BACKGROUND_COLOR hover:text-white font-ALMENDRA font-bold text-3xl w-40 bg-DARKTHEME_LIGHT_GREEN_COLOR hover:bg-DARKTHEME_DARK_GREEN_COLOR focus:ring-4 focus:outline-none rounded-lg px-4 py-2.5 mt-3 text-left inline-flex items-center"
        id={property}
      >
        {options.map((opt) => (
          <option value={opt}>{opt}</option>
        ))}
      </select>
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
        <CustomModeForm options={sizes} value={boardSize} property="Board Size" setFunction={setBoardSize} />
        <CustomModeForm options={amounts} value={tileAmount} property="Tile Amount" setFunction={setTileAmount} />
        <CustomModeForm options={lengths} value={turnLength} property="Turn Length" setFunction={setTurnLength} />
      </div>
      <div className="flex justify-center relative right-[15px]">
        <Button text="Play Game" onClick={handleGameModeSubmit} colorVariant="light" />
      </div>
      <SettingsModal />
    </div>
  );
};

export default CustomModePage;
