import { observer } from 'mobx-react-lite';
import { socket } from '../../constants/socket';
import WebSocketEvent from '../../constants/webSocketEvents';
import Tile from '../../model/Tile';
import rootStore from '../../stores/RootStore';

interface ArrowButtonInterface {
  tile?: Tile;
  direction: 'left' | 'right';
}

const ArrowButton = observer((props: ArrowButtonInterface) => {
  const { tile, direction } = props;

  function handleRotateLeft() {
    tile?.rotateLeft();
    socket.emit(WebSocketEvent.SEND_TILE_ROTATED, { room: rootStore.room, rotation: -90 });
  }

  function handleRotateRight() {
    tile?.rotateRight();
    socket.emit(WebSocketEvent.SEND_TILE_ROTATED, { room: rootStore.room, rotation: -90 });
  }

  return (
    <div>
      {direction === 'left' && (
        <button type="button" onClick={handleRotateLeft}>
          <img src="./Elements/Layout/Left_arrow.png" alt="left arrow" />
        </button>
      )}
      {direction === 'right' && (
        <button type="button" onClick={handleRotateRight}>
          <img src="./Elements/Layout/Right_arrow.png" alt="right arrow" />
        </button>
      )}
    </div>
  );
});

export default ArrowButton;
