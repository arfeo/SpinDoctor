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

  for (let y = 0; y < GridDimensions.Height; y += 1) {
    for (let x = 0; x < GridDimensions.Width; x += 1) {
      const staticCell: HTMLCanvasElement = document.createElement('canvas');

      staticCell.id = `cell-${y}-${x}`;
      staticCell.className = '-static-cell';

      staticCell.width = this.cellSize;
      staticCell.height = this.cellSize;

      boardGrid.appendChild(staticCell);
    }
  }
}

function renderLevelMap() {
  const levelMap: number[][] = LEVELS[this.level - 1].map;

  for (let y = 0; y < levelMap.length; y += 1) {
    for (let x = 0; x < levelMap[y].length; x += 1) {
      const objectType: number = levelMap[y][x];

      if (objectType !== undefined && objectType !== 0) {
        const cell: HTMLCanvasElement = document.getElementById(`cell-${y}-${x}`) as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = cell.getContext('2d');

        switch (objectType) {
          case 1: { // Pin (regular)
            drawPin.call(this, ctx, 'lightgrey', '#000000');
            break;
          }
          case 2: { // Pin (bonus)
            drawPin.call(this, ctx, 'grey', '#000000');
            break;
          }
          default: break;
        }
      }
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

function drawPin(ctx: CanvasRenderingContext2D, fillStyle: string, strokeStyle: string) {
  ctx.beginPath();
  ctx.arc(
    this.cellSize / 2,
    this.cellSize / 2,
    this.cellSize / 5,
    0,
    Math.PI * 2,
    false,
  );

  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}

export { renderGameWindow, renderLevelMap, renderPanelCounters };
