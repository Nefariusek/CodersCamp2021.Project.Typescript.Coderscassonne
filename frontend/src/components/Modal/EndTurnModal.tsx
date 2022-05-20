import React from 'react';
import { openModal, Modal, ModalEvents } from './Modal';

export function openEndTurnModal() {
  openModal(ModalEvents.END_TURN);
}

export const EndTurnModal = (): React.ReactElement => {
  return <Modal eventType={ModalEvents.END_TURN} />;
};
