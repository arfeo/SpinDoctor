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
  dotRegular: {
    background: 'rgb(200, 200, 200)',
    border: 'rgb(30, 30, 30)',
  },
  dotRed: {
    background: 'rgb(227, 100, 100)',
    border: 'rgb(30, 30, 30)',
  },
  dotBlue: {
    background: 'rgb(48, 118, 171)',
    border: 'rgb(30, 30, 30)',
  },
  dotYellow: {
    background: 'rgb(247, 244, 59)',
    border: 'rgb(30, 30, 30)',
  },
  ring: {
    background: 'rgb(74, 74, 74)',
    border: 'rgb(200, 200, 200)',
  },
  bonus: {
    background: 'rgba(0, 0, 0, 0.45)',
    border: 'rgb(30, 30, 30)',
    innerCircle: 'rgba(255, 255, 255, 0.3)',
  },
  goal: {
    background: 'rgb(221, 239, 255)',
    border: 'rgb(76, 183, 240)',
  },
  wall: {
    background: 'rgb(255, 255, 255)',
  },
  door: {
    background: 'rgb(255, 255, 255)',
  },
  switcher: {
    background: 'rgb(112, 112, 112)',
    border: 'rgb(61, 61, 61)',
    innerBorder: 'rgb(0, 0, 0)',
  },
};

export const WAND_COLORS: IWandColors = {
  avatar: 'rgb(200, 200, 200)',
  red: 'rgb(227, 100, 100)',
  blue: 'rgb(48, 118, 171)',
  yellow: 'rgb(247, 244, 59)',
};

export const PILLAR_COLORS: IWandColors = {
  red: 'rgb(227, 100, 100)',
  blue: 'rgb(48, 118, 171)',
  yellow: 'rgb(247, 244, 59)',
};

export const WAND_WIDTH = 4;

export const WALL_WIDTH = 5;

export const DOOR_WIDTH = 2;

export const PILLAR_WIDTH = 3;

export const WAND_REBOUND = 3;

export const DOORS_ANIMATION_SPEED = 1.5;

export const RING_FADE_OUT_ANIMATION_SPEED = 0.1;

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
  DotRegular = 1,
  DotRegularRed = 2,
  DotRegularBlue = 3,
  DotRegularYellow = 4,
  RingRegular = 5,
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
  DoorSwitcherBlue = 40,
  DoorSwitcherRed = 41,
  DoorSwitcherYellow = 42,
}
