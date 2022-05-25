import Button from '../../components/Button/Button';
import { observer } from 'mobx-react';
import { openModal, Modal, ModalEvents } from './Modal';
import React from 'react';
import rootStore from '../../stores/RootStore';

export function openSettingsModal() {
  openModal(ModalEvents.SETTINGS_ON);
}

export const SettingsModal = observer((): React.ReactElement => {
  // FOR DEVELOPMENT PURPOSES
  //const handleDevelopmentModeButtonClick = () => {
  //   rootStore.setIsDevelopmentMode();
  // };

  const handleClearLocalStorageClick = () => {
    localStorage.clear();
    rootStore.resetStores();
  };

  return (
    <Modal eventType={ModalEvents.SETTINGS_ON}>
      <div className="flex flex-col">
        {/*
        FOR DEVELOPMENT PURPOSES
        <Button
          text={rootStore.isDevelopmentMode ? 'DEV' : 'PROD'}
          onClick={handleDevelopmentModeButtonClick}
          colorVariant="light"
        /> */}
        <Button text="Reset gama data" onClick={handleClearLocalStorageClick} colorVariant="light" />
      </div>
    </Modal>
  );
});
