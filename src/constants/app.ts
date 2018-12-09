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
  wall: {
    background: 'rgb(255, 255, 255)',
  }
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
  RegularRed = 4,
  RegularBlue = 5,
  RegularYellow = 6,
  BonusRed = 7,
  BonusBlue = 8,
  BonusYellow = 9,
  WallHorizontal = 20,
  WallVertical = 21,
  WallHorizontalHalfLeft = 22,
  WallHorizontalHalfRight = 23,
  WallVerticalHalfBottom = 24,
  WallVerticalHalfTop = 25,
  WallTopLeftCorner = 26,
  WallTopRightCorner = 27,
  WallBottomRightCorner = 28,
  WallBottomLeftCorner = 29,
  WallHorizontalToBottom = 30,
  WallHorizontalToTop = 31,
  WallVerticalToRight = 32,
  WallVerticalToLeft = 33,
  WallX = 34,
  Goal = 100,
}
