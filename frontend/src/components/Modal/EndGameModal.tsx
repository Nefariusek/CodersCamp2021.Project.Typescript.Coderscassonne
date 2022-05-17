import React from 'react';
import { openModal, Modal } from './Modal';

export function openEndGameModal() {
  openModal('endGame');
}

export const EndGameModal = (): React.ReactElement => {
  return <Modal eventType="endGame" />;
};
