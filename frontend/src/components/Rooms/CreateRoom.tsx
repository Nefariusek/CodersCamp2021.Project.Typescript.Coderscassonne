import { useState, useEffect } from 'react';
import WebSocketEvent from '../../constants/webSocketEvents';
import rootStore from '../../stores/RootStore';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState<string>('');
  const [roomPassword, setRoomPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');

    if (!roomName) {
      setErrorMessage('Choose rooms` name!');
      return;
    }
    if (roomName.length < 3 || roomName.length > 12) {
      setErrorMessage('Choose name between 3 and 12 characters long!');
      return;
    }
  }, [roomName]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomName) return;
    rootStore.websocket?.socket.emit(WebSocketEvent.CREATE_ROOM, { name: roomName, password: roomPassword });
    setRoomName('');
    setRoomPassword('');
    rootStore.websocket?.socket.emit(WebSocketEvent.GET_ROOMS);
  };

  return (
    <form
      className="bg-DARKTHEME_BACKGROUND_COLOR flex flex-col items-center justify-between w-96 h-[580px] border-4 border-DARKTHEME_LIGHT_GREEN_COLOR"
      onSubmit={handleSubmit}
    >
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10">Create Room</p>
      <div>
        <input
          className="font-ALMENDRA font-bold text-2xl bg-DARKTHEME_DARK_GREEN_COLOR w-80 text-DARKTHEME_LIGHT_GREEN_COLOR focus:outline-none h-10"
          value={roomName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setRoomName(e.currentTarget.value);
          }}
          autoFocus
        />
        <p className="font-ALMENDRA font-bold text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Room Name</p>
      </div>
      <div>
        <input
          className="font-ALMENDRA font-bold text-2xl bg-DARKTHEME_DARK_GREEN_COLOR w-80 text-DARKTHEME_LIGHT_GREEN_COLOR focus:outline-none h-10 border-0"
          value={roomPassword}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setRoomPassword(e.currentTarget.value);
          }}
          type="password"
        />
        <p className="font-ALMENDRA font-bold text-DARKTHEME_LIGHT_GREEN_COLOR p-3">Password (optional)</p>
      </div>

      <div className="m-10">
        <Tooltip message={errorMessage}>
          <Button type="submit" text="Create Room" colorVariant="light" disabled={!!errorMessage} />
        </Tooltip>
      </div>
    </form>
  );
};

export default CreateRoom;
