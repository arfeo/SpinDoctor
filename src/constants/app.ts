import { IGlobals } from '../types/global';

export const APP: IGlobals = {
  pageInstance: null,
  cellSize: 0,
  eventListeners: null,
};

export enum GridDimensions {
  Width = 23,
  Height = 17,
}
