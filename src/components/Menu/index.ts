import { DIFFICULTIES } from '../../constants/global';

import { renderMenuWindow } from './render';
import { getStorageData } from '../../utils/storage';

class Menu {
  player: string;
  difficulty: number;
  playerInput: HTMLInputElement;
  difficultySelect: HTMLSelectElement;

  constructor() {
    this.player = getStorageData('player') || '';
    this.difficulty = getStorageData('difficulty') || DIFFICULTIES[0].id;

    this.render();
  }

  render() {
    renderMenuWindow.call(this);
  }
}

export { Menu };
