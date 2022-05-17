import React from 'react';
import { openModal, Modal } from './Modal';

export function openInvalidMoveModal() {
  openModal('invalidMove');
}

export const InvalidMoveModal = (): React.ReactElement => {
  return <Modal eventType="invalidMove" />;
};
