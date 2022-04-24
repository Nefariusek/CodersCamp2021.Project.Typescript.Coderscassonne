import React, { ReactElement, useState } from 'react';

interface DescriptionProps {
  name: string;
  description: string;
  imgURL: string;
}

const Description = (props: DescriptionProps) => {
  const { name, description, imgURL } = props;
  return (
    <div className="grid grid-cols-4 text-center justify-items-center p-2">
      <div className="col-span-3">
        <p className="font-bold">{name}</p>
        <p className="text-l">{description}</p>
      </div>
      <img height={60} width={60} src={imgURL} alt={name}></img>
    </div>
  );
};

const Legend: React.FunctionComponent = (): ReactElement => {
  const [isLegendToggled, setIsLegendToggled] = useState(false);

  const toggleLegend = () => {
    setIsLegendToggled(!isLegendToggled);
  };

  return (
    <div className="font-ALMENDRA text-DARKTHEME_LIGHT_GREEN_COLOR text-l">
      {!isLegendToggled && (
        <button onClick={toggleLegend}>
          <img src="./Elements/Layout/glass.png" alt="legend" />
        </button>
      )}
      {isLegendToggled && (
        <div className="bg-DARKTHEME_DARK_GREEN_COLOR rounded w-[400px] absolute top-[20px] right-[20px]">
          <div className="grid grid-cols-6 p-[10px] z-100">
            <p className=" font-bold text-3xl p-3 col-span-5 text-center">Legend</p>
            <button className="p-2 text-bold" onClick={toggleLegend}>
              X
            </button>
          </div>
          <div className="flex flex-col p-2 gap-y-[10px]">
            <Description
              name="Abbot"
              description="Can be placed on just placed tiles- on unoccupied monasteries"
              imgURL="./Elements/Meeple/Card_HTML.png"
            />
            <Description
              name="Meeple"
              description="Can be placed on just placed tiles- on unoccupied roads and cities with no king"
              imgURL="./Elements/Meeple/HTML_meeple.png"
            />
            <Description
              name="Road"
              description="When closed, gives 1 point for every tile on of this road"
              imgURL="./Elements/Tiles/Roads/Road_1.png"
            />
            <Description
              name="City"
              description="Each tile in a completed city is worth 2 points. Each coat of arms is worth 2 more points."
              imgURL="./Elements/Tiles/City/City_7.png"
            />
            <Description
              name="Monastery"
              description="When surrounded by tiles, gives 9 points to a player whose abbot stands on it"
              imgURL="./Elements/Tiles/Monastery/Monastery.png"
            />
            <Description
              name="Garden"
              description="Scores like monastery"
              imgURL="./Elements/Tiles/Monastery/Garden.png"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;
