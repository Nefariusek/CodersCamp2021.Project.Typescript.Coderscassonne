import { observer } from 'mobx-react';
import { openModal, Modal, ModalEvents } from './Modal';
import React from 'react';
import rootStore from '../../stores/RootStore';
import Player from '../../model/Player';

export function openShowScoreModal() {
  openModal(ModalEvents.SHOW_SCORE);
}

export const ShowScoreModal = observer((): React.ReactElement => {
  const players = rootStore.playersStore.players;

  return (
    <Modal eventType={ModalEvents.SHOW_SCORE}>
      <div className="flex flex-col text-white mb-5 text-center text-xl">
        <div className="flex flex-col">
          {!players.length && <div>There isn't any players yet!</div>}
          {players.map((player: Player) => (
            <div key={player.technology} className="flex flex-row py-2 text-xl bold justify-start">
              <div className="px-1">Name: {player.name}</div>
              <div className="px-1">has score: {player.score}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
});
