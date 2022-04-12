import Tile from '../../model/Tile';

interface ArrowButtonInterface {
  tile: Tile;
  direction: 'left' | 'right';
}

const ArrowButton = (props: ArrowButtonInterface) => {
  const { tile, direction } = props;
  console.log(tile);

  return (
    <div>
      {direction === 'left' && (
        <button type="button">
          <img src="../../../public/Elements/Layout/Left_arrow.png" alt="left arrow" />
        </button>
      )}
      {direction === 'right' && (
        <button type="button">
          <img src="../../../public/Elements/Layout/Right_arrow.png" alt="right arrow" />
        </button>
      )}
    </div>
  );
};

export default ArrowButton;
