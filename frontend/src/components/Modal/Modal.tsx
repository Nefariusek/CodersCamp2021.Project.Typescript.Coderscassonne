import React, { useState, useEffect } from 'react';
import { PATH_TO_SETTINGS } from '../../constants/paths';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

interface ModalProps {
  eventType: string;
}

export function openModal(eventType: string) {
  const event = new Event(eventType);
  window.dispatchEvent(event);
}

export const Modal = (props: ModalProps): React.ReactElement => {
  const { eventType } = props;

  const [isModalOn, setModalOn] = useState(false);
  const navigate = useNavigate();

  let eventText, closeText;
  switch (eventType) {
    case 'endGame':
      eventText = 'The game ends here. More in module No. 5';
      closeText = 'Play new game';
      break;
    case 'endTurn':
      eventText = "It's the end of your turn!";
      closeText = 'Cancel';
      break;
    case 'invalidMove':
      eventText = "Sorry, this tile can't be placed here!";
      closeText = 'Cancel';
      break;
    case 'workInProgress':
      eventText = 'Work in progress';
      closeText = 'Cancel';
      break;
    default:
      eventText = '';
      closeText = 'Cancel';
  }

  const handleClose = () => {
    if (eventType === 'endGame') {
      navigate(PATH_TO_SETTINGS);
    } else {
      setModalOn(false);
    }
  };

  useEffect(() => {
    window.addEventListener(eventType, () => {
      setModalOn(true);
    });
  }, []);

  return (
    <>
      {isModalOn && (
        <div className="bg-DARKTHEME_DARK_GREEN_COLOR opacity-95 fixed inset-0 z-50">
          <div className="flex h-screen opacity-1 justify-center items-center">
            <div className="flex-col justify-center bg-DARKTHEME_BACKGROUND_COLOR py-12 px-24 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR rounded-xl">
              <div className="flex justify-center font-ALMENDRA text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR mb-10">
                {eventText}
              </div>
              <div className="flex justify-center">
                <Button type="button" text={closeText} onClick={handleClose} colorVariant="light" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
