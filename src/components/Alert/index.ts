import { Modal } from '../common/Modal';

class Alert extends Modal {
  public render(): void {
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

    alertSubmitClose.addEventListener('click', (): void => {
      this.close();
    });
  }
}

export { Alert };
