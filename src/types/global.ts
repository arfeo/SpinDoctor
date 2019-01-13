import { Game } from '../components/Game';
import { Menu } from '../components/Menu';

export interface IGlobals {
  pageInstance: Game | Menu;
  cellSize: number | null;
  eventListeners: {
    onKeyDown: EventListener;
    onKeyUp: EventListener;
  };
  storagePrefix: string;
}

export interface IDifficulty {
  id: number;
  title: string;
  correction: number;
  icon: string;
}
