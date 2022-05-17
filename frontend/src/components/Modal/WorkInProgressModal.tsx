import React from 'react';
import { openModal, Modal } from './Modal';

export function openWorkInProgressModal() {
  openModal('workInProgress');
}

export const WorkInProgressModal = (): React.ReactElement => {
  return <Modal eventType="workInProgress" />;
};
