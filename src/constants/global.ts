import { IGlobals, IDifficulty } from '../types/global';

export const APP: IGlobals = {
  pageInstance: null,
  eventListeners: null,
};

export const DIFFICULTIES: IDifficulty[] = [
  {
    id: 1,
    title: 'Pre-Med',
    correction: 1,
    icon: '○',
  },
  {
    id: 2,
    title: 'Intern',
    correction: 1.5,
    icon: '●',
  },
  {
    id: 3,
    title: 'Resident',
    correction: 2,
    icon: '■',
  },
  {
    id: 4,
    title: 'Specialist',
    correction: 3,
    icon: '◆',
  },
];
