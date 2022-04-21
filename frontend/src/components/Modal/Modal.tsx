import React from 'react';

interface ModalProps {
  setModalOn: (a: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setModalOn }) => {
  const handleClose = () => {
    setModalOn(false);
  };
  setTimeout(handleClose, 5000);

  return (
    <div className="   bg-DARKTHEME_DARK_GREEN_COLOR opacity-95 fixed inset-0 z-50   ">
      <div className="flex h-screen opacity-1 justify-center items-center ">
        <div className="flex-col justify-center  bg-DARKTHEME_BACKGROUND_COLOR  py-12 px-24 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR rounded-xl ">
          <div className="flex font-ALMENDRA text-2xl  text-DARKTHEME_LIGHT_GREEN_COLOR  mb-10">
            You couldn't place tile here
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
  );
};

export default Modal;
