import { TileType } from '../components/GameModeParser';
import Locations from '../constants/locations';

export const JSONData: TileType[] = [
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    id: '001_1',
    middle: [Locations.ROAD],
  },
  {
    id: '015_1',
    edges: {
      top: Locations.CITY,
      left: Locations.CITY,
      bottom: Locations.FIELD,
      right: Locations.FIELD,
    },
    middle: [Locations.CITY],
    isSpecial: false,
  },
  {
    id: '015_2',
    edges: {
      top: Locations.CITY,
      left: Locations.CITY,
      bottom: Locations.FIELD,
      right: Locations.FIELD,
    },
    middle: [Locations.CITY],
    isSpecial: false,
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.FIELD,
      right: Locations.FIELD,
      top: Locations.FIELD,
    },
    id: '021_1',
    isSpecial: false,
    middle: [Locations.MONASTERY],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.FIELD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    id: '002_1',
    isSpecial: false,
    middle: [Locations.ROAD],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    id: '003_1',
    middle: [Locations.TAVERN],
  },
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    id: '001_2',
    isSpecial: false,
    middle: [Locations.ROAD],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.FIELD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    id: '002_2',
    isSpecial: false,
    middle: [Locations.ROAD],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.FIELD,
      right: Locations.FIELD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    id: '021_2',
    middle: [Locations.MONASTERY],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.FIELD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    id: '002_3',
    middle: [Locations.ROAD],
  },
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    id: '001_3',
    isSpecial: false,
    middle: [Locations.ROAD],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.FIELD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    id: '002_4',
    middle: [Locations.ROAD],
  },
  {
    edges: {
      bottom: Locations.ROAD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    isSpecial: false,
    id: '003_2',
    middle: [Locations.TAVERN],
  },
  {
    edges: {
      bottom: Locations.FIELD,
      left: Locations.ROAD,
      right: Locations.ROAD,
      top: Locations.FIELD,
    },
    id: '001_4',
    isSpecial: false,
    middle: [Locations.ROAD],
  },
];
