import { Game } from '../../Game';

import { removeEventHandlers, setUpEventHandlers } from '../../Game/events';

abstract class Modal {
  game: Game;
  appRoot: HTMLElement;
  modalContainer: HTMLElement;
  mask: HTMLElement;
  modalWindow: HTMLElement;
  modalClose: HTMLElement;
  modal: HTMLElement;
  modalContent: string;
  abstract render(): void;

  protected constructor(game: Game, text?: string, size?: 'large' | 'medium' | 'small') {
    this.game = game;

    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal-container';

    this.mask = document.createElement('div');
    this.mask.className = 'mask';

    this.modalWindow = document.createElement('div');
    this.modalWindow.classList.add('modal-window');
    this.modalWindow.classList.add(size || 'medium');

    this.modalClose = document.createElement('div');
    this.modalClose.className = 'modal-close';

    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    document.body.appendChild(this.modalContainer);
    this.modalContainer.appendChild(this.mask);
    this.mask.appendChild(this.modalWindow);
    this.modalWindow.appendChild(this.modalClose);
    this.modalWindow.appendChild(this.modal);

    this.modalContent = text || '';

    this.render();

    removeEventHandlers.call(this.game);

    this.modalClose.addEventListener('click', this.close.bind(this));
  }

  close(restoreHandlers = true) {
    this.modalContainer.remove();

    if (restoreHandlers) {
      setUpEventHandlers.call(this.game);
    }
  }
}

export { Modal };
