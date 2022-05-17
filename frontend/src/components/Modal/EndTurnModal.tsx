import React from 'react';
import { openModal, Modal } from './Modal';

export function openEndTurnModal() {
  openModal('endTurn');
}

export const EndTurnModal = (): React.ReactElement => {
  return <Modal eventType="endTurn" />;
};
