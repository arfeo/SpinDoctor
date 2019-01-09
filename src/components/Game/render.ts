// tslint:disable:max-file-line-count
import {
  MAP_ELEMENT_COLORS,
  PILLAR_COLORS,
  WALL_WIDTH,
  DOOR_WIDTH,
  PILLAR_WIDTH,
  GridDimensions,
  MapDefinitions,
} from '../../constants/app';

import {
  drawDot,
  drawLineToAngle,
  drawFilledRectangle,
  drawStrokeRectangle,
} from './draw';

import {
  animateAvatarWand,
  animateEnemyWand,
  animateGoal,
} from './animations';

import { IBonus, IDoor, IDoorCoords, IEnemy, IWand } from '../../types/global';

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
  this.switchersCanvas.className = '-switchers-canvas';
  this.goalCanvas.className = '-goal-canvas';
  this.wandCanvas.className = '-wand-canvas';

  this.staticCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.staticCanvas.height = this.cellSize * (GridDimensions.Height + 2);
  this.doorsCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.doorsCanvas.height = this.cellSize * (GridDimensions.Height + 2);
  this.switchersCanvas.width = this.cellSize * (GridDimensions.Width + 2);
  this.switchersCanvas.height = this.cellSize * (GridDimensions.Height + 2);
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
    boardGrid.appendChild(this.switchersCanvas);
  }

  boardGrid.appendChild(this.staticCanvas);
  boardGrid.appendChild(this.goalCanvas);
  boardGrid.appendChild(this.wandCanvas);
  boardGrid.appendChild(pauseLabel);

  if (this.level.wand) {
    animateAvatarWand.call(this);
  }

  if (this.level.enemies) {
    for (let i = 0; i < this.level.enemies.length; i += 1) {
      const enemy: IWand & IEnemy = this.level.enemies[i];
      const enemyCanvas: HTMLCanvasElement = document.createElement('canvas');

      enemyCanvas.className = '-enemy-canvas';

      enemyCanvas.width = this.cellSize * (GridDimensions.Width + 2);
      enemyCanvas.height = this.cellSize * (GridDimensions.Height + 2);

      boardGrid.appendChild(enemyCanvas);

      animateEnemyWand.call(this, enemyCanvas.getContext('2d'), enemy.id);
    }
  }
}

/**
 * Function renders game board as described in `map` array of `constants/levels`
 * for the current level, including dots and exit
 */
function renderLevelMap() {
  const { map, bonus, doors } = this.level;

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
          case MapDefinitions.DotRegular: {
            drawDot(
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.dotRegular.background,
              2,
              MAP_ELEMENT_COLORS.dotRegular.border,
            );
            break;
          }
          case MapDefinitions.DotRegularRed: {
            drawDot(
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.dotRed.background,
              2,
              MAP_ELEMENT_COLORS.dotRed.border,
            );
            break;
          }
          case MapDefinitions.DotRegularBlue: {
            drawDot(
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.dotBlue.background,
              2,
              MAP_ELEMENT_COLORS.dotBlue.border,
            );
            break;
          }
          case MapDefinitions.DotRegularYellow: {
            drawDot(
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.dotYellow.background,
              2,
              MAP_ELEMENT_COLORS.dotYellow.border,
            );
            break;
          }
          case MapDefinitions.RingRegular: {
            drawDot(
              ctx,
              dotX,
              dotY,
              this.cellSize / 5,
              MAP_ELEMENT_COLORS.ring.background,
              2,
              MAP_ELEMENT_COLORS.ring.border,
            );
            break;
          }
          case MapDefinitions.WallHorizontal: {
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left + this.cellSize / 2 - WALL_WIDTH / 2,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
            this.wallsCoords.push(drawLineToAngle(
              ctx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              MAP_ELEMENT_COLORS.wall.background,
              WALL_WIDTH,
            ));
            this.wallsCoords.push(drawLineToAngle(
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
          case MapDefinitions.DoorSwitcherBlue:
          case MapDefinitions.DoorSwitcherRed:
          case MapDefinitions.DoorSwitcherYellow: {
            const switchersCtx: CanvasRenderingContext2D = this.switchersCanvas.getContext('2d');
            const colorMap: {[key: number]: string} = {
              [MapDefinitions.DoorSwitcherBlue]: PILLAR_COLORS.blue,
              [MapDefinitions.DoorSwitcherRed]: PILLAR_COLORS.red,
              [MapDefinitions.DoorSwitcherYellow]: PILLAR_COLORS.yellow,
            };
            const typesMap: {[key: number]: string} = {
              [MapDefinitions.DoorSwitcherBlue]: 'blue',
              [MapDefinitions.DoorSwitcherRed]: 'red',
              [MapDefinitions.DoorSwitcherYellow]: 'yellow',
            };

            drawDot(
              switchersCtx,
              dotX,
              dotY,
              this.cellSize / 3,
              MAP_ELEMENT_COLORS.switcher.background,
              2,
              MAP_ELEMENT_COLORS.switcher.border,
            );
            drawStrokeRectangle(
              switchersCtx,
              dotX - this.cellSize / 10,
              dotY - this.cellSize / 10,
              this.cellSize / 5,
              this.cellSize / 5,
              2,
              MAP_ELEMENT_COLORS.switcher.innerBorder,
            );
            drawFilledRectangle(
              switchersCtx,
              dotX - this.cellSize / 10,
              dotY - this.cellSize / 10,
              this.cellSize / 5,
              this.cellSize / 5,
              colorMap[objectType],
            );

            this.switchersCoords.push({
              type: typesMap[objectType],
              coords: [dotX, dotY],
            });
            break;
          }
          default: break;
        }
      }
    }
  }

  animateGoal.call(this);

  if (bonus) {
    renderBonus.call(this);
  }

  if (doors) {
    renderDoors.call(this);
  }
}

