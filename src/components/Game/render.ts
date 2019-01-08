// tslint:disable:max-file-line-count
import {
  MAP_ELEMENT_COLORS,
  WAND_COLORS,
  PILLAR_COLORS,
  WAND_WIDTH,
  WALL_WIDTH,
  DOOR_WIDTH,
  PILLAR_WIDTH,
  GridDimensions,
  MapDefinitions,
} from '../../constants/app';

import { drawDot, drawLineToAngle, drawStar } from './draw';
import { checkAvatarWand } from './actions';

import { IEnemy, IWand } from '../../types/global';

/**
 * Function creates game window element, game panel and all needed canvases
 */
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
  this.doorsCanvas.className = '-doors-canvas';
  this.goalCanvas.className = '-goal-canvas';
  this.wandCanvas.className = '-wand-canvas';

  this.staticCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.staticCanvas.height = this.cellSize * (GridDimensions.Height + 2);
  this.doorsCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.doorsCanvas.height = this.cellSize * (GridDimensions.Height + 2);
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

  if (this.level.doors) {
    boardGrid.appendChild(this.doorsCanvas);
  }

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

/**
 * Function renders game board as described in `map` array of `constants/levels`
 * for the current level, including dots and exit
 */
function renderLevelMap() {
  const { map } = this.level;

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      const objectType: number = map[y][x];

      if (objectType !== undefined && objectType !== MapDefinitions.Empty) {
        const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');
        const top: number = this.cellSize + this.cellSize * y;
        const left: number = this.cellSize + this.cellSize * x;
        const dotX: number = left + this.cellSize / 2;
        const dotY: number = top + this.cellSize / 2;

        switch (objectType) {
          case MapDefinitions.Regular: {
            drawDot.call(
              this,
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.regular.background,
              2,
              MAP_ELEMENT_COLORS.regular.border,
            );
            break;
          }
          case MapDefinitions.Bonus1000:
          case MapDefinitions.Bonus2000: {
            drawDot.call(
              this,
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.bonus.background,
              2,
              MAP_ELEMENT_COLORS.bonus.border,
            );
            break;
          }
          case MapDefinitions.RegularRed:
          case MapDefinitions.BonusRed: {
            drawDot.call(
              this,
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.red.background,
              2,
              MAP_ELEMENT_COLORS.red.border,
            );
            break;
          }
          case MapDefinitions.RegularBlue:
          case MapDefinitions.BonusBlue: {
            drawDot.call(
              this,
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.blue.background,
              2,
              MAP_ELEMENT_COLORS.blue.border,
            );
            break;
          }
          case MapDefinitions.RegularYellow:
          case MapDefinitions.BonusYellow: {
            drawDot.call(
              this,
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.yellow.background,
              2,
              MAP_ELEMENT_COLORS.yellow.border,
            );
            break;
          }
          case MapDefinitions.WallHorizontal: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallVertical: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalHalfLeft: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + this.cellSize / 4,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalHalfRight: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 4,
              top + this.cellSize / 2,
              this.cellSize / 2 + this.cellSize / 4,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallVerticalHalfBottom: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top + this.cellSize / 2 - this.cellSize / 4,
              this.cellSize / 2 + this.cellSize / 4,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallVerticalHalfTop: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2 + this.cellSize / 4,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallTopLeftCorner: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2 - WALL_WIDTH / 2,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallTopRightCorner: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallBottomRightCorner: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallBottomLeftCorner: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2 - WALL_WIDTH / 2,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalToBottom: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalToTop: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallVerticalToRight: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallVerticalToLeft: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          case MapDefinitions.WallX: {
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle.call(
              this,
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            break;
          }
          default: break;
        }
      }
    }
  }

  if (this.level.doors) {
    renderDoors.call(this);
  }

  renderGoal.call(this);
}

/**
 * Function renders doors (if applicable)
 */
