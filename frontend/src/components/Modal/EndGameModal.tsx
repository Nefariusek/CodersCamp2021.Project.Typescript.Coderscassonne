import React from 'react';
import { observer } from 'mobx-react';
import { openModal, Modal, ModalEvents } from './Modal';

export function openEndGameModal() {
  openModal(ModalEvents.END_GAME);
}

export const EndGameModal = observer((): React.ReactElement => {
  return (
    <Modal eventType={ModalEvents.END_GAME}>
      <div className="flex flex-col"></div>
    </Modal>
  );
});
