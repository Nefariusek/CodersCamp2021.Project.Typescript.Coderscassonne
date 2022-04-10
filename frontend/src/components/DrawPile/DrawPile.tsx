interface DrawPileProps {
  numberOfAvailableTiles: number;
}
const DrawPile = ({ numberOfAvailableTiles }: DrawPileProps) => (
  <div className="flex items-center">
    <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3">
      Tiles left : {numberOfAvailableTiles}
    </p>
    <img src="./Elements/Layout/Card_pile.png" alt="Draw Pile" />
  </div>
);

export default DrawPile;
