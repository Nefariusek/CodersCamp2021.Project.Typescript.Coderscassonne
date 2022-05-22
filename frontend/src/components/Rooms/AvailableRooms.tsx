import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import { useEffect, useState } from 'react';
import { openPasswordModal } from '../Modal/PasswordModal';
import { socket } from '../../constants/socket';

interface Room {
  name: string;
  password: boolean;
}

interface AvailableRoomsProps {
  rooms: Room[];
}

const AvailableRooms = ({ rooms }: AvailableRoomsProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');

    if (!selectedRoom) {
      setErrorMessage('Choose a room!');
      return;
    }
  }, [selectedRoom]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedRoom);
    if (!selectedRoom) return;
    if (selectedRoom.password) {
      openPasswordModal(selectedRoom.name);
    } else {
      socket.emit('joinRoom', { name: selectedRoom?.name, password: '' });
    }
    setSelectedRoom(undefined);
    const radio: HTMLInputElement | null = document.querySelector('input[type=radio]:checked');
    if (radio) {
      radio.checked = false;
    }
  };

  return (
    <form
      className="bg-DARKTHEME_BACKGROUND_COLOR flex flex-col items-center justify-between w-96 h-[580px] border-4 border-DARKTHEME_LIGHT_GREEN_COLOR"
      onSubmit={handleSubmit}
    >
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Rooms</p>
      <div className="flex flex-col items-center justify-around">
        {rooms.map((room: Room) => (
          <label key={room.name}>
            <input
              className="w-0 h-0 opacity-0  peer"
              type="radio"
              name="choose-meeple"
              value={room.name}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setSelectedRoom(rooms.find((r: Room) => r.name === e.currentTarget.value));
              }}
            />
            <div className="flex gap-8 peer-checked:border-2 peer-checked:border-DARKTHEME_LIGHT_GREEN_COLOR">
              <p className="font-ALMENDRA font-bold text-2xl text-DARKTHEME_LIGHT_GREEN_COLOR p-1">{room.name}</p>
              {room.password && <img className="h-8 p-1" src={`./Elements/Layout/lock.png`} alt={`locked`} />}
            </div>
          </label>
        ))}
      </div>
      <div>
        <Tooltip message={errorMessage}>
          <Button type="submit" text="Join Room" colorVariant="light" disabled={!!errorMessage} />
        </Tooltip>
      </div>
    </form>
  );
};

export default AvailableRooms;