function renderDoors() {
  const doorsCtx: CanvasRenderingContext2D = this.doorsCanvas.getContext('2d');
  const staticCtx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  for (const door of this.level.doors) {
    const top: number = this.cellSize + this.cellSize * (door.position[0] + 1);
    const left: number = this.cellSize + this.cellSize * (door.position[1] + 1);

    switch (door.orientation) {
      case 'horizontal': {
        // ..
        break;
      }
      case 'vertical': {
        drawLineToAngle.call(
          this,
          staticCtx,
          left + this.cellSize / 2,
          top - this.cellSize - this.cellSize / 2 - 2,
          this.cellSize / 2,
          90,
          PILLAR_COLORS[door.type],
          PILLAR_WIDTH,
        );
        drawLineToAngle.call(
          this,
          staticCtx,
          left + this.cellSize / 2,
          top + this.cellSize * 2 + 2,
          this.cellSize / 2,
          90,
          PILLAR_COLORS[door.type],
          PILLAR_WIDTH,
        );

        this.doorsCoords.push({
          id: door.id,
          coords: {
            left: drawLineToAngle.call(
              this,
              doorsCtx,
              left + this.cellSize / 2,
              top - this.cellSize,
              this.cellSize * 2 - this.cellSize / 2 - 2,
              90,
              MAP_ELEMENT_COLORS.door.background,
              DOOR_WIDTH,
            ),
            right: drawLineToAngle.call(
              this,
              doorsCtx,
              left + this.cellSize / 2,
              top + this.cellSize * 2 + 2,
              this.cellSize * 2 - this.cellSize / 2 - 2,
              270,
              MAP_ELEMENT_COLORS.door.background,
              DOOR_WIDTH,
            ),
          },
        });
        break;
      }
      default: break;
    }
  }
}

/**
 * Function renders and animates the goal (rotating star-like object beneath a regular dot)
 */
function renderGoal() {
  const goalPosX: number = this.cellSize + this.cellSize * (this.goalPosition[1] + 1);
  const goalPosY: number = this.cellSize + this.cellSize * (this.goalPosition[0] + 1);
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
      const goalX: number = goalPosX + this.cellSize / 2;
      const goalY: number = goalPosY + this.cellSize / 2;

      const goalOuterSize = (): number => {
        switch (goalAnimationStep) {
          case 0: return 3;
          case 1: return 4;
          case 2: return 5;
          default: return;
        }
      };

      goalCtx.clearRect(
        goalPosX,
        goalPosY,
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

/**
 * Functions renders level number and its title as well as game counters (lives, score)
 * in the game panel
 */
function renderPanelCounters() {
  this.boardPanel.level.innerHTML = (`
    <div class="-id">${this.level.id}:</div>
    <div class="-title">${this.level.title}</div>
  `);
  this.boardPanel.lives.innerText = this.lives;
  this.boardPanel.score.innerText = this.score;
}

/**
 * Function renders and animates the avatar wand
 */
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

    this.avatarWandCoords = drawLineToAngle.call(
      this,
      ctx,
      x,
      y,
      this.cellSize * 2 - this.cellSize / 5,
      angle,
      WAND_COLORS.avatar,
      WAND_WIDTH,
    );

    this.level.wand.angle += direction * this.difficulty.correction;

    if (this.level.wand.angle < 0) {
      this.level.wand.angle += 360;
    } else if (this.level.wand.angle >= 360) {
      this.level.wand.angle -= 360;
    }

    checkAvatarWand.call(this);

    requestAnimationFrame(this.animateAvatarWand);
  };

  requestAnimationFrame(this.animateAvatarWand);
}

/**
 * Function renders and animates enemy wands (red, blue and yellow)
 *
 * @param ctx
 * @param enemy
 */
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

    this.enemyWandsCoords[enemy.id] = drawLineToAngle.call(
      this,
      ctx,
      x,
      y,
      this.cellSize * 2 - this.cellSize / 5,
      angle,
      WAND_COLORS[enemy.type],
      WAND_WIDTH,
    );

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
