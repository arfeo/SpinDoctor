import { ILevel } from '../types/game';

/**
 *  Map legend:
 *
 *  0 - Empty space
 *  1 - Dot (regular)
 *  2 - Dot (red)
 *  3 - Dot (blue)
 *  4 - Dot (yellow)
 *  5 - Dot (red + blue)
 *  6 - Dot (red + yellow)
 *  7 - Dot (blue + yellow)
 *  8 - Dot (red + blue + yellow)
 *  9 - Ring (regular)
 *  10 - Ring (red)
 *  11 - Ring (blue)
 *  12 - Ring (yellow)
 *  13 - Ring (red + blue)
 *  14 - Ring (red + yellow)
 *  15 - Ring (blue + yellow)
 *  16 - Ring (red + blue + yellow)
 *  17 - Slowdown
 *  18 - Way station
 *  19 - Hourglass
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
 *  50 - Spike (regular)
 *  51 - Spike (shifted along the X-axis to the right)
 *  52 - Spike (shifted along the Y-axis to the bottom)
 *  53 - Spike (shifted along the X-axis to the left)
 *  54 - Spike (shifted along the Y-axis to the top)
 *
 *  NB: The first and the last rows, as well as the first and the last columns of the map
 *  are not supposed to contain any elements, they're service ones!
 */
export const LEVELS: ILevel[] = [
  {
    id: 1,
    title: 'Grid',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 1000,
        position: [12, 14],
      },
      {
        id: 2,
        size: 2000,
        position: [4, 16],
      },
    ],
    goal: [8, 8],
    wand: {
      position: [4, 2],
      direction: 1,
      angle: 270,
    },
    time: 60,
  },
  {
    id: 2,
    title: 'Wands',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 2000,
        position: [10, 6],
      },
      {
        id: 2,
        size: 2000,
        position: [2, 12],
      },
      {
        id: 3,
        size: 2000,
        position: [6, 18],
      },
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
    time: 60,
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
      [0, 0, 21, 1, 0, 1, 0, 1, 25, 1, 0, 1, 21, 1, 0, 1, 21, 1, 0, 1, 21, 0, 0],
      [0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 20, 20, 20, 28, 0, 0, 0, 21, 0, 0],
      [0, 0, 21, 1, 0, 1, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0, 1, 21, 0, 0],
      [0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0],
      [0, 0, 21, 1, 0, 1, 0, 1, 24, 1, 0, 1, 21, 1, 0, 1, 24, 1, 0, 1, 21, 0, 0],
      [0, 0, 29, 20, 20, 20, 20, 20, 31, 20, 20, 20, 31, 20, 20, 20, 31, 20, 20, 20, 28, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 1000,
        position: [12, 12],
      },
      {
        id: 2,
        size: 1000,
        position: [8, 14],
      },
    ],
    goal: [12, 16],
    wand: {
      position: [2, 2],
      direction: 1,
      angle: 270,
    },
    time: 90,
  },
  {
    id: 4,
    title: 'Doors',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 21, 0, 0, 1, 0, 1, 0, 0, 21, 0, 0, 1, 0, 1, 0],
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
      [0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 1, 0, 1, 0, 1, 21, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 2000,
        position: [14, 10],
      },
      {
        id: 2,
        size: 1000,
        position: [0, 20],
      },
      {
        id: 3,
        size: 1000,
        position: [14, 20],
      },
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
    time: 60,
  },
  {
    id: 5,
    title: 'Rings',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 9, 0, 9, 0, 9, 0, 9, 0, 2, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 9, 0, 9, 0, 9, 0, 9, 0, 2, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 9, 0, 9, 0, 9, 0, 9, 0, 2, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 9, 0, 9, 0, 9, 0, 9, 0, 3, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 9, 0, 9, 0, 9, 0, 9, 0, 3, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 9, 0, 9, 0, 9, 0, 3, 0, 9, 0, 9, 0, 9, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 2000,
        position: [2, 10],
      },
      {
        id: 2,
        size: 2000,
        position: [8, 10],
      },
      {
        id: 3,
        size: 2000,
        position: [12, 10],
      },
      {
        id: 4,
        size: 1000,
        position: [12, 2],
      },
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
        move: 'flip',
      },
      {
        id: 2,
        type: 'blue',
        position: [8, 10],
        direction: -1,
        angle: 270,
        move: 'flip',
      },
    ],
    time: 60,
  },
  {
    id: 6,
    title: 'Spikes',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 50, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 50, 1, 50, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 52, 50, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 50, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 54, 50, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 50, 1, 50, 1, 50, 1, 0, 1, 0, 1, 50, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 2000,
        position: [8, 18],
      },
      {
        id: 2,
        size: 1000,
        position: [10, 18],
      },
    ],
    goal: [10, 16],
    wand: {
      position: [8, 10],
      direction: 1,
      angle: 270,
    },
    enemies: [
      {
        id: 1,
        type: 'red',
        position: [8, 18],
        direction: 1,
        angle: 270,
      },
    ],
    time: 60,
  },
  {
    id: 7,
    title: 'Hyperdots',
    map: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    bonus: [
      {
        id: 1,
        size: 1000,
        position: [4, 10],
      },
    ],
    goal: [12, 18],
    wand: {
      position: [2, 2],
      direction: 1,
      angle: 270,
    },
    hyperdots: [
      {
        id: 1,
        type: 1,
        position: [4, 6],
      },
      {
        id: 2,
        type: 1,
        position: [10, 4],
      },
      {
        id: 3,
        type: 2,
        position: [2, 10],
      },
      {
        id: 4,
        type: 2,
        position: [10, 18],
      },
      {
        id: 5,
        type: 3,
        position: [4, 14],
      },
      {
        id: 6,
        type: 3,
        position: [10, 10],
      },
      {
        id: 7,
        type: 4,
        position: [4, 16],
      },
      {
        id: 8,
        type: 4,
        position: [12, 4],
      },
      {
        id: 9,
        type: 5,
        position: [12, 10],
      },
      {
        id: 10,
        type: 5,
        position: [12, 16],
      },
    ],
    time: 60,
  },
];
