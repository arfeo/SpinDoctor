import { Draw, DrawLineToAngleOptions } from 'gpt-ts';

import {
  ELEMENTS_COLORS,
  WAND_WIDTH,
  DOORS_ANIMATION_SPEED,
  FADE_OUT_ANIMATION_SPEED,
  BONUS_SIZE_LABEL_FONT,
} from '../../constants/game';

import { renderDoor } from './render';
import { checkAvatarWand, checkEnemyWand, checkOnLevelFail } from './actions';
import { secondsToString } from './utils';

import { IBonus, IDoor, IEnemy, IEnemyWandsCoords, IWand } from '../../types/game';

/**
 * Function animates the goal (rotating star-like object beneath a dot)
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

      const ctx: CanvasRenderingContext2D = (
        document.getElementById('goalCanvas') as HTMLCanvasElement
      ).getContext('2d');

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

      ctx.clearRect(
        goalPosX,
        goalPosY,
        this.cellSize,
        this.cellSize,
      );

      if (goalAnimationStep !== 0) {
        ctx.translate(goalX, goalY);
        ctx.rotate(Math.PI / 360 * 30 * goalAnimationStep);
        ctx.translate(-goalX, -goalY);
      }

      Draw.star(
        'goalCanvas',
        goalX,
        goalY,
        4,
        this.cellSize / goalOuterSize(),
        this.cellSize / (goalOuterSize() * 2),
        {
          fillColor: ELEMENTS_COLORS.goal.background,
          edgingWidth: 4,
          edgingColor: ELEMENTS_COLORS.goal.border,
        },
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
  const ctx: CanvasRenderingContext2D = (
    document.getElementById('wandCanvas') as HTMLCanvasElement
  ).getContext('2d');

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

    this.avatarWandCoords = Draw.lineToAngle(
      'wandCanvas',
      x,
      y,
      this.cellSize * 2 - this.cellSize / 5 - 1,
      angle,
      {
        lineColor: ELEMENTS_COLORS.wands.avatar,
        lineWidth: WAND_WIDTH,
      },
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
 * @param canvasId
 * @param enemyId
 */
function animateEnemyWand(canvasId: string, enemyId: number) {
  const ctx: CanvasRenderingContext2D = (
    document.getElementById(canvasId) as HTMLCanvasElement
  ).getContext('2d');

  const animate = () => {
    if (this.isGameStopped) {
      return this.animateEnemyWand[enemyId] = requestAnimationFrame(animate);
    }

    const enemy: IWand & IEnemy = this.level.enemies.find((item: IWand & IEnemy) => item.id === enemyId);
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
      coords: Draw.lineToAngle(
        canvasId,
        x,
        y,
        this.cellSize * 2 - this.cellSize / 5,
        angle,
        {
          lineColor: ELEMENTS_COLORS.wands[enemy.type],
          lineWidth: WAND_WIDTH,
        },
      ),
    });

    const speedCorrection = this.difficulty.correction / (enemy.speed || 1) / this.enemiesSpeedCorrection;

    enemy.angle += direction * speedCorrection;

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
 * Function animates all spikes on the game board in batch
 */
