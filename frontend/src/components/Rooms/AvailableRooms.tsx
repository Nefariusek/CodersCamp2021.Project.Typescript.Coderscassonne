import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import { useEffect, useState } from 'react';

const AvailableRooms = ({ rooms }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <div className="flex flex-col items-center justify-between w-96 h-[580px] bg-DARKTHEME_BACKGROUND_COLOR border-4 border-DARKTHEME_LIGHT_GREEN_COLOR">
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Rooms</p>
      <div className="flex flex-col items-center justify-around">
        {rooms.map((room) => (
          <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">{room}</p>
        ))}
      </div>
      <div>
        <Tooltip message={errorMessage}>
          <Button type="submit" text="Join Room" colorVariant="light" disabled={!!errorMessage} />
        </Tooltip>
      </div>
    </div>
  );
};

export default AvailableRooms;
