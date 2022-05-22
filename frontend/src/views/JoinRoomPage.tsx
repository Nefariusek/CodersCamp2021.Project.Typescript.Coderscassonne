import AvailableRooms from '../components/Rooms/AvailableRooms';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CreateRoom from '../components/Rooms/CreateRoom';

const socket = io('http://localhost:5001');
const JoinRoomPage = () => {
  const [rooms, setRooms] = useState<string[]>([]);
  useEffect(() => {
    socket.emit('getRooms');
  }, []);
  useEffect(() => {
    socket.on('availableRooms', (data: string[]) => {
      if (data) {
        setRooms(data);
      }
    });
  });
  return (
    <div className="flex items-center justify-center">
      <CreateRoom />
      <AvailableRooms rooms={rooms} />;
    </div>
  );
};

export default JoinRoomPage;
