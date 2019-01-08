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

export interface IBoardPanel {
  level: HTMLElement;
  lives: HTMLElement;
  score: HTMLElement;
}

export interface IKeysDown {
  reverse: boolean;
  flip: boolean;
  bounce: boolean;
  swing: boolean;
  pause: boolean;
}

export interface IEnemyWandsCoords {
  [key: number]: number[][];
}

export interface ILevel {
  id: number;
  title: string;
  map: number[][];
  doors?: IDoor[];
  goal: number[];
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

export interface IDoor {
  id: number;
  position: number[];
  type: 'blue' | 'red' | 'yellow';
  orientation: 'vertical' | 'horizontal';
  opened: boolean;
}

export interface IMapElementColors {
  [key: string]: {
    background: string;
    [key: string]: string;
  };
}

export interface IWandColors {
  [key: string]: string;
}

export interface ILineSegment {
  start: IPoint;
  end: IPoint;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IDoorCoords {
  id: number;
  coords: {
    left: number[][];
    right: number[][];
  };
}
