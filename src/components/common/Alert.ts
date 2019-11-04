import { GameComponent, MenuComponent, ModalComponent } from 'gpt-ts';

class Alert extends ModalComponent {
  private alertLabel: HTMLElement;
  private alertSubmitContainer: HTMLElement;
  private alertSubmitClose: HTMLButtonElement;

  public constructor(page: GameComponent | MenuComponent, text: string, size?: 'large' | 'medium' | 'small') {
    super(page, text, size);
  }

  public init(): void {
    this.alertLabel = document.createElement('div');
    this.alertSubmitContainer = document.createElement('div');
    this.alertSubmitClose = document.createElement('button');

    this.eventHandlers = [
      {
        target: this.alertSubmitClose,
        type: 'click',
        listener: (): void => this.destroy(),
      },
    ];
  }

  public render(): void {
    this.alertLabel.innerText = this.modalContent;
    this.alertSubmitContainer.className = 'modal-submit';
    this.alertSubmitClose.className = '-button';
    this.alertSubmitClose.innerText = 'Close';

    this.modal.appendChild(this.alertLabel);
    this.modal.appendChild(this.alertSubmitContainer);
    this.alertSubmitContainer.appendChild(this.alertSubmitClose);
  }
}

export { Alert };
