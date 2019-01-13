export interface ILevelExtra {
  bonus: number[];
  station: number[];
}

export interface IBoardPanel {
  menuButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  level: HTMLElement;
  time: HTMLElement;
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
  id: number;
  coords: number[][];
}

export interface ILevel {
  id: number;
  title: string;
  map: number[][];
  bonus?: IBonus[];
  doors?: IDoor[];
  goal: number[];
  wand: IWand;
  enemies?: (IWand & IEnemy)[];
  time: number;
}

export interface IBonus {
  id: number;
  size: number;
  position: number[];
}

export interface IWand {
  position: number[];
  direction: number;
  angle: number;
}

export interface IEnemy {
  id: number;
  type: string;
  move?: 'flip' | 'bounce' | 'swing';
  speed?: number;
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
    border?: string;
    [key: string]: string;
  };
}

export interface IWandColors {
  [key: string]: string;
}

export interface IDoorCoords {
  id: number;
  coords: {
    left: number[][];
    right: number[][];
  };
}

export interface ISwitcherCoords {
  type: 'blue' | 'red' | 'yellow';
  coords: number[];
}
