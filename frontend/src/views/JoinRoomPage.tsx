import AvailableRooms from '../components/Rooms/AvailableRooms';
import { useEffect, useState } from 'react';

import CreateRoom from '../components/Rooms/CreateRoom';
import { PasswordModal } from '../components/Modal/PasswordModal';
import { socket } from '../constants/socket';

const JoinRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    socket.emit('getRooms');
  }, [refresh]);
  useEffect(() => {
    socket.on('availableRooms', (data) => {
      if (data) {
        setRooms(data);
      }
    });
  });
  return (
    <>
      <div className="flex items-center justify-center">
        <CreateRoom refresh={refresh} setRefresh={setRefresh} />
        <AvailableRooms rooms={rooms} />;
      </div>
      <PasswordModal />
    </>
  );
};

export default JoinRoomPage;
