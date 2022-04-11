import Locations from '../constants/locations';

export const JSONData = [
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.FIELD,
      right: Locations.FIELD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    middle: Locations.FIELD,
  },
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.CITY,
      right: Locations.CITY,
      top: Locations.ROAD,
    },
    isSpecial: false,
    middle: Locations.CITY,
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.ROAD,
    },
    isSpecial: false,
    middle: Locations.CITY,
  },
];
