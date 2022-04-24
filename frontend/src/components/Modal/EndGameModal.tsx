import React, { useContext, useState } from 'react';
import { PATH_TO_SETTINGS } from '../../constants/paths';
import { useNavigate } from 'react-router-dom';
import DataStoreContext, { drawnTiles } from '../DataStoreContext/DataStoreContext';

export const EndGameModal: React.FC = () => {
  const [isModalOn, setModalOn] = useState(false);
  const navigate = useNavigate();
  const { turnNumber } = useContext(DataStoreContext);
  const handleEndGame = () => {
    navigate(PATH_TO_SETTINGS);
  };
  let tilesLeft = drawnTiles.length - turnNumber;
  console.log(tilesLeft);
  if (tilesLeft <= 0) {
    setModalOn((isModalOn) => !isModalOn);
  }

  return (
    <>
      {isModalOn && (
        <div className="   bg-DARKTHEME_DARK_GREEN_COLOR opacity-95 fixed inset-0 z-50   ">
          <div className="flex h-screen opacity-1 justify-center items-center ">
            <div className="flex-col justify-center  bg-DARKTHEME_BACKGROUND_COLOR  py-12 px-24 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR rounded-xl ">
              <div className="flex font-ALMENDRA text-2xl  text-DARKTHEME_LIGHT_GREEN_COLOR  mb-10">
                The game ends here. More in module No. 5
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleEndGame}
                  className="font-ALMENDRA px-4 py-2 text-xl text-white bg-DARKTHEME_LIGHT_GREEN_COLOR"
                >
                  Play new game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
