import React, { useState } from 'react';

export function openInvalidMoveModal() {
  const event = new Event('invalidMove');
  window.dispatchEvent(event);
}

export const InvalidMoveModal: React.FC = () => {
  const [isModalOn, setModalOn] = useState(false);

  const handleClose = () => {
    setModalOn(false);
  };
  React.useEffect(() => {
    window.addEventListener('invalidMove', () => {
      setModalOn(true);
    });
  }, []);

  //setTimeout(handleClose, 5000);

  return (
    <>
      {isModalOn && (
        <div className="   bg-DARKTHEME_DARK_GREEN_COLOR opacity-95 fixed inset-0 z-50   ">
          <div className="flex h-screen opacity-1 justify-center items-center ">
            <div className="flex-col justify-center  bg-DARKTHEME_BACKGROUND_COLOR  py-12 px-24 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR rounded-xl ">
              <div className="flex font-ALMENDRA text-2xl  text-DARKTHEME_LIGHT_GREEN_COLOR  mb-10">
                Sorry, you cannot do that!
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleClose}
                  className="font-ALMENDRA px-4 py-2 text-xl text-white bg-DARKTHEME_LIGHT_GREEN_COLOR"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
