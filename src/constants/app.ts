import { IDifficulty, IDotColors, IGlobals, IWandColors } from '../types/global';

export const APP: IGlobals = {
  pageInstance: null,
  cellSize: 0,
  eventListeners: null,
};

export const DIFFICULTIES: IDifficulty[] = [
  {
    id: 1,
    title: 'Pre-Med',
    correction: 1,
  },
  {
    id: 2,
    title: 'Intern',
    correction: 1.5,
  },
  {
    id: 3,
    title: 'Resident',
    correction: 2,
  },
  {
    id: 4,
    title: 'Specialist',
    correction: 3,
  },
];

export const DOT_COLORS: IDotColors = {
  regular: {
    background: 'rgb(200, 200, 200)',
    border: 'rgb(30, 30, 30)',
  },
  bonus: {
    background: 'rgb(50, 50, 50)',
    border: 'rgb(30, 30, 30)',
  },
};

export const WAND_COLORS: IWandColors = {
  avatar: 'rgb(200, 200, 200)',
};

export enum FunctionalKeys {
  Reverse = ' ',
  Flip = 'Shift',
  Swing = 'Control',
  Bounce = 'Alt',
  Pause = 'p',
}

export enum GridDimensions {
  Width = 23,
  Height = 17,
}

export enum MapDefinitions {
  Empty = 0,
  Regular = 1,
  Bonus1000 = 2,
  Bonus2000 = 3,
}
