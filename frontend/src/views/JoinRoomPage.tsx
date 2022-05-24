import AvailableRooms from '../components/Rooms/AvailableRooms';
import { useEffect, useState } from 'react';

import CreateRoom from '../components/Rooms/CreateRoom';
import { PasswordModal } from '../components/Modal/PasswordModal';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_CREATE_PLAYERS } from '../constants/paths';
import WebSocketEvent from '../constants/webSocketEvents';
import rootStore from '../stores/RootStore';

interface Room {
  name: string;
  password: boolean;
  players: number;
}

const JoinRoomPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  useEffect(() => {
    rootStore.websocket?.socket.emit(WebSocketEvent.GET_ROOMS);
  }, []);
  useEffect(() => {
    rootStore.websocket?.socket.on(WebSocketEvent.SEND_ROOMS, (data) => {
      if (data) {
        setRooms(data);
      }
    });
    rootStore.websocket?.socket.on(WebSocketEvent.JOINED_ROOM, (data) => {
      rootStore.setRoom(data);
      navigate(PATH_TO_CREATE_PLAYERS);
    });
    rootStore.websocket?.socket.on(WebSocketEvent.CREATE_ROOM_ERROR, (errorMsg) => {
      setErrorMessage(errorMsg);
      return;
    });
    rootStore.websocket?.socket.on(WebSocketEvent.JOIN_ROOM_ERROR, (errorMsg) => {
      setErrorMessage(errorMsg);
      return;
    });
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10 self-center">
        {errorMessage}
      </p>
      <div className="flex items-center justify-center">
        <CreateRoom />
        <AvailableRooms rooms={rooms} />;
      </div>
      <PasswordModal />
    </div>
  );
};

export default JoinRoomPage;