function animateSpikes() {
  const ctx: CanvasRenderingContext2D = (
    document.getElementById('obstaclesCanvas') as HTMLCanvasElement
  ).getContext('2d');

  this.spikesCoords.map((spike: number[]) => {
    const x1: number = spike[0];
    const y1: number = spike[1];
    const x2: number = spike[2];
    const y2: number = spike[3];
    const step = 40;
    let num = 0;

    const redrawSpikeDot = () => {
      ctx.clearRect(
        x1 - this.cellSize / 5,
        y1 - this.cellSize / 5,
        x2 + this.cellSize / 5,
        y2 + this.cellSize / 5,
      );

      Draw.circle(
        'obstaclesCanvas',
        x1 + (x2 - x1) / 2,
        y1 + (y2 - y1) / 2,
        this.cellSize / 10,
        {
          fillColor: ELEMENTS_COLORS.spike.background,
        },
      );
      Draw.circle(
        'obstaclesCanvas',
        x1 + (x2 - x1) / 2 - 1,
        y1 + (y2 - y1) / 2 - 1,
        this.cellSize / 15,
        {
          fillColor: ELEMENTS_COLORS.bonus.innerCircle,
          edgingWidth: 2,
        },
      );
    };

    const animate = () => {
      if (this.isGameStopped) {
        return requestAnimationFrame(animate);
      }

      const spikeOptions: DrawLineToAngleOptions = {
        lineColor: ELEMENTS_COLORS.spike.point,
        lineWidth: 1,
      };

      switch (num) {
        case 0: {
          redrawSpikeDot();
          Draw.lineToAngle('obstaclesCanvas', x1, y1, this.cellSize / 15, 225, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y2, this.cellSize / 30, 45, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y1, this.cellSize / 40, 315, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x1, y2, this.cellSize / 40, 135, spikeOptions);
          break;
        }
        case step: {
          redrawSpikeDot();
          Draw.lineToAngle('obstaclesCanvas', x1, y1, this.cellSize / 30, 225, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y2, this.cellSize / 15, 45, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y1, this.cellSize / 40, 315, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x1, y2, this.cellSize / 40, 135, spikeOptions);
          break;
        }
        case step * 2: {
          redrawSpikeDot();
          Draw.lineToAngle('obstaclesCanvas', x1, y1, this.cellSize / 40, 225, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y2, this.cellSize / 40, 45, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y1, this.cellSize / 15, 315, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x1, y2, this.cellSize / 30, 135, spikeOptions);
          break;
        }
        case step * 3: {
          redrawSpikeDot();
          Draw.lineToAngle('obstaclesCanvas', x1, y1, this.cellSize / 40, 225, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y2, this.cellSize / 40, 45, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x2, y1, this.cellSize / 30, 315, spikeOptions);
          Draw.lineToAngle('obstaclesCanvas', x1, y2, this.cellSize / 15, 135, spikeOptions);
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
 * Function animates the avatar wand's death: it slowly fades out, leaving the game board
 */
function animateAvatarWandDeath(): Promise<void> {
  return new Promise((resolve) => {
    const ctx: CanvasRenderingContext2D = (
      document.getElementById('wandCanvas') as HTMLCanvasElement
    ).getContext('2d');

    let alpha = 1;

    const animate = () => {
      if (alpha < 0) {
        return resolve();
      }

      const { position, angle } = this.level.wand;
      const x: number = (position[1] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;
      const y: number = (position[0] + 1) * this.cellSize + this.cellSize + this.cellSize / 2;

      ctx.clearRect(
        x - this.cellSize * 2,
        y - this.cellSize * 2,
        this.cellSize * 4,
        this.cellSize * 4,
      );

      ctx.globalAlpha = alpha;

      this.avatarWandCoords = Draw.lineToAngle(
        'wandCanvas',
        x,
        y,
        this.cellSize * 2 - this.cellSize / 5 - 1,
        angle,
        {
          lineColor: ELEMENTS_COLORS.wands.avatar,
          lineWidth: WAND_WIDTH,
        },
      );

      alpha -= FADE_OUT_ANIMATION_SPEED / 4;

      this.animateAvatarWand = requestAnimationFrame(animate);
    };

    this.animateAvatarWand = requestAnimationFrame(animate);
  });
}

/**
 * Function eliminates an element from the specified canvas context with fade out effect
 *
 * @param canvasId
 * @param currDotX
 * @param currDotY
 */
function animateMapElementElimination(canvasId: string, currDotX: number, currDotY: number) {
  const ctx: CanvasRenderingContext2D = (
    document.getElementById(canvasId) as HTMLCanvasElement
  ).getContext('2d');

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

    Draw.circle(
      canvasId,
      dotX,
      dotY,
      this.cellSize / 5,
      {
        fillColor: ELEMENTS_COLORS.board.background,
      },
    );

    frame = requestAnimationFrame(animate);
  };

  frame = requestAnimationFrame(animate);
}

/**
 * Function animates the game time ticker in the game panel
 */
function animateTimeTicker() {
  let start: number = performance.now();

  const animate = (time: number) => {
    if (this.isGameStopped) {
      return this.animateTimeTicker = requestAnimationFrame(animate);
    }

    if (time - start > 1000) {
      this.timeAvailable -= 1;

      this.boardPanelElements.time.innerText = secondsToString(this.timeAvailable);

      if (this.timeAvailable === 0) {
        return checkOnLevelFail.call(this);
      }

      start = time;
    }

    this.animateTimeTicker = requestAnimationFrame(animate);
  };

  this.animateTimeTicker = requestAnimationFrame(animate);
}

/**
 * Function animates bonus size label, fading in and out whilst floating slightly above the bonus dot
 *
 * @param bonus
 */
function animateBonusSize(bonus: IBonus) {
  const ctx: CanvasRenderingContext2D = (
    document.getElementById('labelsCanvas') as HTMLCanvasElement
  ).getContext('2d');

  const x: number = this.cellSize + this.cellSize * (bonus.position[1] + 1) + this.cellSize / 2;
  const y: number = this.cellSize + this.cellSize * (bonus.position[0] + 1);
  let frame: number;
  let alpha = 0;
  let pulse = 1;
  let xCorrection = -25;

  ctx.font = BONUS_SIZE_LABEL_FONT;
  ctx.fillStyle = ELEMENTS_COLORS.label.background;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const animate = () => {
    if (this.isGameStopped) {
      return frame = requestAnimationFrame(animate);
    }

    if (alpha >= 1) {
      pulse = -1;
    }

    ctx.clearRect(
      x - this.cellSize + xCorrection,
      y - this.cellSize,
      this.cellSize * 2,
      this.cellSize * 2,
    );

    if (alpha < 0) {
      return cancelAnimationFrame(frame);
    }

    alpha += pulse * FADE_OUT_ANIMATION_SPEED / 5;

    ctx.globalAlpha = alpha;

    ctx.fillText(bonus.size.toString(), x + xCorrection, y);

    xCorrection += 0.5;

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
  animateAvatarWandDeath,
  animateMapElementElimination,
  animateTimeTicker,
  animateBonusSize,
};
