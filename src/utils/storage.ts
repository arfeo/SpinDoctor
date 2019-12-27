import { APP } from '../constants/global';

/**
 * Function returns data saved in the local storage under the specified key name
 *
 * @param key
 */
function getStorageData(key: string): any | undefined {
  try {
    const data = JSON.parse(window.localStorage.getItem(`${APP.storagePrefix}`));

    return data && typeof data === 'object' ? data[key] : undefined;
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
function saveStorageData(key: string, data: any): void {
  try {
    window.localStorage.setItem(`${APP.storagePrefix}`, JSON.stringify({
      ...JSON.parse(window.localStorage.getItem(`${APP.storagePrefix}`)),
      [key]: data,
    }));
  } catch (error) {
    console.error(error);
  }
}

export {
  getStorageData,
  saveStorageData,
};
