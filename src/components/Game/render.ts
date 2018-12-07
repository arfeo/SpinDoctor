import { DOT_COLORS, WAND_COLORS, GridDimensions, MapDefinitions } from '../../constants/app';

import { drawDot, drawLineToAngle } from './draw';
import { tryWandMove } from './actions';

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
  const { map } = this.level;

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      const objectType: number = map[y][x];

      if (objectType !== undefined && objectType !== MapDefinitions.Empty) {
        const dotX: number = this.cellSize + this.cellSize * x;
        const dotY: number = this.cellSize + this.cellSize * y;

        switch (objectType) {
          case MapDefinitions.Regular: {
            drawDot.call(this, dotX, dotY, DOT_COLORS.regular.background, DOT_COLORS.regular.border);
            break;
          }
          case MapDefinitions.Bonus1000:
          case MapDefinitions.Bonus2000: {
            drawDot.call(this, dotX, dotY, DOT_COLORS.bonus.background, DOT_COLORS.bonus.border);
            break;
          }
          default: break;
        }
      }
    }
  }
}

function renderPanelCounters() {
  this.boardPanel.level.innerHTML = (`
    <div class="-id">${this.level.id}:</div>
    <div class="-title">${this.level.title}</div>
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

    const { position, direction, angle } = this.level.wand;
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
    ctx.strokeStyle = WAND_COLORS.avatar;
    ctx.lineWidth = 5;
    ctx.stroke();

    this.level.wand.angle += direction * this.difficulty.correction;

    if (this.level.wand.angle < 0) {
      this.level.wand.angle += 360;
    } else if (this.level.wand.angle >= 360) {
      this.level.wand.angle -= 360;
    }

    tryWandMove.call(this);

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
