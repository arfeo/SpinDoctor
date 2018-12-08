import { IDifficulty, IMapElementColors, IGlobals, IWandColors } from '../types/global';

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

export const MAP_ELEMENT_COLORS: IMapElementColors = {
  regular: {
    background: 'rgb(200, 200, 200)',
    border: 'rgb(30, 30, 30)',
  },
  bonus: {
    background: 'rgb(50, 50, 50)',
    border: 'rgb(30, 30, 30)',
  },
  goal: {
    background: 'rgb(221, 239, 255)',
    border: 'rgb(76, 183, 240)',
  },
  red: {
    background: 'rgb(227, 100, 100)',
    border: 'rgb(30, 30, 30)',
  },
  blue: {
    background: 'rgb(48, 118, 171)',
    border: 'rgb(30, 30, 30)',
  },
  yellow: {
    background: 'rgb(247, 244, 59)',
    border: 'rgb(30, 30, 30)',
  },
};

export const WAND_COLORS: IWandColors = {
  avatar: 'rgb(200, 200, 200)',
  red: 'rgb(227, 100, 100)',
  blue: 'rgb(48, 118, 171)',
  yellow: 'rgb(247, 244, 59)',
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
  Red = 7,
  Blue = 8,
  Yellow = 9,
  Goal = 100,
}
