function renderGameWindow() {
  const gameWindow: HTMLElement = document.createElement('div');
  const boardPanel: HTMLElement = document.createElement('div');
  const boardGrid: HTMLElement = document.createElement('div');

  gameWindow.classList.add('gameWindow');
  boardPanel.classList.add('boardPanel');
  boardGrid.classList.add('boardGrid');

  this.appRoot.appendChild(gameWindow);
  gameWindow.appendChild(boardPanel);
  boardPanel.appendChild(this.boardPanel.level);
  boardPanel.appendChild(this.boardPanel.lives);
  boardPanel.appendChild(this.boardPanel.score);
  gameWindow.appendChild(boardGrid);
}

function renderPanelCounters() {
  this.boardPanel.level.innerText = this.level;
  this.boardPanel.lives.innerText = this.lives;
  this.boardPanel.score.innerText = this.score;
}

export { renderGameWindow, renderPanelCounters };
