import { ModalComponent, Storage } from 'gpt-ts';

import { Menu } from '../../Menu';
import { Game } from '../';

import { APP } from '../../../constants/global';
import { DIFFICULTIES } from '../../../constants/game';

class GameOver extends ModalComponent {
  gameOverLabel: HTMLElement;
  gameOverSubmitContainer: HTMLElement;
  gameOverSubmitRestart: HTMLButtonElement;
  gameOverSubmitStop: HTMLButtonElement;

  constructor(game: Game) {
    super(game);
  }

  init() {
    this.gameOverLabel = document.createElement('div');
    this.gameOverSubmitContainer = document.createElement('div');
    this.gameOverSubmitRestart = document.createElement('button');
    this.gameOverSubmitStop = document.createElement('button');

    this.eventHandlers = [
      {
        target: this.gameOverSubmitRestart,
        type: 'click',
        listener: () => {
          this.parent.destroy();

          APP.pageInstance = new Game(1, 4, 0, Storage.getData('spin-doctor-difficulty') || DIFFICULTIES[0].id);

          this.destroy(false);
        },
      },
      {
        target: this.gameOverSubmitStop,
        type: 'click',
        listener: () => {
          this.parent.destroy();

          APP.pageInstance = new Menu();

          this.destroy(false);
        },
      },
    ];
  }

  render() {
    this.gameOverLabel.innerText = 'Game over. Would you like to start the game over again?';
    this.gameOverSubmitContainer.className = 'modal-submit';
    this.gameOverSubmitRestart.className = '-button';
    this.gameOverSubmitRestart.innerText = 'Yes';
    this.gameOverSubmitStop.className = '-button';
    this.gameOverSubmitStop.innerText = 'No, thanks';

    this.modal.appendChild(this.gameOverLabel);
    this.modal.appendChild(this.gameOverSubmitContainer);
    this.gameOverSubmitContainer.appendChild(this.gameOverSubmitRestart);
    this.gameOverSubmitContainer.appendChild(this.gameOverSubmitStop);
  }
}

export { GameOver };
