import Tile from '../../model/Tile';

interface ArrowButtonInterface {
  tile: Tile;
  direction: 'left' | 'right';
}

const ArrowButton = (props: ArrowButtonInterface) => {
  const { tile, direction } = props;

  return (
    <div>
      {direction === 'left' && (
        <button type="button" onClick={() => tile.rotateLeft()}>
          <img src="../../../public/Elements/Layout/Left_arrow.png" alt="left arrow" />
        </button>
      )}
      {direction === 'right' && (
        <button type="button" onClick={() => tile.rotateRight()}>
          <img src="../../../public/Elements/Layout/Right_arrow.png" alt="right arrow" />
        </button>
      )}
    </div>
  );
};

export default ArrowButton;
