import { renderGameBoard } from './render';

class Game {
  appRoot: HTMLElement;

  constructor() {
    this.appRoot = document.getElementById('root');

    this.render();
  }

  render() {
    renderGameBoard.call(this);
  }
}

export { Game };
