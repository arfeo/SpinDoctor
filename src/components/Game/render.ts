import { LEVELS } from '../../constants/levels';

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
  const levelId: number = this.level - 1;

  this.boardPanel.level.innerHTML = (`
    <div class="-id">${LEVELS[levelId].id}:</div>
    <div class="-title">${LEVELS[levelId].title}</div>
  `);
  this.boardPanel.lives.innerText = this.lives;
  this.boardPanel.score.innerText = this.score;
}

export { renderGameWindow, renderPanelCounters };
