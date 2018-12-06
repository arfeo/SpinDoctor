import { LEVELS } from '../../constants/levels';
import { GridDimensions } from '../../constants/app';

import { IWand } from '../../types/global';

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
  this.staticCanvas.className = '-static-canvas';
  this.wandCanvas.className = '-ward-canvas';

  this.staticCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.staticCanvas.height = this.cellSize * (GridDimensions.Height + 2);
  this.wandCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.wandCanvas.height = this.cellSize * (GridDimensions.Height + 2);

  this.appRoot.appendChild(gameWindow);
  gameWindow.appendChild(boardPanel);
  boardPanel.appendChild(this.boardPanel.level);
  boardPanel.appendChild(this.boardPanel.lives);
  boardPanel.appendChild(this.boardPanel.score);
  gameWindow.appendChild(boardGrid);
  boardGrid.appendChild(this.staticCanvas);
  boardGrid.appendChild(this.wandCanvas);
}

function renderLevelMap() {
  const levelMap: number[][] = LEVELS[this.level - 1].map;

  for (let y = 0; y < levelMap.length; y += 1) {
    for (let x = 0; x < levelMap[y].length; x += 1) {
      const objectType: number = levelMap[y][x];

      if (objectType !== undefined && objectType !== 0) {
        const pinX: number = this.cellSize + this.cellSize * x;
        const pinY: number = this.cellSize + this.cellSize * y;

        switch (objectType) {
          case 1: { // Pin (regular)
            drawPin.call(this, pinX, pinY, 'lightgrey', '#000000');
            break;
          }
          case 2: { // Pin (bonus)
            drawPin.call(this, pinX, pinY, 'grey', '#000000');
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

function renderWand() {
  const ctx: CanvasRenderingContext2D = this.wandCanvas.getContext('2d');
  const wand: IWand = LEVELS[this.level - 1].wand;
  const x: number = (wand.position[1] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;
  const y: number = (wand.position[0] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;
  let angle = 0;

  const animate = () => {
    ctx.clearRect(
      x - this.cellSize * 2,
      y - this.cellSize * 2,
      this.cellSize * 4,
      this.cellSize * 4,
    );

    ctx.beginPath();
    lineToAngle.call(this, ctx, x, y, this.cellSize * 2 - this.cellSize / 5, angle);
    ctx.strokeStyle = 'lightgrey';
    ctx.lineWidth = 5;
    ctx.stroke();

    angle += this.wandDir;

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function drawPin(pinX: number, pinY: number, fillStyle: string, strokeStyle: string) {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(
    pinX + this.cellSize / 2,
    pinY + this.cellSize / 2,
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

function lineToAngle(ctx: CanvasRenderingContext2D, x1: number, y1: number, length: number, angle: number) {
  const a = angle * Math.PI / 180;

  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

export {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderWand,
};
