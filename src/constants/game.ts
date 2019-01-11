import { IDifficulty, IMapElementColors, IWandColors } from '../types/game';

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
  board: {
    background: 'rgb(74, 74, 74)',
  },
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
  ringRegular: {
    background: 'rgb(74, 74, 74)',
    border: 'rgb(200, 200, 200)',
  },
  ringRed: {
    background: 'rgb(74, 74, 74)',
    border: 'rgb(227, 100, 100)',
  },
  ringBlue: {
    background: 'rgb(74, 74, 74)',
    border: 'rgb(48, 118, 171)',
  },
  ringYellow: {
    background: 'rgb(74, 74, 74)',
    border: 'rgb(247, 244, 59)',
  },
  bonus: {
    background: 'rgba(0, 0, 0, 0.45)',
    border: 'rgb(30, 30, 30)',
    innerCircle: 'rgba(255, 255, 255, 0.2)',
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
  spike: {
    background: 'rgb(134, 14, 14)',
    innerCircle: 'rgb(254, 52, 52)',
    point: 'rgb(253, 197, 197)',
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

export const FADE_OUT_ANIMATION_SPEED = 0.1;

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
  DotRed = 2,
  DotBlue = 3,
  DotYellow = 4,
  DotRedBlue = 5,
  DotRedYellow = 6,
  DotBlueYellow = 7,
  DotRedBlueYellow = 8,
  RingRegular = 9,
  RingRed = 10,
  RingBlue = 11,
  RingYellow = 12,
  RingRedBlue = 13,
  RingRedYellow = 14,
  RingBlueYellow = 15,
  RingRedBlueYellow = 16,
  Slowdown = 17,
  WayStation = 18,
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
  SpikeRegular = 50,
  SpikeShiftedXRight = 51,
  SpikeShiftedYBottom = 52,
  SpikeShiftedXLeft = 53,
  SpikeShiftedYTop = 54,
}
