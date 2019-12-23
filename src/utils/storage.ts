import { APP } from '../constants/global';

/**
 * Function returns data saved in the local storage under the specified key name
 *
 * @param key
 */
function getStorageData(key: string): any {
  try {
    return JSON.parse(window.localStorage.getItem(`${APP.storagePrefix}-${key}`));
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function saves data to the local storage under the specified key name
 *
 * @param key
 * @param data
 */
function saveStorageData(key: string, data: any) {
  try {
    window.localStorage.setItem(`${APP.storagePrefix}-${key}`, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function removes data with the specified key name from the local storage
 *
 * @param key
 */
function removeStorageData(key: string) {
  try {
    window.localStorage.removeItem(`${APP.storagePrefix}-${key}`);
  } catch (error) {
    console.error(error);
  }
}

export {
  getStorageData,
  saveStorageData,
  removeStorageData,
};
