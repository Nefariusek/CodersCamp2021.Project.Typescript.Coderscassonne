import { DEFAULT_PLAYERS_MEEPLE_COUNT, DEFAULT_TECHNOLOGY } from '../constants/gameDefaults';
import Technologies from '../constants/technologies';
import Meeple from './Meeple';
import type Tile from './Tile';

class Player {
  public name: string;

  public technology: Technologies;

  private _score: number;

  private _placedTiles: Tile[];

  private _meeples: Meeple[];

  constructor(name: string, technology: Technologies = DEFAULT_TECHNOLOGY) {
    this.name = name;
    this.technology = technology;
    this._score = 0;
    this._placedTiles = [];
    this._meeples = [];

    this.initializeMeeples();
  }

  private initializeMeeples(): void {
    for (let i = 0; i < DEFAULT_PLAYERS_MEEPLE_COUNT; i++) {
      this._meeples.push(new Meeple(this));
    }
  }

  public get score(): number {
    return this._score;
  }

  public updateScore(pointsToAdd: number): number {
    this._score += pointsToAdd;
    return this._score;
  }

  public get placedTiles(): Tile[] {
    return this._placedTiles;
  }

  public set placeTile(tile: Tile) {
    this._placedTiles.push(tile);
  }

  public getMeeple(): Meeple | null {
    const meeple = this._meeples.pop();
    if (typeof meeple !== 'undefined') {
      return meeple;
    }
    return null;
  }

  public getMeepleCount(): number {
    return this._meeples.length;
  }

  public returnMeeple(meeple: Meeple): void {
    this._meeples.push(meeple);
  }

  public getPlayerInfo(): string {
    return `${this.name} (${this.technology}) has ${
      this.score
    } points, ${this.getMeepleCount()} meeples left and placed ${this.placedTiles.length} tiles.`;
  }
}

export default Player;
