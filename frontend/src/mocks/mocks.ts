import Locations from '../constants/locations';

export const JSONData = [
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.FIELD,
      right: Locations.FIELD,
      top: Locations.FIELD,
    },
    placedBy: 'player1',
    placementTurn: 10,
  },
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.CITY,
      right: Locations.CITY,
      top: Locations.ROAD,
    },
    placedBy: 'player2',
    placementTurn: 11,
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.ROAD,
    },
    placedBy: 'player3',
    placementTurn: 12,
  },
];
