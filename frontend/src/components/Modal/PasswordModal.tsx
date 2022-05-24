import React, { useState } from 'react';
import rootStore from '../../stores/RootStore';
import WebSocketEvent from '../../constants/webSocketEvents';
let room: string;

export function openPasswordModal(roomName: string) {
  room = roomName;
  const event = new Event('password');
  window.dispatchEvent(event);
}

export const PasswordModal: React.FC = () => {
  const [isModalOn, setModalOn] = useState(false);
  const [roomPassword, setRoomPassword] = useState<string>('');

  const handleClose = () => {
    setModalOn(false);
  };
  React.useEffect(() => {
    window.addEventListener('password', () => {
      setModalOn(true);
    });
  }, []);

  const handleSubmit = () => {
    rootStore.websocket?.socket.emit(WebSocketEvent.JOIN_ROOM, { name: room, password: roomPassword });
    setRoomPassword('');
    setModalOn(false);
  };

  return (
    <>
      {isModalOn && (
        <div className="bg-DARKTHEME_DARK_GREEN_COLOR opacity-95 fixed inset-0 z-50   ">
          <div className="flex h-screen opacity-1 justify-center items-center ">
            <div className="flex-col justify-around  bg-DARKTHEME_BACKGROUND_COLOR  py-12 px-24 border-4 border-DARKTHEME_LIGHT_GREEN_COLOR rounded-xl ">
              <div className="flex justify-center font-ALMENDRA text-2xl  text-DARKTHEME_LIGHT_GREEN_COLOR  mb-10">
                Password to {room}
              </div>
              <form>
                <input
                  className="font-ALMENDRA font-bold text-2xl bg-DARKTHEME_DARK_GREEN_COLOR w-80 text-DARKTHEME_LIGHT_GREEN_COLOR focus:outline-none h-10 border-0 m-10"
                  value={roomPassword}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setRoomPassword(e.currentTarget.value);
                  }}
                  type="password"
                />
              </form>
              <div className="flex justify-around">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="font-ALMENDRA px-4 py-2 text-xl text-white bg-DARKTHEME_LIGHT_GREEN_COLOR"
                >
                  OK
                </button>
                <button
                  onClick={handleClose}
                  className="font-ALMENDRA px-4 py-2 text-xl text-white bg-DARKTHEME_LIGHT_GREEN_COLOR"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
