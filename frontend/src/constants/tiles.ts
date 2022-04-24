/* eslint-disable sort-keys */
import Locations from './locations';

type PredefinedTile = {
  imageSource: string;
  top: Locations;
  left: Locations;
  middle: Locations;
  right: Locations;
  bottom: Locations;
  name: string;
  isSpecial: boolean;
};
export const PREDEFINED_TILES: PredefinedTile[] = [
  {
    name: 'Joiner_1',
    imageSource: './Elements/Tiles/Joiners/Joiner_1.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    middle: Locations.CITY,
    right: Locations.FIELD,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
  {
    name: 'Joiner_2',
    imageSource: './Elements/Tiles/Joiners/Joiner_2.png', // image
    top: Locations.FIELD,
    left: Locations.CITY,
    middle: Locations.CITY,
    right: Locations.CITY,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
  {
    name: 'Joiner_3',
    imageSource: './Elements/Tiles/Joiners/Joiner_3.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    middle: Locations.CITY,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
    isSpecial: false,
  },
  {
    name: 'Monastery',
    imageSource: './Elements/Tiles/Monastery/Monastery.png', // image
    top: Locations.MONASTERY,
    left: Locations.MONASTERY,
    middle: Locations.MONASTERY,
    right: Locations.MONASTERY,
    bottom: Locations.MONASTERY,
    isSpecial: true,
  },
  {
    name: 'Garden',
    imageSource: './Elements/Tiles/Monastery/Garden.png', // image
    top: Locations.GARDEN,
    left: Locations.GARDEN,
    middle: Locations.GARDEN,
    right: Locations.GARDEN,
    bottom: Locations.GARDEN,
    isSpecial: true,
  },
  {
    name: 'City_1',
    imageSource: './Elements/Tiles/City/City_1.png', // image
    top: Locations.CITY,
    left: Locations.ROAD,
    middle: Locations.ROAD,
    right: Locations.ROAD,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
  {
    name: 'City_2',
    imageSource: './Elements/Tiles/City/City_2.png', // image
    top: Locations.CITY,
    left: Locations.ROAD,
    middle: Locations.ROAD,
    right: Locations.FIELD,
    bottom: Locations.ROAD,
    isSpecial: false,
  },
  {
    name: 'City_3',
    imageSource: './Elements/Tiles/City/City_3.png', // image
    top: Locations.CITY,
    left: Locations.FIELD,
    middle: Locations.ROAD,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
    isSpecial: false,
  },
  {
    name: 'City_4',
    imageSource: './Elements/Tiles/City/City_4.png', // image
    top: Locations.CITY,
    left: Locations.ROAD,
    middle: Locations.TAVERN,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
    isSpecial: true,
  },
  {
    name: 'City_5',
    imageSource: './Elements/Tiles/City/City_5.png', // image
    top: Locations.CITY,
    left: Locations.FIELD,
    middle: Locations.FIELD,
    right: Locations.FIELD,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
  {
    name: 'City_6',
    imageSource: './Elements/Tiles/City/City_6.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    middle: Locations.CITY,
    right: Locations.CITY,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
  {
    name: 'City_7',
    imageSource: './Elements/Tiles/City/City_7.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    middle: Locations.CITY,
    right: Locations.CITY,
    bottom: Locations.ROAD,
    isSpecial: false,
  },
  {
    name: 'City_8',
    imageSource: './Elements/Tiles/City/City_8.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    middle: Locations.CITY,
    right: Locations.CITY,
    bottom: Locations.CITY,
    isSpecial: true,
  },
  {
    name: 'Road_1',
    imageSource: './Elements/Tiles/Roads/Road_1.png', // image
    top: Locations.FIELD,
    left: Locations.ROAD,
    middle: Locations.ROAD,
    right: Locations.ROAD,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
  {
    name: 'Road_2',
    imageSource: './Elements/Tiles/Roads/Road_2.png', // image
    top: Locations.FIELD,
    left: Locations.FIELD,
    middle: Locations.ROAD,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
    isSpecial: false,
  },
  {
    name: 'Road_3',
    imageSource: './Elements/Tiles/Roads/Road_3.png', // image
    top: Locations.FIELD,
    left: Locations.ROAD,
    middle: Locations.TAVERN,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
    isSpecial: true,
  },
  {
    name: 'Road_4',
    imageSource: './Elements/Tiles/Roads/Road_4.png', // image
    top: Locations.ROAD,
    left: Locations.ROAD,
    middle: Locations.TAVERN,
    right: Locations.ROAD,
    bottom: Locations.ROAD,
    isSpecial: true,
  },
  {
    name: 'Splitter_1',
    imageSource: './Elements/Tiles/Splitters/Splitter_1.png', // image
    top: Locations.CITY,
    left: Locations.FIELD,
    middle: Locations.FIELD,
    right: Locations.FIELD,
    bottom: Locations.CITY,
    isSpecial: false,
  },
  {
    name: 'Splitter_2',
    imageSource: './Elements/Tiles/Splitters/Splitter_2.png', // image
    top: Locations.CITY,
    left: Locations.CITY,
    middle: Locations.FIELD,
    right: Locations.FIELD,
    bottom: Locations.FIELD,
    isSpecial: false,
  },
];
