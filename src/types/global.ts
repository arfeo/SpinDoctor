import { Game } from '../components/Game';

export interface IGlobals {
  pageInstance: Game;
  cellSize: number | null;
  eventListeners: {
    onKeyDown: EventListener;
    onKeyUp: EventListener;
  };
  storagePrefix: string;
}
