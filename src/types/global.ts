export interface IGlobals {
  cellSize: number | null;
  eventListeners: {
    onKeyDown: EventListener;
  };
}

export interface ILevels {
  id: number;
  title: string;
  map: number[][];
  wand: IWand;
  goal: number[];
}

export interface IWand {
  position: number[];
  direction: number;
}
