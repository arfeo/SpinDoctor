import { MenuComponent, Storage, MenuItemOption } from 'gpt-ts';

import { Game } from '../Game';

import { APP } from '../../constants/global';
import { DIFFICULTIES } from '../../constants/game';

import { IDifficulty } from '../../types/game';

class Menu extends MenuComponent {
  private player: string;
  private difficulty: number;

  public playerInput: HTMLInputElement;
  public difficultySelect: HTMLSelectElement;

  public init(): void {
    this.root = document.getElementById('root');
    this.player = Storage.getData('spin-doctor-player') || '';
    this.difficulty = Storage.getData('spin-doctor-difficulty') || DIFFICULTIES[0].id;

    this.items = [
      {
        type: 'html',
        value: '<div>Doctor on duty:</div>',
        className: 'label',
      },
      {
        type: 'text',
        value: this.player,
        action: {
          type: 'input',
          handler: (event: Event & { target: { value: string } }): void => {
            this.player = event.target.value;

            Storage.saveData('spin-doctor-player', this.player);
          },
        },
      },
      {
        type: 'html',
        value: '<div>Difficulty:</div>',
        className: 'label',
      },
      {
        type: 'select',
        value: this.player,
        options: DIFFICULTIES.map((item: IDifficulty): MenuItemOption => ({
          value: item.id.toString(),
          text: `${item.icon} ${item.title}`,
          selected: this.difficulty === item.id,
        })),
        action: {
          type: 'change',
          handler: (event: Event & { target: { value: string } }): void => {
            this.difficulty = parseInt(event.target.value, 10);

            Storage.saveData('spin-doctor-difficulty', this.difficulty);
          },
        },
      },
      {
        type: 'html',
        value: '<hr />',
      },
      {
        type: 'button',
        value: 'Play',
        action: {
          type: 'click',
          handler: (): void => {
            APP.pageInstance = new Game(1, 4, 0, this.difficulty);
          },
        },
      },
    ];
  }
}

export { Menu };
