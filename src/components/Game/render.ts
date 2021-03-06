import {
  ELEMENTS_COLORS,
  WALL_WIDTH,
  DOOR_WIDTH,
  PILLAR_WIDTH,
  BONUS_SIZE_LABEL_FONT,
  GridDimensions,
  MapDefinitions,
} from '../../constants/game';

import {
  drawCircle,
  drawSector,
  drawArc,
  drawLineToAngle,
  drawRectangle,
} from '../../utils/drawing';

import {
  animateAvatarWand,
  animateEnemyWand,
  animateGoal,
  animateSpikes,
} from './animations';

import { secondsToString } from './utils';

import {
  IBonus,
  IDoor,
  IDoorCoords,
  IEnemy,
  IHyperdot,
  IWand,
} from '../../types/game';

import { DrawOptions } from '../../types/utils';

/**
 * Function creates game window element, game panel and all needed canvases
 */
function renderGameWindow(): void {
  const canvasWidth: number = this.cellSize * (GridDimensions.Width + 2);
  const canvasHeight: number = this.cellSize * (GridDimensions.Height + 2);
  const appRoot: HTMLElement = document.getElementById('root');
  const gameWindow: HTMLElement = document.createElement('div');
  const boardPanel: HTMLElement = document.createElement('div');
  const boardGrid: HTMLElement = document.createElement('div');
  const pauseLabel: HTMLElement = document.createElement('div');

  this.boardPanelElements = {
    menuButton: document.createElement('button'),
    pauseButton: document.createElement('button'),
    level: document.createElement('div'),
    time: document.createElement('div'),
    lives: document.createElement('div'),
    score: document.createElement('div'),
  };

  this.staticCanvas = document.createElement('canvas');
  this.goalCanvas = document.createElement('canvas');
  this.wandCanvas = document.createElement('canvas');
  this.doorsCanvas = document.createElement('canvas');
  this.switchersCanvas = document.createElement('canvas');
  this.obstaclesCanvas = document.createElement('canvas');
  this.labelsCanvas = document.createElement('canvas');

  gameWindow.className = 'gameWindow';
  boardPanel.className = 'boardPanel';
  boardGrid.className = 'boardGrid';
  pauseLabel.id = 'pause';
  pauseLabel.className = '-pause';
  pauseLabel.innerText = 'Paused';
  this.boardPanelElements.menuButton.className = '-menu-button';
  this.boardPanelElements.pauseButton.className = '-pause-button';
  this.boardPanelElements.level.className = '-level';
  this.boardPanelElements.time.className = '-time';
  this.boardPanelElements.lives.className = '-lives';
  this.boardPanelElements.score.className = '-score';
  this.staticCanvas.className = '-static-canvas';
  this.goalCanvas.className = '-goal-canvas';
  this.wandCanvas.className = '-wand-canvas';
  this.doorsCanvas.className = '-doors-canvas';
  this.switchersCanvas.className = '-switchers-canvas';
  this.obstaclesCanvas.className = '-obstacles-canvas';
  this.labelsCanvas.className = '-labels-canvas';

  this.staticCanvas.width = canvasWidth;
  this.staticCanvas.height = canvasHeight;
  this.goalCanvas.width = canvasWidth;
  this.goalCanvas.height = canvasHeight;
  this.wandCanvas.width = canvasWidth;
  this.wandCanvas.height = canvasHeight;
  this.doorsCanvas.width = canvasWidth;
  this.doorsCanvas.height = canvasHeight;
  this.switchersCanvas.width = canvasWidth;
  this.switchersCanvas.height = canvasHeight;
  this.obstaclesCanvas.width = canvasWidth;
  this.obstaclesCanvas.height = canvasHeight;
  this.labelsCanvas.width = canvasWidth;
  this.labelsCanvas.height = canvasHeight;

  this.boardPanelElements.menuButton.innerText = 'Menu';
  this.boardPanelElements.pauseButton.innerText = 'Pause';

  if (this.difficulty.id !== 1) {
    this.boardPanelElements.time.style.visibility = 'visible';
  }

  appRoot.innerHTML = '';

  appRoot.appendChild(gameWindow);
  gameWindow.appendChild(boardPanel);
  boardPanel.appendChild(this.boardPanelElements.menuButton);
  boardPanel.appendChild(this.boardPanelElements.pauseButton);
  boardPanel.appendChild(this.boardPanelElements.level);
  boardPanel.appendChild(this.boardPanelElements.time);
  boardPanel.appendChild(this.boardPanelElements.lives);
  boardPanel.appendChild(this.boardPanelElements.score);
  gameWindow.appendChild(boardGrid);
  boardGrid.appendChild(this.staticCanvas);
  boardGrid.appendChild(this.goalCanvas);
  boardGrid.appendChild(this.wandCanvas);
  boardGrid.appendChild(this.obstaclesCanvas);
  boardGrid.appendChild(this.labelsCanvas);

  if (this.level.doors) {
    boardGrid.appendChild(this.doorsCanvas);
    boardGrid.appendChild(this.switchersCanvas);
  }

  if (this.level.wand) {
    animateAvatarWand.call(this);
  }

  if (this.level.enemies) {
    for (let i = 0; i < this.level.enemies.length; i += 1) {
      const enemy: IWand & IEnemy = this.level.enemies[i];
      const enemyCanvas: HTMLCanvasElement = document.createElement('canvas');

      enemyCanvas.className = '-enemy-canvas';
      enemyCanvas.width = canvasWidth;
      enemyCanvas.height = canvasHeight;

      boardGrid.appendChild(enemyCanvas);

      animateEnemyWand.call(this, enemyCanvas.getContext('2d'), enemy.id);
    }
  }

  boardGrid.appendChild(pauseLabel);
}

