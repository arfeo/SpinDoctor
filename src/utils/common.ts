import { APP } from '../constants/app';

export const calculateVMin = (): number => {
  const vpWidth: number = window.innerWidth;
  const vpHeight: number = window.innerHeight;

  return vpWidth >= vpHeight ? (vpHeight / 100) : (vpWidth / 100);
};

export const setCellSize = (): number => {
  return APP.cellSize > 0 ? APP.cellSize : Math.round(calculateVMin() * 4  / 10) * 10;
};
