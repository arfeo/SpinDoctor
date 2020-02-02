import { STORAGE_PREFIX } from '../constants/game';

/**
 * Function returns data saved in the local storage under the specified key name;
 * if the `keys` is an array of key names, it returns the corresponding array
 *
 * @param keys
 */
function getStorageData(keys?: string[] | string): any[] | any | undefined {
  try {
    const data: any = JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}`));

    if (keys === undefined) {
      return data || {};
    }

    if (data && Object.prototype.toString.call(data) === '[object Object]') {
      if (Array.isArray(keys)) {
        return keys.map((key: string) => data[key]);
      }

      return data[keys];
    }

    return Array.isArray(keys) ? [] : undefined;
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
    window.localStorage.setItem(`${STORAGE_PREFIX}`, JSON.stringify({
      ...getStorageData(),
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
