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

export interface ILevels {
  id: number;
  title: string;
  map: number[][];
  wand: IWand;
  goal: number[];
}

export interface IWand {
  position: number[];
  direction: number;
  angle: number;
}

export interface IDotColors {
  [key: string]: {
    background: string;
    border: string;
  };
}

export interface IWandColors {
  [key: string]: string;
}
