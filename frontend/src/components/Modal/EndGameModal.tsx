import React from 'react';
import { openModal, Modal, ModalEvents } from './Modal';

export function openEndGameModal() {
  openModal(ModalEvents.END_GAME);
}

export const EndGameModal = (): React.ReactElement => {
  return <Modal eventType={ModalEvents.END_GAME} />;
};
