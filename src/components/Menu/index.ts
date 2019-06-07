import { Storage } from 'gpt-ts';

import { DIFFICULTIES } from '../../constants/global';

import { renderMenuWindow } from './render';

class Menu {
  player: string;
  difficulty: number;
  playerInput: HTMLInputElement;
  difficultySelect: HTMLSelectElement;

  constructor() {
    this.player = Storage.getData('player') || '';
    this.difficulty = Storage.getData('difficulty') || DIFFICULTIES[0].id;

    this.render();
  }

  render() {
    renderMenuWindow.call(this);
  }
}

export { Menu };
