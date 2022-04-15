import { useState } from 'react';

import Technologies from '../../constants/technologies';

interface CreatePlayerProps {
  availableTechnologies: Technologies[];
}

const CreatePlayer = ({ availableTechnologies }: CreatePlayerProps) => {
  const [playersName, setPlayersName] = useState('');
  return (
    <div className="flex flex-col items-center justify-around w-96 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR">
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Create player</p>
      <div>
        <input
          className="font-ALMENDRA font-bold text-2xl bg-DARKTHEME_DARK_GREEN_COLOR w-80 text-DARKTHEME_LIGHT_GREEN_COLOR focus:outline-none h-10"
          value={playersName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setPlayersName(e.currentTarget.value);
          }}
        />
        <p className="font-ALMENDRA font-bold text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Player Name</p>
      </div>
      <div>
        <div className="flex gap-1">
          {availableTechnologies.map((technology) => (
            <label>
              <input className="w-0 h-0 opacity-0  peer" type="radio" name="choose-meeple" value={technology} />
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
      <button
        type="submit"
        className="font-ALMENDRA font-bold text-DARKTHEME_LIGHT_GREEN_COLOR border-2 border-DARKTHEME_LIGHT_GREEN_COLOR w-44 h-10 m-10"
      >
        Add Player
      </button>
    </div>
  );
};

export default CreatePlayer;
