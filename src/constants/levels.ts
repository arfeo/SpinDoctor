import { ILevel } from '../types/global';

/**
 *  Map legend:
 *
 *  0 - Empty space
 *  1 - Dot (regular)
 *  2 - Dot (bonus +1000)
 *  3 - Dot (bonus +2000)
 *  4 - Dot (regular red)
 *  5 - Dot (regular blue)
 *  6 - Dot (regular yellow)
 *  7 - Dot (red + bonus)
 *  8 - Dot (blue + bonus)
 *  9 - Dot (yellow + bonus)
 *  20 - Wall (full width horizontal)
 *  21 - Wall (full width vertical)
 *  22 - Wall (half width horizontal left)
 *  23 - Wall (half width horizontal right)
 *  24 - Wall (half width vertical bottom)
 *  25 - Wall (half width vertical top)
 *  26 - Wall (top left corner)
 *  27 - Wall (top right corner)
 *  28 - Wall (bottom right corner)
 *  29 - Wall (bottom left corner)
 *  30 - Wall (horizontal to bottom)
 *  31 - Wall (horizontal to top)
 *  32 - Wall (vertical to right)
 *  33 - Wall (vertical to left)
 *  34 - Wall (X)
 *  40 - Door switcher (blue)
 *  41 - Door switcher (red)
 *  42 - Door switcher (yellow)
 *  50 - Ring (regular)
 */
export const LEVELS: ILevel[] = [
  {
    id: 1,
    title: 'Grid',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    goal: [10, 8],
    wand: {
      position: [2, 2],
      direction: 1,
      angle: 270,
    },
  },
  {
    id: 2,
    title: 'Wands',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 7, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    goal: [10, 16],
    wand: {
      position: [2, 2],
      direction: 1,
      angle: 270,
    },
    enemies: [
      {
        id: 1,
        type: 'red',
        position: [2, 12],
        direction: 1,
        angle: 270,
      },
      {
        id: 2,
        type: 'blue',
        position: [10, 6],
        direction: 1,
        angle: 270,
      },
      {
        id: 3,
        type: 'yellow',
        position: [6, 18],
        direction: 1,
        angle: 270,
      },
    ],
  },
  {
    id: 3,
    title: 'Walls',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 23, 20, 20, 30, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 27, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 21, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0],
      [0, 0, 24, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 21, 0, 0],
      [0, 0, 32, 20, 20, 22, 0, 0, 21, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0],
      [0, 0, 21, 1, 0, 1, 0, 1, 21, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 0, 0],
      [0, 0, 32, 22, 0, 0, 0, 23, 34, 22, 0, 0, 21, 0, 0, 23, 30, 0, 0, 0, 33, 0, 0],
      [0, 0, 21, 1, 0, 1, 0, 1, 25, 1, 0, 1, 21, 1, 0, 2, 21, 1, 0, 1, 21, 0, 0],
      [0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 20, 20, 20, 28, 0, 0, 0, 21, 0, 0],
      [0, 0, 21, 1, 0, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 0, 0],
      [0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0],
      [0, 0, 21, 1, 0, 1, 0, 1, 24, 1, 0, 1, 21, 2, 0, 1, 24, 1, 0, 1, 21, 0, 0],
      [0, 0, 29, 20, 20, 20, 20, 20, 31, 20, 20, 20, 31, 20, 20, 20, 31, 20, 20, 20, 28, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    goal: [12, 16],
    wand: {
      position: [2, 2],
      direction: 1,
      angle: 270,
    },
  },
  {
    id: 4,
    title: 'Doors',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 21, 0, 0, 1, 0, 1, 0, 0, 21, 0, 0, 1, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 40, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 40, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 2, 0, 1, 0, 1, 21, 1, 0, 1, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    doors: [
      {
        id: 1,
        position: [7, 7],
        type: 'blue',
        orientation: 'vertical',
        opened: false,
      },
      {
        id: 2,
        position: [6, 15],
        type: 'blue',
        orientation: 'vertical',
        opened: true,
      },
    ],
    goal: [12, 18],
    wand: {
      position: [2, 2],
      direction: 1,
      angle: 270,
    },
  },
  {
    id: 5,
    title: 'Rings',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 50, 0, 50, 0, 50, 0, 50, 0, 7, 0, 50, 0, 50, 0, 50, 0, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 50, 0, 50, 0, 50, 0, 50, 0, 4, 0, 50, 0, 50, 0, 50, 0, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 50, 0, 50, 0, 50, 0, 50, 0, 4, 0, 50, 0, 50, 0, 50, 0, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 50, 0, 50, 0, 50, 0, 50, 0, 8, 0, 50, 0, 50, 0, 50, 0, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 50, 0, 50, 0, 50, 0, 50, 0, 5, 0, 50, 0, 50, 0, 50, 0, 50, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 50, 0, 50, 0, 50, 0, 8, 0, 50, 0, 50, 0, 50, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    goal: [12, 18],
    wand: {
      position: [4, 4],
      direction: 1,
      angle: 270,
    },
    enemies: [
      {
        id: 1,
        type: 'red',
        position: [2, 10],
        direction: 1,
        angle: 270,
      },
      {
        id: 2,
        type: 'blue',
        position: [8, 10],
        direction: -1,
        angle: 270,
      },
    ],
  },
];
