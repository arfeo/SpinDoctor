import { LEVELS } from '../../constants/levels';
import { GridDimensions } from '../../constants/app';

function renderGameWindow() {
  const gameWindow: HTMLElement = document.createElement('div');
  const boardPanel: HTMLElement = document.createElement('div');
  const boardGrid: HTMLElement = document.createElement('div');

  gameWindow.className = 'gameWindow';
  boardPanel.className = 'boardPanel';
  boardGrid.className = 'boardGrid';
  this.boardPanel.level.className = '-level';
  this.boardPanel.lives.className = '-lives';
  this.boardPanel.score.className = '-score';

  this.appRoot.appendChild(gameWindow);
  gameWindow.appendChild(boardPanel);
  boardPanel.appendChild(this.boardPanel.level);
  boardPanel.appendChild(this.boardPanel.lives);
  boardPanel.appendChild(this.boardPanel.score);
  gameWindow.appendChild(boardGrid);

  for (let y = 1; y <= GridDimensions.Height; y += 1) {
    for (let x = 1; x <= GridDimensions.Width; x += 1) {
      const staticCell: HTMLCanvasElement = document.createElement('canvas');

      staticCell.id = `cell-${y}-${x}`;
      staticCell.className = '-static-cell';

      staticCell.width = this.cellSize;
      staticCell.height = this.cellSize;

      boardGrid.appendChild(staticCell);
    }
  }
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
