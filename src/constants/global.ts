import { IGlobals } from '../types/global';
import { IDifficulty } from '../types/game';

export const APP: IGlobals = {
  pageInstance: null,
  eventListeners: null,
  storagePrefix: 'spin-doctor',
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
