import { Alert } from '../components/Alert';

import { APP } from '../constants/global';

/**
 * Function calculates the analogue of CSS vmin in pixels
 */
export const calculateVMin = (): number => {
  const vpWidth: number = window.innerWidth;
  const vpHeight: number = window.innerHeight;

  return vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);
};

/**
 * Function returns the cell size (atomic canvas measure)
 * depending on the screen size if no cell size is given in the app settings,
 * or cell size given in the app settings
 */
export const setCellSize = (): number => {
  return APP.cellSize > 0 ? APP.cellSize : Math.round(calculateVMin() * 4  / 10) * 10;
};

/**
 * Function looks for all mandatory objects in level description object;
 * returns false if there's no one or more mandatory object
 */
function validateLevel(): boolean {
  const { map, goal } = this.level;

  if (!map || !goal) {
    new Alert(this, 'The level description is invalid: there is no "map" and/or "goal" found.');

    return false;
  }

  return true;
}

/**
 * Function formats a count of seconds to the `mm:ss` type string
 *
 * @param time
 */
function secondsToString(time: number): string {
  const min: number = Math.floor(time / 60);
  const sec: number = Math.floor(time - min * 60);

  return `${(min < 10 ? `0${min}` : min)}:${(sec < 10 ? `0${sec}` : sec)}`;
}

export { validateLevel, secondsToString };