/**
 * Function renders bonus points on the game board (if applicable)
 */
function renderBonus() {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  this.level.bonus.map((bonus: IBonus) => {
    const bonusX: number = this.cellSize + this.cellSize * (bonus.position[1] + 1) + this.cellSize / 2;
    const bonusY: number = this.cellSize + this.cellSize * (bonus.position[0] + 1) + this.cellSize / 2;

    drawDot(
      ctx,
      bonusX,
      bonusY,
      this.cellSize / 5,
      MAP_ELEMENT_COLORS.bonus.background,
      2,
      MAP_ELEMENT_COLORS.bonus.border,
    );
    drawDot(
      ctx,
      bonusX - 1,
      bonusY - 1,
      this.cellSize / 12,
      MAP_ELEMENT_COLORS.bonus.innerCircle,
      2,
      null,
    );
  });
}

/**
 * Function initially renders all pillars and doors on the game board (if applicable)
 */
function renderDoors() {
  const staticCtx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  for (const door of this.level.doors) {
    const top: number = this.cellSize + this.cellSize * (door.position[0] + 1);
    const left: number = this.cellSize + this.cellSize * (door.position[1] + 1);

    switch (door.orientation) {
      case 'horizontal': {
        drawLineToAngle(
          staticCtx,
          left - this.cellSize - this.cellSize / 2 - 2,
          top + this.cellSize / 2,
          this.cellSize / 2,
          0,
          PILLAR_COLORS[door.type],
          PILLAR_WIDTH,
        );
        drawLineToAngle(
          staticCtx,
          left + this.cellSize * 2 + 2,
          top + this.cellSize / 2,
          this.cellSize / 2,
          0,
          PILLAR_COLORS[door.type],
          PILLAR_WIDTH,
        );
        break;
      }
      case 'vertical': {
        drawLineToAngle(
          staticCtx,
          left + this.cellSize / 2,
          top - this.cellSize - this.cellSize / 2 - 2,
          this.cellSize / 2,
          90,
          PILLAR_COLORS[door.type],
          PILLAR_WIDTH,
        );
        drawLineToAngle(
          staticCtx,
          left + this.cellSize / 2,
          top + this.cellSize * 2 + 2,
          this.cellSize / 2,
          90,
          PILLAR_COLORS[door.type],
          PILLAR_WIDTH,
        );
        break;
      }
      default: break;
    }

    if (!door.opened) {
      renderDoor.call(this, door);
    }
  }
}

/**
 * Function renders a single door (two door leafs)
 *
 * @param door
 * @param doorWidth
 */
function renderDoor(door: IDoor, doorWidth?: number) {
  const doorsCtx: CanvasRenderingContext2D = this.doorsCanvas.getContext('2d');
  const top: number = this.cellSize + this.cellSize * (door.position[0] + 1);
  const left: number = this.cellSize + this.cellSize * (door.position[1] + 1);

  this.doorsCoords = this.doorsCoords.filter((item: IDoorCoords) => item.id !== door.id);

  doorsCtx.clearRect(
    left - this.cellSize,
    top - this.cellSize,
    this.cellSize * 3,
    this.cellSize * 3,
  );

  switch (door.orientation) {
    case 'horizontal': {
      this.doorsCoords.push({
        id: door.id,
        coords: {
          left: drawLineToAngle(
            doorsCtx,
            left - this.cellSize - 2,
            top + this.cellSize / 2,
            doorWidth || this.cellSize * 2 - this.cellSize / 2 - 2,
            0,
            MAP_ELEMENT_COLORS.door.background,
            DOOR_WIDTH,
          ),
          right: drawLineToAngle(
            doorsCtx,
            left + this.cellSize * 2 + 2,
            top + this.cellSize / 2,
            doorWidth || this.cellSize * 2 - this.cellSize / 2 - 2,
            180,
            MAP_ELEMENT_COLORS.door.background,
            DOOR_WIDTH,
          ),
        },
      });
      break;
    }
    case 'vertical': {
      this.doorsCoords.push({
        id: door.id,
        coords: {
          left: drawLineToAngle(
            doorsCtx,
            left + this.cellSize / 2,
            top - this.cellSize - 2,
            doorWidth || this.cellSize * 2 - this.cellSize / 2 - 2,
            90,
            MAP_ELEMENT_COLORS.door.background,
            DOOR_WIDTH,
          ),
          right: drawLineToAngle(
            doorsCtx,
            left + this.cellSize / 2,
            top + this.cellSize * 2 + 2,
            doorWidth || this.cellSize * 2 - this.cellSize / 2 - 2,
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

export {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderDoor,
};