/**
 * Function renders game board as described in `constants/levels`
 * for the current level, including dots, walls, doors, enemies, obstacles,
 * and the goal
 */
function renderLevelMap(): void {
  const { map, bonus, doors, hyperdots } = this.level;

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      const objectType: number = map[y][x];

      if (objectType !== undefined && objectType !== MapDefinitions.Empty) {
        const staticCtx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');
        const obstaclesCtx: CanvasRenderingContext2D = this.obstaclesCanvas.getContext('2d');
        const top: number = this.cellSize + this.cellSize * y;
        const left: number = this.cellSize + this.cellSize * x;
        const dotX: number = left + this.cellSize / 2;
        const dotY: number = top + this.cellSize / 2;

        const drawWallObject: Omit<DrawOptions, 'fillColor'> = {
          edgingColor: ELEMENTS_COLORS.wall.background,
          edgingWidth: WALL_WIDTH,
        };

        switch (objectType) {
          // ----------------------------------------------------------------
          //                            DOTS
          // ----------------------------------------------------------------
          case MapDefinitions.DotRegular: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.dotRegular.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.DotRed: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.dotRed.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotRed.border,
              },
            );
            break;
          }
          case MapDefinitions.DotBlue: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.dotBlue.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotBlue.border,
              },
            );
            break;
          }
          case MapDefinitions.DotYellow: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.dotYellow.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotYellow.border,
              },
            );
            break;
          }
          case MapDefinitions.DotRedBlue: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI,
                endAngle: 0,
                fillColor: ELEMENTS_COLORS.dotRed.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI,
                fillColor: ELEMENTS_COLORS.dotBlue.background,
              },
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                edgingWidth: 2,
                fillColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.DotRedYellow: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI,
                endAngle: 0,
                fillColor: ELEMENTS_COLORS.dotRed.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI,
                fillColor: ELEMENTS_COLORS.dotYellow.background,
              },
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                edgingWidth: 2,
                fillColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.DotBlueYellow: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI,
                endAngle: 0,
                fillColor: ELEMENTS_COLORS.dotBlue.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI,
                fillColor: ELEMENTS_COLORS.dotYellow.background,
              },
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                edgingWidth: 2,
                fillColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.DotRedBlueYellow: {
            drawSector(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI * 2 / 3,
                fillColor: ELEMENTS_COLORS.dotRed.background,
              },
            );
            drawSector(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 2 / 3,
                endAngle: Math.PI * 4 / 3,
                fillColor: ELEMENTS_COLORS.dotBlue.background,
              },
            );
            drawSector(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 4 / 3,
                endAngle: 0,
                fillColor: ELEMENTS_COLORS.dotYellow.background,
              },
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                edgingWidth: 2,
                fillColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.Slowdown: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.board.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 0.5 - Math.PI * 2 / 3,
                endAngle: Math.PI * 0.5,
                fillColor: ELEMENTS_COLORS.dotRegular.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 0.5,
                endAngle: Math.PI * 0.5 + Math.PI * 2 / 3,
                fillColor: ELEMENTS_COLORS.dotRegular.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 0.5 + Math.PI * 2 / 3,
                endAngle: Math.PI * 0.5 + Math.PI * 4 / 3,
                fillColor: ELEMENTS_COLORS.dotRegular.background,
              },
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                edgingWidth: 2,
                fillColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.WayStation: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.dotRegular.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotRegular.border,
              },
            );
            drawLineToAngle(
              staticCtx,
              dotX - this.cellSize / 5,
              dotY,
              this.cellSize * 2 / 5,
              0,
              {
                edgingColor: ELEMENTS_COLORS.dotRegular.border,
                edgingWidth: 2,
              },
            );
            drawLineToAngle(
              staticCtx,
              dotX,
              dotY - this.cellSize / 5,
              this.cellSize * 2 / 5,
              90,
              {
                edgingColor: ELEMENTS_COLORS.dotRegular.border,
                edgingWidth: 2,
              },
            );
            break;
          }
          // ----------------------------------------------------------------
          //                            RINGS
          // ----------------------------------------------------------------
          case MapDefinitions.RingRegular: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.ringRegular.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.ringRegular.border,
              },
            );
            break;
          }
          case MapDefinitions.RingRed: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.ringRed.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.ringRed.border,
              },
            );
            break;
          }
          case MapDefinitions.RingBlue: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.ringBlue.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.ringBlue.border,
              },
            );
            break;
          }
          case MapDefinitions.RingYellow: {
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                fillColor: ELEMENTS_COLORS.ringYellow.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.ringYellow.border,
              },
            );
            break;
          }
          case MapDefinitions.RingRedBlue: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI,
                endAngle: 0,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotRed.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotBlue.background,
              },
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5 - 2,
              {
                fillColor: ELEMENTS_COLORS.ringRegular.background,
              },
            );
            break;
          }
          case MapDefinitions.RingRedYellow: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI,
                endAngle: 0,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotRed.background,
              },
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotYellow.background,
              }
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5 - 2,
              {
                fillColor: ELEMENTS_COLORS.ringRegular.background,
              },
            );
            break;
          }
          case MapDefinitions.RingBlueYellow: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI,
                endAngle: 0,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotBlue.background,
              }
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotYellow.background,
              }
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5 - 2,
              {
                fillColor: ELEMENTS_COLORS.ringRegular.background,
              },
            );
            break;
          }
          case MapDefinitions.RingRedBlueYellow: {
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: 0,
                endAngle: Math.PI * 2 / 3,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotRed.background,
              }
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 2 / 3,
                endAngle: Math.PI * 4 / 3,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotBlue.background,
              }
            );
            drawArc(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5,
              {
                startAngle: Math.PI * 4 / 3,
                endAngle: 0,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.dotYellow.background,
              }
            );
            drawCircle(
              staticCtx,
              dotX,
              dotY,
              this.cellSize / 5 - 2,
              {
                fillColor: ELEMENTS_COLORS.ringRegular.background,
              },
            );
            break;
          }
          // ----------------------------------------------------------------
          //                            WALLS
          // ----------------------------------------------------------------
          case MapDefinitions.WallHorizontal: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallVertical: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalHalfLeft: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + this.cellSize / 4,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalHalfRight: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 4,
              top + this.cellSize / 2,
              this.cellSize / 2 + this.cellSize / 4,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallVerticalHalfBottom: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top + this.cellSize / 2 - this.cellSize / 4,
              this.cellSize / 2 + this.cellSize / 4,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallVerticalHalfTop: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2 + this.cellSize / 4,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallTopLeftCorner: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2 - WALL_WIDTH / 2,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallTopRightCorner: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallBottomRightCorner: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallBottomLeftCorner: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2 - WALL_WIDTH / 2,
              top + this.cellSize / 2,
              this.cellSize / 2 + WALL_WIDTH / 2,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalToBottom: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallHorizontalToTop: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize / 2,
              90,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallVerticalToRight: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top + this.cellSize / 2,
              this.cellSize / 2,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallVerticalToLeft: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize / 2,
              0,
              drawWallObject,
            ));
            break;
          }
          case MapDefinitions.WallX: {
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left,
              top + this.cellSize / 2,
              this.cellSize,
              0,
              drawWallObject,
            ));
            this.wallsCoords.push(drawLineToAngle(
              staticCtx,
              left + this.cellSize / 2,
              top,
              this.cellSize,
              90,
              drawWallObject,
            ));
            break;
          }
          // ----------------------------------------------------------------
          //                         DOOR SWITCHERS
          // ----------------------------------------------------------------
          case MapDefinitions.DoorSwitcherBlue:
          case MapDefinitions.DoorSwitcherRed:
          case MapDefinitions.DoorSwitcherYellow: {
            const switchersCtx: CanvasRenderingContext2D = this.switchersCanvas.getContext('2d');
            const colorMap: {[key: number]: string} = {
              [MapDefinitions.DoorSwitcherBlue]: ELEMENTS_COLORS.pillars.blue,
              [MapDefinitions.DoorSwitcherRed]: ELEMENTS_COLORS.pillars.red,
              [MapDefinitions.DoorSwitcherYellow]: ELEMENTS_COLORS.pillars.yellow,
            };
            const typesMap: {[key: number]: string} = {
              [MapDefinitions.DoorSwitcherBlue]: 'blue',
              [MapDefinitions.DoorSwitcherRed]: 'red',
              [MapDefinitions.DoorSwitcherYellow]: 'yellow',
            };

            drawCircle(
              switchersCtx,
              dotX,
              dotY,
              this.cellSize / 3,
              {
                fillColor: ELEMENTS_COLORS.switcher.background,
                edgingWidth: 2,
                edgingColor: ELEMENTS_COLORS.switcher.border,
              },
            );
            drawRectangle(
              switchersCtx,
              dotX - this.cellSize / 10,
              dotY - this.cellSize / 10,
              this.cellSize / 5,
              this.cellSize / 5,
              {
                fillColor: colorMap[objectType],
                edgingWidth: 1,
                edgingColor: ELEMENTS_COLORS.switcher.innerBorder,
              },
            );

            this.switchersCoords.push({
              type: typesMap[objectType],
              coords: [dotX, dotY],
            });
            break;
          }
          // ----------------------------------------------------------------
          //                            SPIKES
          // ----------------------------------------------------------------
          case MapDefinitions.SpikeRegular: {
            drawCircle(
              obstaclesCtx,
              dotX,
              dotY,
              this.cellSize / 10,
              {
                fillColor: ELEMENTS_COLORS.spike.background,
              },
            );
            drawCircle(
              obstaclesCtx,
              dotX - 1,
              dotY - 1,
              this.cellSize / 15,
              {
                fillColor: ELEMENTS_COLORS.bonus.innerCircle,
                edgingWidth: 2,
              },
            );

            this.spikesCoords.push([
              dotX - this.cellSize / 10,
              dotY - this.cellSize / 10,
              dotX - this.cellSize / 10 + this.cellSize / 5,
              dotY - this.cellSize / 10 + this.cellSize / 5,
            ]);
            break;
          }
          case MapDefinitions.SpikeShiftedXRight: {
            drawCircle(
              obstaclesCtx,
              dotX + this.cellSize / 1.5,
              dotY,
              this.cellSize / 10,
              {
                fillColor: ELEMENTS_COLORS.spike.background,
              },

            );
            drawCircle(
              obstaclesCtx,
              dotX + this.cellSize / 1.5 - 1,
              dotY - 1,
              this.cellSize / 15,
              {
                fillColor: ELEMENTS_COLORS.bonus.innerCircle,
              },
            );

            this.spikesCoords.push([
              dotX + this.cellSize / 1.5 - this.cellSize / 10,
              dotY - this.cellSize / 10,
              dotX + this.cellSize / 1.5 - this.cellSize / 10 + this.cellSize / 5,
              dotY - this.cellSize / 10 + this.cellSize / 5,
            ]);
            break;
          }
          case MapDefinitions.SpikeShiftedYBottom: {
            drawCircle(
              obstaclesCtx,
              dotX,
              dotY + this.cellSize / 1.5,
              this.cellSize / 10,
              {
                fillColor: ELEMENTS_COLORS.spike.background,
              },
            );
            drawCircle(
              obstaclesCtx,
              dotX - 1,
              dotY + this.cellSize / 1.5 - 1,
              this.cellSize / 15,
              {
                fillColor: ELEMENTS_COLORS.bonus.innerCircle,
              },
            );

            this.spikesCoords.push([
              dotX - this.cellSize / 10,
              dotY + this.cellSize / 1.5 - this.cellSize / 10,
              dotX - this.cellSize / 10 + this.cellSize / 5,
              dotY + this.cellSize / 1.5 - this.cellSize / 10 + this.cellSize / 5,
            ]);
            break;
          }
          case MapDefinitions.SpikeShiftedXLeft: {
            drawCircle(
              obstaclesCtx,
              dotX - this.cellSize / 1.5,
              dotY,
              this.cellSize / 10,
              {
                fillColor: ELEMENTS_COLORS.spike.background,
              },
            );
            drawCircle(
              obstaclesCtx,
              dotX - this.cellSize / 1.5 - 1,
              dotY - 1,
              this.cellSize / 15,
              {
                fillColor: ELEMENTS_COLORS.bonus.innerCircle,
              },
            );

            this.spikesCoords.push([
              dotX - this.cellSize / 1.5 - this.cellSize / 10,
              dotY - this.cellSize / 10,
              dotX - this.cellSize / 1.5 - this.cellSize / 10 + this.cellSize / 5,
              dotY - this.cellSize / 10 + this.cellSize / 5,
            ]);
            break;
          }
          case MapDefinitions.SpikeShiftedYTop: {
            drawCircle(
              obstaclesCtx,
              dotX,
              dotY - this.cellSize / 1.5,
              this.cellSize / 10,
              {
                fillColor: ELEMENTS_COLORS.spike.background,
              },
            );
            drawCircle(
              obstaclesCtx,
              dotX - 1,
              dotY - this.cellSize / 1.5 - 1,
              this.cellSize / 15,
              {
                fillColor: ELEMENTS_COLORS.bonus.innerCircle,
              },
            );

            this.spikesCoords.push([
              dotX - this.cellSize / 10,
              dotY - this.cellSize / 1.5 - this.cellSize / 10,
              dotX - this.cellSize / 10 + this.cellSize / 5,
              dotY - this.cellSize / 1.5 - this.cellSize / 10 + this.cellSize / 5,
            ]);
            break;
          }
          // ----------------------------------------------------------------
          //                            OTHER
          // ----------------------------------------------------------------
          case MapDefinitions.Hourglass: {
            obstaclesCtx.font = BONUS_SIZE_LABEL_FONT;
            obstaclesCtx.fillStyle = ELEMENTS_COLORS.label.background;
            obstaclesCtx.textAlign = 'center';
            obstaclesCtx.textBaseline = 'middle';

            obstaclesCtx.fillText('⌛', dotX, dotY);

            this.hourglassesCoords.push({
              id: this.hourglassesCoords.length + 1,
              coords: [y - 1, x - 1],
              borders: [
                dotX - this.cellSize / 4,
                dotY - this.cellSize / 4,
                dotX + this.cellSize / 4,
                dotY + this.cellSize / 4,
              ],
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

  if (hyperdots) {
    renderHyperdots.call(this);
  }

  if (this.spikesCoords.length) {
    animateSpikes.call(this);
  }
}

/**
 * Function renders bonus points on the game board (if applicable)
 */
function renderBonus(): void {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  this.level.bonus.map((bonus: IBonus): void => {
    const bonusX: number = this.cellSize + this.cellSize * (bonus.position[1] + 1) + this.cellSize / 2;
    const bonusY: number = this.cellSize + this.cellSize * (bonus.position[0] + 1) + this.cellSize / 2;

    drawCircle(
      ctx,
      bonusX,
      bonusY,
      this.cellSize / 5,
      {
        fillColor: ELEMENTS_COLORS.bonus.background,
        edgingWidth: 2,
        edgingColor: ELEMENTS_COLORS.bonus.border,
      },
    );
    drawCircle(
      ctx,
      bonusX - 1,
      bonusY - 1,
      this.cellSize / 12,
      {
        fillColor: ELEMENTS_COLORS.bonus.innerCircle,
        edgingWidth: 2,
      },
    );
  });

  if (this.levelExtra.bonus) {
    this.levelExtra.bonus.map((bonusId: number): void => {
      this.level.bonus = this.level.bonus.filter((item: IBonus): boolean => item.id !== bonusId);
    });
  }
}

/**
 * Function initially renders all pillars and doors on the game board (if applicable)
 */
function renderDoors(): void {
  const staticCtx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  for (const door of this.level.doors) {
    const top: number = this.cellSize + this.cellSize * (door.position[0] + 1);
    const left: number = this.cellSize + this.cellSize * (door.position[1] + 1);

    const drawPillarObject: Omit<DrawOptions, 'fillColor'> = {
      edgingColor: ELEMENTS_COLORS.pillars[door.type],
      edgingWidth: PILLAR_WIDTH,
    };

    switch (door.orientation) {
      case 'horizontal': {
        drawLineToAngle(
          staticCtx,
          left - this.cellSize - this.cellSize / 2 - 2,
          top + this.cellSize / 2,
          this.cellSize / 2,
          0,
          drawPillarObject,
        );
        drawLineToAngle(
          staticCtx,
          left + this.cellSize * 2 + 2,
          top + this.cellSize / 2,
          this.cellSize / 2,
          0,
          drawPillarObject,
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
          drawPillarObject,
        );
        drawLineToAngle(
          staticCtx,
          left + this.cellSize / 2,
          top + this.cellSize * 2 + 2,
          this.cellSize / 2,
          90,
          drawPillarObject,
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
function renderDoor(door: IDoor, doorWidth?: number): void {
  const doorsCtx: CanvasRenderingContext2D = this.doorsCanvas.getContext('2d');
  const top: number = this.cellSize + this.cellSize * (door.position[0] + 1);
  const left: number = this.cellSize + this.cellSize * (door.position[1] + 1);

  const drawDoorObject: Omit<DrawOptions, 'fillColor'> = {
    edgingColor: ELEMENTS_COLORS.door.background,
    edgingWidth: DOOR_WIDTH,
  };

  this.doorsCoords = this.doorsCoords.filter((item: IDoorCoords): boolean => item.id !== door.id);

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
            drawDoorObject,
          ),
          right: drawLineToAngle(
            doorsCtx,
            left + this.cellSize * 2 + 2,
            top + this.cellSize / 2,
            doorWidth || this.cellSize * 2 - this.cellSize / 2 - 2,
            180,
            drawDoorObject,
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
            drawDoorObject,
          ),
          right: drawLineToAngle(
            doorsCtx,
            left + this.cellSize / 2,
            top + this.cellSize * 2 + 2,
            doorWidth || this.cellSize * 2 - this.cellSize / 2 - 2,
            270,
            drawDoorObject,
          ),
        },
      });
      break;
    }
    default: break;
  }
}

/**
 * Function renders all hyperdots on the game board (if applicable);
 * each of five hyperdots' types has its own distinguishing symbol
 */
function renderHyperdots(): void {
  const staticCtx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  this.level.hyperdots.map((hyperdot: IHyperdot) => {
    const top: number = this.cellSize + this.cellSize * (hyperdot.position[0] + 1);
    const left: number = this.cellSize + this.cellSize * (hyperdot.position[1] + 1);
    const dotX: number = left + this.cellSize / 2;
    const dotY: number = top + this.cellSize / 2;

    drawCircle(
      staticCtx,
      dotX,
      dotY,
      this.cellSize / 5,
      {
        fillColor: ELEMENTS_COLORS.hyperdot.background,
        edgingWidth: 2,
        edgingColor: ELEMENTS_COLORS.hyperdot.border,
      },
    );

    switch (hyperdot.type) {
      case 1: {
        drawCircle(
          staticCtx,
          dotX - this.cellSize / 20,
          dotY + this.cellSize / 20,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        drawCircle(
          staticCtx,
          dotX + this.cellSize / 20,
          dotY - this.cellSize / 20,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        break;
      }
      case 2: {
        drawCircle(
          staticCtx,
          dotX - this.cellSize / 20 - 1,
          dotY,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        drawCircle(
          staticCtx,
          dotX + this.cellSize / 20 + 1,
          dotY,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        break;
      }
      case 3: {
        drawCircle(
          staticCtx,
          dotX - this.cellSize / 20,
          dotY - this.cellSize / 20,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        drawCircle(
          staticCtx,
          dotX + this.cellSize / 20,
          dotY + this.cellSize / 20,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        break;
      }
      case 4: {
        drawCircle(
          staticCtx,
          dotX,
          dotY - this.cellSize / 20 - 1,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        drawCircle(
          staticCtx,
          dotX,
          dotY + this.cellSize / 20 + 1,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        break;
      }
      case 5: {
        drawCircle(
          staticCtx,
          dotX - this.cellSize / 20 - 2,
          dotY,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        drawCircle(
          staticCtx,
          dotX,
          dotY,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        drawCircle(
          staticCtx,
          dotX + this.cellSize / 20 + 2,
          dotY,
          1,
          {
            fillColor: ELEMENTS_COLORS.hyperdot.dotsActive,
          },
        );
        break;
      }
      default: break;
    }
  });
}

/**
 * Functions renders level number and its title as well as game counters (lives, score)
 * in the game panel
 */
function renderPanelCounters(): void {
  this.boardPanelElements.level.innerHTML = (`
    <div class="-id">${this.level.id}:</div>
    <div class="-title">${this.level.title}</div>
  `);

  if (this.difficulty.id !== 1) {
    this.boardPanelElements.time.innerText = secondsToString(this.timeAvailable);
  }

  this.boardPanelElements.lives.innerText = this.lives;
  this.boardPanelElements.score.innerText = this.score;
}

export {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderDoor,
};
