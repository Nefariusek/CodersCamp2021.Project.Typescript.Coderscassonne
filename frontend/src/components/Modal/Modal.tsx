import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { PATH_TO_GAMEPAGE } from '../../constants/paths';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export enum ModalEvents {
  END_GAME = 'endGame',
  END_TURN = 'endTurn',
  INVALID_MOVE = 'invalidMove',
  SETTINGS_ON = 'settingsOn',
  SHOW_SCORE = 'showScore',
  WORK_IN_PROGRESS = 'workInProgress',
  DEFAULT = 'default',
}

const MODAL_EVENT_MESSAGES = {
  [ModalEvents.END_GAME]: ['End of the game!', 'Play new game'],
  [ModalEvents.END_TURN]: ["It's the end of your turn!", 'Play new game'],
  [ModalEvents.INVALID_MOVE]: ["Sorry, this tile can't be placed here!", 'Cancel'],
  [ModalEvents.SETTINGS_ON]: ['Settings', 'Close'],
  [ModalEvents.SHOW_SCORE]: ['Game scores', 'Close'],
  [ModalEvents.WORK_IN_PROGRESS]: ['Work in progress', 'Cancel'],
  [ModalEvents.DEFAULT]: ['', 'Cancel'],
};

interface ModalProps {
  eventType: ModalEvents;
  children?: React.ReactNode;
}

export function openModal(eventType: string) {
  const event = new Event(eventType);
  window.dispatchEvent(event);
}

export const Modal = observer((props: ModalProps): React.ReactElement => {
  const { eventType, children } = props;

  const [isModalOn, setModalOn] = useState(false);
  const navigate = useNavigate();

  const eventText = MODAL_EVENT_MESSAGES[eventType][0];
  const closeText = MODAL_EVENT_MESSAGES[eventType][1];

  const handleClose = () => {
    if (eventType === ModalEvents.END_GAME) {
      navigate(PATH_TO_GAMEPAGE);
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
          <div className="flex h-screen opacity-1 justify-center items-center z-50">
            <div className="flex-col justify-center bg-DARKTHEME_BACKGROUND_COLOR py-12 px-24 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR rounded-xl z-50">
              <div className="flex justify-center font-ALMENDRA text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR mb-10 z-50">
                <p>{eventText}</p>
              </div>
              {children}
              <div className="flex justify-center z-50">
                <Button type="button" text={closeText} onClick={handleClose} colorVariant="light" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
