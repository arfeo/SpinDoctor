import { DIFFICULTIES } from '../../constants/global';

import { renderMenuWindow } from './render';
import { getStorageData } from '../../utils/storage';

class Menu {
  protected player: string;
  protected difficulty: number;
  protected playerInput: HTMLInputElement;
  protected difficultySelect: HTMLSelectElement;

  constructor() {
    this.player = getStorageData('player') || '';
    this.difficulty = getStorageData('difficulty') || DIFFICULTIES[0].id;

    this.render();
  }

  public render(): void {
    renderMenuWindow.call(this);
  }
}

export { Menu };
