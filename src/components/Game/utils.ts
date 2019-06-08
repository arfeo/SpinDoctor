import { Alert } from '../common/Alert';

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
