import { observer } from 'mobx-react';
import { openModal, Modal, ModalEvents } from './Modal';
import React from 'react';

export function openShowScoreModal() {
  openModal(ModalEvents.SHOW_SCORE);
}

export const ShowScoreModal = observer((): React.ReactElement => {
  return (
    <Modal eventType={ModalEvents.SHOW_SCORE}>
      <div className="flex flex-col">Score: 38</div>
    </Modal>
  );
});
