// tslint:disable:max-file-line-count
import { Game } from './index';

import { APP, WAND_REBOUND, MapDefinitions } from '../../constants/app';
import { LEVELS } from '../../constants/levels';

import { renderPanelCounters } from './render';
import { lineSegmentsIntersect, pointOnLineSegment } from './utils';
import { animateDoors, animateRingElimination } from './animations';

import { IDoorCoords, IEnemy, ILineSegment, IWand } from '../../types/global';

/**
 * Function checks the ability of the avatar wand to move to the next dot,
 * as well as checks the intersections with enemy wands and other objects on the game board
 */
function checkAvatarWand() {
  const { flip, bounce, swing } = this.keyDown;

  if (checkIntersections.call(this)) {
    this.lives -= 1;
    this.isGameStopped = true;

    if (this.lives > 0) {
      this.destroy();
      APP.pageInstance = new Game(this.level.id, this.lives, this.score, this.difficulty.id);
    } else {
      renderPanelCounters.call(this);
      alert('Game over!');
    }

    return;
  }

  if (flip || bounce || swing) {
    const { map } = this.level;
    const { position, angle } = this.level.wand;
    const currDotX: number = position[1];
    const currDotY: number = position[0];
    let nextDotX = 0;
    let nextDotY = 0;
    let nextDotType = 0;

    switch (angle) {
      case 0: { // East
        nextDotX = currDotX + 3;
        nextDotY = currDotY + 1;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[1] += 2;
            this.level.wand.angle = 180;
            checkRingLeaving.call(this, currDotX, currDotY);
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      case 90: { // South
        nextDotX = currDotX + 1;
        nextDotY = currDotY + 3;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[0] += 2;
            this.level.wand.angle = 270;
            checkRingLeaving.call(this, currDotX, currDotY);
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      case 180: { // West
        nextDotX = currDotX - 1;
        nextDotY = currDotY + 1;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[1] -= 2;
            this.level.wand.angle = 0;
            checkRingLeaving.call(this, currDotX, currDotY);
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      case 270: { // North
        nextDotX = currDotX + 1;
        nextDotY = currDotY - 1;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[0] -= 2;
            this.level.wand.angle = 90;
            checkRingLeaving.call(this, currDotX, currDotY);
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      default: break;
    }

    if (nextDotType && nextDotType !== MapDefinitions.Empty && !bounce) {
      if (flip) {
        this.level.wand.direction *= -1;
      }

      checkNextDot.call(this, nextDotType, nextDotX, nextDotY);
    }
  }
}

/**
 * Function checks the ability of an enemy wand to move to the next dot
 *
 * @param enemyId
 */
function checkEnemyWand(enemyId: number) {
  const enemy = this.level.enemies.filter((item: IWand & IEnemy) => item.id === enemyId)[0];

  if (enemy.move) {
    const { map } = this.level;
    const { position, angle } = enemy;
    const currDotX: number = position[1];
    const currDotY: number = position[0];
    let nextDotX = 0;
    let nextDotY = 0;
    let nextDotType = 0;

    const dotsMap: {[key: string]: number[]} = {
      blue: [
        MapDefinitions.DotRegularBlue,
        MapDefinitions.DotBonusBlue,
      ],
      red: [
        MapDefinitions.DotRegularRed,
        MapDefinitions.DotBonusRed,
      ],
      yellow: [
        MapDefinitions.DotRegularYellow,
        MapDefinitions.DotBonusYellow,
      ],
    };

    switch (angle) {
      case 0: { // East
        nextDotX = currDotX + 3;
        nextDotY = currDotY + 1;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty && dotsMap[enemy.type].indexOf(nextDotType) > -1) {
          if (enemy.move !== 'bounce') {
            enemy.position[1] += 2;
            enemy.angle = 180;
          } else {
            enemy.direction *= -1;
          }
        }
        break;
      }
      case 90: { // South
        nextDotX = currDotX + 1;
        nextDotY = currDotY + 3;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty && dotsMap[enemy.type].indexOf(nextDotType) > -1) {
          if (enemy.move !== 'bounce') {
            enemy.position[0] += 2;
            enemy.angle = 270;
          } else {
            enemy.direction *= -1;
          }
        }
        break;
      }
      case 180: { // West
        nextDotX = currDotX - 1;
        nextDotY = currDotY + 1;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty && dotsMap[enemy.type].indexOf(nextDotType) > -1) {
          if (enemy.move !== 'bounce') {
            enemy.position[1] -= 2;
            enemy.angle = 0;
          } else {
            enemy.direction *= -1;
          }
        }
        break;
      }
      case 270: { // North
        nextDotX = currDotX + 1;
        nextDotY = currDotY - 1;
        nextDotType = map[nextDotY] ? map[nextDotY][nextDotX] : 0;

        if (nextDotType && nextDotType !== MapDefinitions.Empty && dotsMap[enemy.type].indexOf(nextDotType) > -1) {
          if (enemy.move !== 'bounce') {
            enemy.position[0] -= 2;
            enemy.angle = 90;
          } else {
            enemy.direction *= -1;
          }
        }
        break;
      }
      default: break;
    }

    const isNextDotEmpty: boolean = nextDotType === MapDefinitions.Empty;
    const isDotTypeCorrect: boolean = dotsMap[enemy.type].indexOf(nextDotType) > -1;

    if (nextDotType && !isNextDotEmpty && isDotTypeCorrect && enemy.move !== 'bounce') {
      if (enemy.move === 'flip') {
        enemy.direction *= -1;
      }
    }

    this.level.enemies = [
      ...this.level.enemies.filter((item: IWand & IEnemy) => item.id !== enemy.id),
      enemy,
    ];
  }
}

/**
 * Function returns true if a lethal intersection occurs (with an enemy),
 * and false if the avatar wand intersects with a non-lethal object (e.g. wall or door)
 * or does not intersect with anything
 */
function checkIntersections(): boolean {
  if (this.avatarWandCoords) {
    const avatarWandSegment: ILineSegment = {
      start: {
        x: this.avatarWandCoords[0][0],
        y: this.avatarWandCoords[0][1],
      },
      end: {
        x: this.avatarWandCoords[1][0],
        y: this.avatarWandCoords[1][1],
      },
    };

    // Enemy wands
    if (this.level.enemies && this.enemyWandsCoords) {
      for (const wand in this.enemyWandsCoords) {
        if (this.enemyWandsCoords[wand] !== undefined) {
          const enemyWandSegment: ILineSegment = {
            start: {
              x: this.enemyWandsCoords[wand][0][0],
              y: this.enemyWandsCoords[wand][0][1],
            },
            end: {
              x: this.enemyWandsCoords[wand][1][0],
              y: this.enemyWandsCoords[wand][1][1],
            },
          };

          const isIntersectingWand: boolean = lineSegmentsIntersect(avatarWandSegment, enemyWandSegment);

          const isAvatarWandEndOnEnemy: boolean = pointOnLineSegment(
            enemyWandSegment,
            {
              x: avatarWandSegment.end.x,
              y: avatarWandSegment.end.y,
            },
            5,
          );

          if (isIntersectingWand || isAvatarWandEndOnEnemy) {
            return true;
          }
        }
      }
    }

    // Walls
    if (this.wallsCoords) {
      for (let i = 0; i < this.wallsCoords.length; i += 1) {
        const wall: number[][] = this.wallsCoords[i];

        const isIntersectingWall: boolean = lineSegmentsIntersect(
          avatarWandSegment,
          {
            start: {
              x: wall[0][0],
              y: wall[0][1],
            },
            end: {
              x: wall[1][0],
              y: wall[1][1],
            },
          },
        );

        if (isIntersectingWall) {
          this.level.wand.direction *= -1;
          this.level.wand.angle += this.level.wand.direction * WAND_REBOUND * this.difficulty.correction;
        }
      }
    }

    // Doors
    if (this.doorsCoords) {
      for (let i = 0; i < this.doorsCoords.length; i += 1) {
        const door: IDoorCoords = this.doorsCoords[i];

        const isIntersectingLeftDoor: boolean = lineSegmentsIntersect(
          avatarWandSegment,
          {
            start: {
              x: door.coords.left[0][0],
              y: door.coords.left[0][1],
            },
            end: {
              x: door.coords.left[1][0],
              y: door.coords.left[1][1],
            },
          },
        );

        const isIntersectingRightDoor: boolean = lineSegmentsIntersect(
          avatarWandSegment,
          {
            start: {
              x: door.coords.right[0][0],
              y: door.coords.right[0][1],
            },
            end: {
              x: door.coords.right[1][0],
              y: door.coords.right[1][1],
            },
          },
        );

        if (isIntersectingLeftDoor || isIntersectingRightDoor) {
          this.level.wand.direction *= -1;
          this.level.wand.angle += this.level.wand.direction * WAND_REBOUND * this.difficulty.correction;
        }
      }
    }

    // Door switchers
    for (let i = 0; i < this.switchersCoords.length; i += 1) {
      const isSwitcherOnAvatarWand: boolean = pointOnLineSegment(
        avatarWandSegment,
        {
          x: this.switchersCoords[i].coords[0],
          y: this.switchersCoords[i].coords[1],
        },
        5,
      );

      if (isSwitcherOnAvatarWand && !this.isSwitcherActive) {
        this.isSwitcherActive = true;

        animateDoors.call(this, this.switchersCoords[i].type);
      }
    }
  }

  return false;
}

/**
 * Function checks what the next dot is, to take the necessary action
 *
 * @param dotType
 * @param dotX
 * @param dotY
 */
function checkNextDot(dotType: number, dotX: number, dotY: number) {
  switch (dotType) {
    case MapDefinitions.DotBonus1000: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.DotRegular;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.DotBonus2000: {
      this.score += 2000;
      this.level.map[dotY][dotX] = MapDefinitions.DotRegular;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.DotBonusRed: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.DotRegularRed;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.DotBonusBlue: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.DotRegularBlue;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.DotBonusYellow: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.DotRegularYellow;

      renderPanelCounters.call(this);
      break;
    }
    default: break;
  }

  // Avatar wand meets the goal
  if ((dotY - 1) === this.goalPosition[0] && (dotX - 1) === this.goalPosition[1]) {
    this.isGameStopped = true;
    this.isLevelCompleted = true;

    if (LEVELS[this.level.id] === undefined) {
      alert('Game over!');
    } else {
      this.destroy();

      APP.pageInstance = new Game(this.level.id + 1, this.lives, this.score, this.difficulty.id);
    }
  }
}

/**
 * Function checks if the avatar wand leaves a ring dot
 *
 * @param currDotX
 * @param currDotY
 */
function checkRingLeaving(currDotX: number, currDotY: number) {
  if (this.level.map[currDotY + 1][currDotX + 1] === MapDefinitions.RingRegular) {
    this.level.map[currDotY + 1][currDotX + 1] = 0;

    animateRingElimination.call(this, currDotX, currDotY);
  }
}

export { checkAvatarWand, checkEnemyWand };
