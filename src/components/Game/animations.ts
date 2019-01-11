import {
  MAP_ELEMENT_COLORS,
  WAND_COLORS,
  WAND_WIDTH,
  DOORS_ANIMATION_SPEED,
  FADE_OUT_ANIMATION_SPEED,
} from '../../constants/game';

import { renderDoor } from './render';
import { drawCircle, drawLineToAngle, drawStar } from '../../utils/drawing';
import { checkAvatarWand, checkEnemyWand } from './actions';

import { IDoor, IEnemy, IEnemyWandsCoords, IWand } from '../../types/game';

/**
 * Function animates the goal (rotating star-like object beneath a regular dot)
 */
function animateGoal() {
  const goalPosX: number = this.cellSize + this.cellSize * (this.goalPosition[1] + 1);
  const goalPosY: number = this.cellSize + this.cellSize * (this.goalPosition[0] + 1);
  let start: number = performance.now();
  let goalAnimationStep = 0;

  const animate = (time: number) => {
    if (this.isGameStopped) {
      return this.animateGoal = requestAnimationFrame(animate);
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

    this.animateGoal = requestAnimationFrame(animate);
  };

  this.animateGoal = requestAnimationFrame(animate);
}

/**
 * Function animates the avatar wand
 */
function animateAvatarWand() {
  const ctx: CanvasRenderingContext2D = this.wandCanvas.getContext('2d');

  const animate = () => {
    if (this.isGameStopped) {
      return this.animateAvatarWand = requestAnimationFrame(animate);
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

    this.avatarWandCoords = drawLineToAngle(
      ctx,
      x,
      y,
      this.cellSize * 2 - this.cellSize / 5 - 1,
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

    this.animateAvatarWand = requestAnimationFrame(animate);
  };

  this.animateAvatarWand = requestAnimationFrame(animate);
}

/**
 * Function animates enemy wands (red, blue and yellow)
 *
 * @param ctx
 * @param enemyId
 */
function animateEnemyWand(ctx: CanvasRenderingContext2D, enemyId: number) {
  const animate = () => {
    if (this.isGameStopped) {
      return this.animateEnemyWand[enemyId] = requestAnimationFrame(animate);
    }

    const enemy: IWand & IEnemy = this.level.enemies.filter((item: IWand & IEnemy) => item.id === enemyId)[0];
    const { position, direction, angle } = enemy;
    const x: number = (position[1] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;
    const y: number = (position[0] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;

    ctx.clearRect(
      x - this.cellSize * 2,
      y - this.cellSize * 2,
      this.cellSize * 4,
      this.cellSize * 4,
    );

    this.enemyWandsCoords = this.enemyWandsCoords.filter((item: IEnemyWandsCoords) => {
      return item.id !== enemyId;
    });

    this.enemyWandsCoords.push({
      id: enemy.id,
      coords: drawLineToAngle(
        ctx,
        x,
        y,
        this.cellSize * 2 - this.cellSize / 5,
        angle,
        WAND_COLORS[enemy.type],
        WAND_WIDTH,
      ),
    });

    enemy.angle += direction * this.difficulty.correction / this.enemiesSpeedCorrection;

    if (enemy.angle < 0) {
      enemy.angle += 360;
    } else if (enemy.angle >= 360) {
      enemy.angle -= 360;
    }

    this.level.enemies = [
      ...this.level.enemies.filter((item: IWand & IEnemy) => item.id !== enemyId),
      enemy,
    ];

    checkEnemyWand.call(this, enemyId);

    this.animateEnemyWand[enemyId] = requestAnimationFrame(animate);
  };

  this.animateEnemyWand[enemyId] = requestAnimationFrame(animate);
}

/**
 * Function animates closing & opening of all doors of the given type
 *
 * @param type
 */
function animateDoors(type: string) {
  this.level.doors.map((door: IDoor) => {
    if (door.type === type) {
      let animate: () => void;
      let frame: number;

      if (door.opened) {
        let doorWidth = 0;

        animate = () => {
          if (this.isGameStopped) {
            return frame = requestAnimationFrame(animate);
          }

          doorWidth += DOORS_ANIMATION_SPEED;

          if (doorWidth >= this.cellSize * 2 - this.cellSize / 2 - 2) {
            cancelAnimationFrame(frame);

            this.isSwitcherActive = false;

            return this.level.doors = [
              ...this.level.doors.filter((item: IDoor) => item.id !== door.id),
              {
                ...door,
                opened: false,
              },
            ];
          }

          renderDoor.call(this, door, doorWidth);

          frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
      } else {
        let doorWidth = this.cellSize * 2 - this.cellSize / 2 - 2;

        animate = () => {
          if (this.isGameStopped) {
            return frame = requestAnimationFrame(animate);
          }

          doorWidth -= DOORS_ANIMATION_SPEED;

          if (doorWidth <= 0) {
            cancelAnimationFrame(frame);

            this.isSwitcherActive = false;

            return this.level.doors = [
              ...this.level.doors.filter((item: IDoor) => item.id !== door.id),
              {
                ...door,
                opened: true,
              },
            ];
          }

          renderDoor.call(this, door, doorWidth);

          frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
      }
    }
  });
}

/**
 * ...
 */
function animateSpikes() {
  const obstaclesCtx: CanvasRenderingContext2D = this.obstaclesCanvas.getContext('2d');

  this.spikesCoords.map((spike: number[]) => {
    const x1: number = spike[0];
    const y1: number = spike[1];
    const x2: number = spike[2];
    const y2: number = spike[3];
    const step = 40;
    let num = 0;

    const redrawSpikeDot = () => {
      obstaclesCtx.clearRect(
        x1 - this.cellSize / 5,
        y1 - this.cellSize / 5,
        x2 + this.cellSize / 5,
        y2 + this.cellSize / 5,
      );

      drawCircle(
        obstaclesCtx,
        x1 + (x2 - x1) / 2,
        y1 + (y2 - y1) / 2,
        this.cellSize / 10,
        MAP_ELEMENT_COLORS.spike.background,
      );
      drawCircle(
        obstaclesCtx,
        x1 + (x2 - x1) / 2 - 1,
        y1 + (y2 - y1) / 2 - 1,
        this.cellSize / 15,
        MAP_ELEMENT_COLORS.bonus.innerCircle,
        2,
        null,
      );
    };

    const animate = () => {
      if (this.isGameStopped) {
        return requestAnimationFrame(animate);
      }

      switch (num) {
        case 0: {
          redrawSpikeDot();
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y1,
            this.cellSize / 15,
            225,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y2,
            this.cellSize / 30,
            45,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y1,
            this.cellSize / 40,
            315,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y2,
            this.cellSize / 40,
            135,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          break;
        }
        case step: {
          redrawSpikeDot();
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y1,
            this.cellSize / 30,
            225,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y2,
            this.cellSize / 15,
            45,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y1,
            this.cellSize / 40,
            315,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y2,
            this.cellSize / 40,
            135,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          break;
        }
        case step * 2: {
          redrawSpikeDot();
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y1,
            this.cellSize / 40,
            225,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y2,
            this.cellSize / 40,
            45,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y1,
            this.cellSize / 15,
            315,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y2,
            this.cellSize / 30,
            135,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          break;
        }
        case step * 3: {
          redrawSpikeDot();
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y1,
            this.cellSize / 40,
            225,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y2,
            this.cellSize / 40,
            45,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x2,
            y1,
            this.cellSize / 30,
            315,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          drawLineToAngle(
            obstaclesCtx,
            x1,
            y2,
            this.cellSize / 15,
            135,
            MAP_ELEMENT_COLORS.spike.point,
            1,
          );
          break;
        }
        default: break;
      }

      num += 1;

      if (num === step * 4) {
        num = 0;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });
}

/**
 * Function eliminates a map element from the game board with fade out effect
 *
 * @param currDotX
 * @param currDotY
 */
function animateMapElementElimination(currDotX: number, currDotY: number) {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');
  const top: number = this.cellSize + this.cellSize * (currDotY + 1);
  const left: number = this.cellSize + this.cellSize * (currDotX + 1);
  const dotX: number = left + this.cellSize / 2;
  const dotY: number = top + this.cellSize / 2;
  let frame: number;
  let alpha = 0;

  const animate = () => {
    if (this.isGameStopped) {
      return frame = requestAnimationFrame(animate);
    }

    if (alpha >= 1) {
      ctx.clearRect(left, top, this.cellSize, this.cellSize);

      return cancelAnimationFrame(frame);
    }

    alpha += FADE_OUT_ANIMATION_SPEED;

    ctx.globalAlpha = alpha;

    drawCircle(
      ctx,
      dotX,
      dotY,
      this.cellSize / 5,
      MAP_ELEMENT_COLORS.board.background,
    );

    frame = requestAnimationFrame(animate);
  };

  frame = requestAnimationFrame(animate);
}

export {
  animateGoal,
  animateAvatarWand,
  animateEnemyWand,
  animateDoors,
  animateSpikes,
  animateMapElementElimination,
};
