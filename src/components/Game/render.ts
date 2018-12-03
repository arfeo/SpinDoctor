function renderGameBoard() {
  const gameBoard: HTMLElement = document.createElement('div');

  gameBoard.classList.add('gameBoard');

  this.appRoot.appendChild(gameBoard);
}

export { renderGameBoard };
