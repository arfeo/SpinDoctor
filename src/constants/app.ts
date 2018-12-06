import { IDifficulty, IGlobals } from '../types/global';

export const APP: IGlobals = {
  pageInstance: null,
  cellSize: 0,
  eventListeners: null,
};

export const DIFFICULTIES: IDifficulty[] = [
  {
    id: 1,
    title: 'Pre-Med',
    correction: 0.5,
  },
  {
    id: 2,
    title: 'Intern',
    correction: 1,
  },
  {
    id: 3,
    title: 'Resident',
    correction: 1.5,
  },
  {
    id: 4,
    title: 'Specialist',
    correction: 2,
  },
];

export enum GridDimensions {
  Width = 23,
  Height = 17,
}
