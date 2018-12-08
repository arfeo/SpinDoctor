import { Game } from '../components/Game';

export interface IGlobals {
  pageInstance: Game;
  cellSize: number | null;
  eventListeners: {
    onKeyDown: EventListener;
    onKeyUp: EventListener;
  };
}

export interface IDifficulty {
  id: number;
  title: string;
  correction: number;
}

export interface ILevel {
  id: number;
  title: string;
  map: number[][];
  wand: IWand;
  enemies?: (IWand & IEnemy)[];
}

export interface IWand {
  position: number[];
  direction: number;
  angle: number;
}

export interface IEnemy {
  id: number;
  type: string;
}

export interface IMapElementColors {
  [key: string]: {
    background: string;
    border: string;
  };
}

export interface IWandColors {
  [key: string]: string;
}
