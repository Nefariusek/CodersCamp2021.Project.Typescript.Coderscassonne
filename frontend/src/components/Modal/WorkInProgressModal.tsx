import React from 'react';
import { openModal, Modal, ModalEvents } from './Modal';

export function openWorkInProgressModal() {
  openModal(ModalEvents.WORK_IN_PROGRESS);
}

export const WorkInProgressModal = (): React.ReactElement => {
  return <Modal eventType={ModalEvents.WORK_IN_PROGRESS} />;
};
