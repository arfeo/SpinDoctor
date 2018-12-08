import { MAP_ELEMENT_COLORS, WAND_COLORS, GridDimensions, MapDefinitions } from '../../constants/app';

import { drawDot, drawLineToAngle, drawStar } from './draw';
import { tryAvatarWandMove } from './actions';

import { IEnemy, IWand } from '../../types/global';

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
  this.goalCanvas.className = '-goal-canvas';
  this.wandCanvas.className = '-ward-canvas';

  this.staticCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.staticCanvas.height = this.cellSize * (GridDimensions.Height + 2);
  this.goalCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.goalCanvas.height = this.cellSize * (GridDimensions.Height + 2);
  this.wandCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.wandCanvas.height = this.cellSize * (GridDimensions.Height + 2);

  this.appRoot.innerHTML = '';

  this.appRoot.appendChild(gameWindow);
  gameWindow.appendChild(boardPanel);
  boardPanel.appendChild(this.boardPanel.level);
  boardPanel.appendChild(this.boardPanel.lives);
  boardPanel.appendChild(this.boardPanel.score);
  gameWindow.appendChild(boardGrid);
  boardGrid.appendChild(this.staticCanvas);
  boardGrid.appendChild(this.goalCanvas);
  boardGrid.appendChild(this.wandCanvas);
  boardGrid.appendChild(pauseLabel);

  if (this.level.enemies) {
    for (let i = 0; i < this.level.enemies.length; i += 1) {
      const enemy: IWand & IEnemy = this.level.enemies[i];
      const enemyCanvas: HTMLCanvasElement = document.createElement('canvas');

      enemyCanvas.className = '-enemy-canvas';

      enemyCanvas.width = this.cellSize * (GridDimensions.Width + 2);
      enemyCanvas.height = this.cellSize * (GridDimensions.Height + 2);

      boardGrid.appendChild(enemyCanvas);

      renderEnemyWand.call(this, enemyCanvas.getContext('2d'), enemy);
    }
  }
}

function renderLevelMap() {
  const { map } = this.level;
  let goalPos: number[];

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      const objectType: number = map[y][x];

      if (objectType !== undefined && objectType !== MapDefinitions.Empty) {
        const dotX: number = this.cellSize + this.cellSize * x;
        const dotY: number = this.cellSize + this.cellSize * y;

        switch (objectType) {
          case MapDefinitions.Regular:
          case MapDefinitions.Goal: {
            drawDot.call(this, dotX, dotY, MAP_ELEMENT_COLORS.regular.background, MAP_ELEMENT_COLORS.regular.border);

            if (objectType === MapDefinitions.Goal) {
              goalPos = [dotY, dotX];
            }
            break;
          }
          case MapDefinitions.Bonus1000:
          case MapDefinitions.Bonus2000: {
            drawDot.call(this, dotX, dotY, MAP_ELEMENT_COLORS.bonus.background, MAP_ELEMENT_COLORS.bonus.border);
            break;
          }
          case MapDefinitions.Red: {
            drawDot.call(this, dotX, dotY, MAP_ELEMENT_COLORS.red.background, MAP_ELEMENT_COLORS.red.border);
            break;
          }
          case MapDefinitions.Blue: {
            drawDot.call(this, dotX, dotY, MAP_ELEMENT_COLORS.blue.background, MAP_ELEMENT_COLORS.blue.border);
            break;
          }
          case MapDefinitions.Yellow: {
            drawDot.call(this, dotX, dotY, MAP_ELEMENT_COLORS.yellow.background, MAP_ELEMENT_COLORS.yellow.border);
            break;
          }
          default: break;
        }
      }
    }
  }

  renderGoal.call(this, goalPos);
}

function renderGoal(goalPos: number[]) {
  let start: number = performance.now();
  let goalAnimationStep = 0;

  this.animateGoal = (time: number) => {
    if (this.isGameStopped) {
      return requestAnimationFrame(this.animateGoal);
    }

    if (time - start > 100) {
      if (goalAnimationStep > 2) {
        goalAnimationStep = 0;
      }

      const goalCtx: CanvasRenderingContext2D = this.goalCanvas.getContext('2d');
      const goalX: number = goalPos[1] + this.cellSize / 2;
      const goalY: number = goalPos[0] + this.cellSize / 2;

      const goalOuterSize = (): number => {
        switch (goalAnimationStep) {
          case 0: return 3;
          case 1: return 4;
          case 2: return 5;
          default: return;
        }
      };

      goalCtx.clearRect(
        goalPos[1],
        goalPos[0],
        this.cellSize,
        this.cellSize,
      );

      if (goalAnimationStep !== 0) {
        goalCtx.translate(goalX, goalY);
        goalCtx.rotate(Math.PI / 360 * 30 * goalAnimationStep);
        goalCtx.translate(-goalX, -goalY);
      }

      drawStar(
        goalCtx,
        goalX,
        goalY,
        4,
        this.cellSize / goalOuterSize(),
        this.cellSize / (goalOuterSize() * 2),
        MAP_ELEMENT_COLORS.goal.background,
        4,
        MAP_ELEMENT_COLORS.goal.border,
      );

      goalAnimationStep += 1;
      start = time;
    }

    requestAnimationFrame(this.animateGoal);
  };

  requestAnimationFrame(this.animateGoal);
}

function renderPanelCounters() {
  this.boardPanel.level.innerHTML = (`
    <div class="-id">${this.level.id}:</div>
    <div class="-title">${this.level.title}</div>
  `);
  this.boardPanel.lives.innerText = this.lives;
  this.boardPanel.score.innerText = this.score;
}

function renderAvatarWand() {
  const ctx: CanvasRenderingContext2D = this.wandCanvas.getContext('2d');

  this.animateAvatarWand = () => {
    if (this.isGameStopped) {
      return requestAnimationFrame(this.animateAvatarWand);
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

    tryAvatarWandMove.call(this);

    requestAnimationFrame(this.animateAvatarWand);
  };

  requestAnimationFrame(this.animateAvatarWand);
}

function renderEnemyWand(ctx: CanvasRenderingContext2D, enemy: IWand & IEnemy) {
  this.animateEnemyWand[enemy.id] = () => {
    if (this.isGameStopped) {
      return requestAnimationFrame(this.animateEnemyWand[enemy.id]);
    }

    const { position, direction, angle } = enemy;
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
    ctx.strokeStyle = WAND_COLORS[enemy.type];
    ctx.lineWidth = 5;
    ctx.stroke();

    enemy.angle += direction * this.difficulty.correction;

    if (enemy.angle < 0) {
      enemy.angle += 360;
    } else if (enemy.angle >= 360) {
      enemy.angle -= 360;
    }

    requestAnimationFrame(this.animateEnemyWand[enemy.id]);
  };

  requestAnimationFrame(this.animateEnemyWand[enemy.id]);
}

export {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderAvatarWand,
};
