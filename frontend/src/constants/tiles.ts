/* eslint-disable sort-keys */
import Locations from './locations';

type PredefinedTile = {
  imageSource: string;
  top: Locations;
  left: Locations;
  right: Locations;
  bottom: Locations;
  name: string;
};
export const PREDEFINED_TILES: PredefinedTile[] = [
  {
    name: 'Joiner_1',
    imageSource: '../../public/Elements/Tiles/Joiners/Joiner_1.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    right: Locations.FIELD,
    bottom: Locations.FIELD,
  },
  {
    name: 'Joiner_2',
    imageSource: '../../public/Elements/Tiles/Joiners/Joiner_2.png', // image
    top: Locations.FIELD,
    left: Locations.CITY,
    right: Locations.CITY,
    bottom: Locations.FIELD,
  },
  {
    name: 'Joiner_3',
    imageSource: '../../public/Elements/Tiles/Joiners/Joiner_3.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
  },
  {
    name: 'Monastery',
    imageSource: '../../public/Elements/Tiles/Monastery/Monastery.png', // image
    top: Locations.MONASTERY,
    left: Locations.MONASTERY,
    right: Locations.MONASTERY,
    bottom: Locations.MONASTERY,
  },
  {
    name: 'Garden',
    imageSource: '../../public/Elements/Tiles/Monastery/Garden.png', // image
    top: Locations.GARDEN,
    left: Locations.GARDEN,
    right: Locations.GARDEN,
    bottom: Locations.GARDEN,
  },
  {
    name: 'City_1',
    imageSource: '../../public/Elements/Tiles/City/City_1.png', // image
    top: Locations.CITY,
    left: Locations.ROAD,
    right: Locations.ROAD,
    bottom: Locations.FIELD,
  },
  {
    name: 'City_2',
    imageSource: '../../public/Elements/Tiles/City/City_2.png', // image
    top: Locations.CITY,
    left: Locations.ROAD,
    right: Locations.ROAD,
    bottom: Locations.FIELD,
  },
];
