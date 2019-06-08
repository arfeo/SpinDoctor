import { MenuComponent, Storage } from 'gpt-ts';

import { Game } from '../Game';

import { APP, DIFFICULTIES } from '../../constants/global';

import { IDifficulty } from '../../types/global';

class Menu extends MenuComponent {
  player: string;
  difficulty: number;
  playerInput: HTMLInputElement;
  difficultySelect: HTMLSelectElement;

  init() {
    this.root = document.getElementById('root');
    this.player = Storage.getData('spin-doctor-player') || '';
    this.difficulty = Storage.getData('spin-doctor-difficulty') || DIFFICULTIES[0].id;
    this.items = [];

    this.items = [
      {
        id: this.items.length + 1,
        type: 'html',
        value: '<div>Doctor on duty:</div>',
        className: 'label',
      },
      {
        id: this.items.length + 1,
        type: 'text',
        value: this.player,
        action: {
          type: 'input',
          handler: (event: Event & { target: { value: string } }) => {
            this.player = event.target.value;

            Storage.saveData('spin-doctor-player', this.player);
          },
        },
      },
      {
        id: this.items.length + 1,
        type: 'html',
        value: '<div>Difficulty:</div>',
        className: 'label',
      },
      {
        id: this.items.length + 1,
        type: 'select',
        value: this.player,
        options: DIFFICULTIES.map((item: IDifficulty) => {
          const option: HTMLOptionElement = document.createElement('option');

          if (this.difficulty === item.id) {
            option.selected = true;
          }

          return {
            value: item.id.toString(),
            text: `${item.icon} ${item.title}`,
          };
        }),
        action: {
          type: 'change',
          handler: (event: Event & { target: { value: string } }) => {
            this.difficulty = parseInt(event.target.value, 10);

            Storage.saveData('spin-doctor-difficulty', this.difficulty);
          },
        },
      },
      {
        id: this.items.length + 1,
        type: 'html',
        value: '<hr />',
      },
      {
        id: this.items.length + 1,
        type: 'button',
        value: 'Play',
        action: {
          type: 'click',
          handler: () => {
            this.destroy();

            APP.pageInstance = new Game(1, 4, 0, this.difficulty);
          },
        },
      },
    ];
  }
}

export { Menu };
