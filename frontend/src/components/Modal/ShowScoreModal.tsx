import { observer } from 'mobx-react';
import { openModal, Modal, ModalEvents } from './Modal';
import React from 'react';
import rootStore from '../../stores/RootStore';
import Player from '../../model/Player';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export function openShowScoreModal() {
  openModal(ModalEvents.SHOW_SCORE);
}

export const ShowScoreModal = observer((): React.ReactElement => {
  const players = rootStore.playersStore.players;
  let playersNames: string[] = [];
  let playersScores: number[] = [];

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'green',
          font: {
            size: 17,
          },
          precision: 0,
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 17,
          },
        },
      },
    },
  };

  players.map((player) => {
    playersNames.push(player.name);
    playersScores.push(player.score);
  });

  const data = {
    labels: playersNames,
    datasets: [
      {
        label: '',
        data: playersScores,
        borderColor: '#1b2818',
        backgroundColor: '#38CD2B',
        datalabels: {
          color: '#FFCE56',
        },
      },
    ],
  };

  return (
    <Modal eventType={ModalEvents.SHOW_SCORE}>
      <div className="flex flex-col text-white mb-5 text-center text-xl">
        <div className="flex flex-col">
          {!players.length && <div>There aren't any players yet!</div>}
          {players.map((player: Player) => (
            <div key={player.technology} className="flex flex-row text-lg bold justify-start mb-4">
              <div className="flex justify-center w-[60px]">
                <img src={`./Elements/Meeple/${player.technology}_meeple.png`} alt={player.technology} width="30px" />
              </div>
              <div>
                {player.name} has score: {player.score}
              </div>
            </div>
          ))}

          {!!players.length && <Bar options={options} data={data} />}
        </div>
      </div>
    </Modal>
  );
});
