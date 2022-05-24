import * as mongoose from 'mongoose';

export enum Locations {
  FIELD = 'FIELD',
  ROAD = 'ROAD',
  CITY = 'CITY',
  GARDEN = 'GARDEN',
  MONASTERY = 'MONASTERY',
  TAVERN = 'TAVERN',
}

export type Edges = {
  bottom: Locations;
  left: Locations;
  right: Locations;
  top: Locations;
};

export const TileSchema = new mongoose.Schema({
  tileId: { type: String, required: true },
  edges: {
    top: { type: String, required: true },
    right: { type: String, required: true },
    bottom: { type: String, required: true },
    left: { type: String, required: true },
  },
  middle: { type: Array, required: true },
  isSpecial: { type: Boolean, default: false, required: true },
});

export interface Tile extends mongoose.Document {
  tileId: string;
  edges: {
    top: Locations;
    right: Locations;
    bottom: Locations;
    left: Locations;
  };
  middle: Locations;
  isSpecial: boolean;
}
