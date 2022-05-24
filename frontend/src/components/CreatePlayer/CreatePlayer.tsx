/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';

import Button from '../Button/Button';
import Technologies from '../../constants/technologies';
import Tooltip from '../Tooltip/Tooltip';
import { observer } from 'mobx-react';
import rootStore from '../../stores/RootStore';

interface CreatePlayerProps {
  availableTechnologies: Technologies[];
  playersNames: string[];
  setAvailableTechnologies: React.Dispatch<React.SetStateAction<Technologies[]>>;
}

const CreatePlayer = observer(
  ({ availableTechnologies, setAvailableTechnologies, playersNames }: CreatePlayerProps) => {
    const [playerName, setPlayerName] = useState('');
    const [playerMeeple, setPlayerMeeple] = useState<Technologies>();
    const [errorMessage, setErrorMessage] = useState("Choose the player's name and choose a meeple");

    useEffect(() => {
      setErrorMessage('');

      if (!playerName) {
        setErrorMessage("Choose player's name!");
        return;
      }
      if (playerName.length < 3 || playerName.length > 12) {
        setErrorMessage('Choose name between 3 and 12 characters long!');
        return;
      }
      if (playersNames.includes(playerName)) {
        setErrorMessage('Name is taken! Choose different one!');
        return;
      }
      if (!playerMeeple) {
        setErrorMessage('Choose a meeple!');
        return;
      }
    }, [playerName, playerMeeple]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!playerName || !playerMeeple) return;

      if (rootStore.room) {
        //rootStore.playersStore.addPlayer(playerName, playerMeeple);

        setAvailableTechnologies([]);
        rootStore.clientName = playerName;
        rootStore.websocket?.emitCreatePlayer(playerName, playerMeeple);
      } else {
        rootStore.playersStore.addPlayer(playerName, playerMeeple);
        setAvailableTechnologies(availableTechnologies.filter((tech) => tech !== playerMeeple));
      }
      setPlayerName('');
      const radio: HTMLInputElement | null = document.querySelector('input[type=radio]:checked');
      if (radio) {
        radio.checked = false;
      }
      setPlayerMeeple(undefined);
    };

    return (
      <form
        className="bg-DARKTHEME_BACKGROUND_COLOR flex flex-col items-center justify-between w-96 h-[580px] border-4 border-DARKTHEME_LIGHT_GREEN_COLOR"
        onSubmit={handleSubmit}
      >
        <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Create player</p>
        <div>
          <input
            className="font-ALMENDRA font-bold text-2xl bg-DARKTHEME_DARK_GREEN_COLOR w-80 text-DARKTHEME_LIGHT_GREEN_COLOR focus:outline-none h-10"
            value={playerName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPlayerName(e.currentTarget.value);
            }}
            autoFocus
          />
          <p className="font-ALMENDRA font-bold text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Player Name</p>
        </div>
        <div>
          <div className="flex justify-around w-80">
            {availableTechnologies.map((technology: Technologies) => (
              <label key={technology}>
                <input
                  className="w-0 h-0 opacity-0  peer"
                  type="radio"
                  name="choose-meeple"
                  value={technology}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setPlayerMeeple(e.currentTarget.value as Technologies);
                  }}
                />
                <img
                  className="peer-checked:border-2 peer-checked:border-DARKTHEME_LIGHT_GREEN_COLOR"
                  src={`./Elements/Meeple/${technology}_meeple.png`}
                  alt={technology}
                />
              </label>
            ))}
          </div>
          <p className="font-ALMENDRA font-bold text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Choose Meeple</p>
        </div>

        <div className="m-10">
          <Tooltip message={errorMessage}>
            <Button type="submit" text="Add Player" colorVariant="light" disabled={!!errorMessage} />
          </Tooltip>
        </div>
      </form>
    );
  },
);

export default CreatePlayer;
