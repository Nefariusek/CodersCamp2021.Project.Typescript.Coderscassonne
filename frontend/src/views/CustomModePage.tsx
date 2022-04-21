import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';

import GameMode from '../model/GameMode';
import { BoardSize, TileAmount, TurnLength } from '../model/Settings';

const sizes: BoardSize[] = [4, 8, 16, 32, 64];
const amounts: TileAmount[] = [16, 32, 64, 128];
const lengths: TurnLength[] = [5, 10, 15, 30, 60];

interface CustomModeFormProps {
  values: BoardSize[] | TileAmount[] | TurnLength[];
  property: 'Board size' | 'Tile amount' | 'Turn Length';
  setFunction:
    | Dispatch<SetStateAction<BoardSize>>
    | Dispatch<SetStateAction<TileAmount>>
    | Dispatch<SetStateAction<TurnLength>>;
}

const CustomModeForm = (props: CustomModeFormProps) => {
  const { values, property, setFunction } = props;
  const [val, setVal] = useState<BoardSize | TileAmount | TurnLength>(32);

  const handleOnClick = (e: any) => {
    setVal(e.currentTarget.innerHTML);
    setFunction(e.currentTarget.innerHTML);
  };

  return (
    <div className="font-ALMENDRA font-bold text-3xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 text-center">
      <p className="text-4xl">{property}</p>
      <p>{val}</p>
      <div className="flex flex-col gap-[10px] py-[30px] items-center">
        {values.map((value) => (
          <button
            className="p-3 bg-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl text-DARKTHEME_BACKGROUND_COLOR text-center w-[60px] rounded"
            type="button"
            key={value}
            onClick={handleOnClick}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

const CustomModePage: FC = (): ReactElement => {
  const [boardSize, setBoardSize] = useState<BoardSize>(32);
  const [tileAmount, setTileAmount] = useState<TileAmount>(32);
  const [turnLength, setTurnLength] = useState<TurnLength>(30);

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
        <CustomModeForm values={sizes} property="Board size" setFunction={setBoardSize} />
        <CustomModeForm values={amounts} property="Tile amount" setFunction={setTileAmount} />
        <CustomModeForm values={lengths} property="Turn Length" setFunction={setTurnLength} />
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
