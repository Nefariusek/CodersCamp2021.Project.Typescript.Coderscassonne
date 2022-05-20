import React from 'react';
import { openModal, Modal, ModalEvents } from './Modal';

export function openInvalidMoveModal() {
  openModal(ModalEvents.INVALID_MOVE);
}

export const InvalidMoveModal = (): React.ReactElement => {
  return <Modal eventType={ModalEvents.INVALID_MOVE} />;
};
