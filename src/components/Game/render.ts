import { LEVELS } from '../../constants/levels';
import { GridDimensions } from '../../constants/app';

import { drawDot, drawLineToAngle } from './draw';

function renderGameWindow() {
  const gameWindow: HTMLElement = document.createElement('div');
  const boardPanel: HTMLElement = document.createElement('div');
  const boardGrid: HTMLElement = document.createElement('div');
  const pauseLabel: HTMLElement = document.createElement('div');

  gameWindow.className = 'gameWindow';
  boardPanel.className = 'boardPanel';
  boardGrid.className = 'boardGrid';
  pauseLabel.id = 'pause';
  pauseLabel.className = '-pause';
  pauseLabel.innerText = 'Paused';
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
  boardGrid.appendChild(pauseLabel);
}

function renderLevelMap() {
  for (let y = 0; y < this.map.length; y += 1) {
    for (let x = 0; x < this.map[y].length; x += 1) {
      const objectType: number = this.map[y][x];

      if (objectType !== undefined && objectType !== 0) {
        const dotX: number = this.cellSize + this.cellSize * x;
        const dotY: number = this.cellSize + this.cellSize * y;

        switch (objectType) {
          case 1: { // Dot (regular)
            drawDot.call(this, dotX, dotY, 'lightgray', '#000000');
            break;
          }
          case 2: { // Dot (bonus)
            drawDot.call(this, dotX, dotY, 'dimgray', '#000000');
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

  const animate = () => {
    if (this.isGameStopped) {
      return requestAnimationFrame(animate);
    }

    const { position, direction, angle } = this.wand;
    const x: number = (position[1] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;
    const y: number = (position[0] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;

    ctx.clearRect(
      x - this.cellSize * 2,
      y - this.cellSize * 2,
      this.cellSize * 4,
      this.cellSize * 4,
    );

    ctx.beginPath();
    drawLineToAngle.call(this, ctx, x, y, this.cellSize * 2 - this.cellSize / 5, angle);
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 5;
    ctx.stroke();

    if (angle < 0) {
      this.wand.angle += 360;
    } else if (angle >= 360) {
      this.wand.angle -= 360;
    }

    this.wand.angle += direction * this.difficulty.correction;

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

export {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderWand,
};
