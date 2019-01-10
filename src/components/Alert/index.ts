import { Modal } from '../common/Modal';
import { Game } from '../Game';

class Alert extends Modal {
  constructor(game: Game, alertText: string) {
    super(game, null, alertText);
  }

  render() {
    const alertLabel: HTMLElement = document.createElement('div');
    const alertSubmitContainer: HTMLElement = document.createElement('div');
    const alertSubmitClose: HTMLButtonElement = document.createElement('button');

    alertLabel.innerText = this.modalContent;
    alertSubmitContainer.className = 'modal-submit';
    alertSubmitClose.className = '-button';
    alertSubmitClose.innerText = 'Close';

    this.modal.appendChild(alertLabel);
    this.modal.appendChild(alertSubmitContainer);
    alertSubmitContainer.appendChild(alertSubmitClose);

    alertSubmitClose.addEventListener('click', () => {
      this.close();
    });
  }
}

export { Alert };
