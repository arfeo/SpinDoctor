import { Game } from './index';
import { GameOver } from '../GameOver';

import { APP } from '../../constants/global';
import { MapDefinitions, WAND_REBOUND } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

import { renderPanelCounters } from './render';
import { lineSegmentIntersectsWithRect, lineSegmentsIntersect, pointOnLineSegment } from '../../utils/math';
import { animateDoors, animateMapElementElimination } from './animations';

import { IBonus, IDoorCoords, IEnemy, IWand } from '../../types/game';
import { ILineSegment } from '../../types/utils';

/**
 * Function checks the ability of the avatar wand to move to the next dot,
 * as well as checks the intersections with enemy wands and other objects on the game board
 * (e.g., walls, switchers, spikes, etc.)
 */
function checkAvatarWand() {
  const { flip, bounce, swing } = this.keyDown;

  if (checkIntersections.call(this)) {
    this.lives -= 1;
    this.isGameStopped = true;

    if (this.lives > 0) {
      this.destroy();
      APP.pageInstance = new Game(this.level.id, this.lives, this.score, this.difficulty.id, this.disabledElements);
    } else {
      renderPanelCounters.call(this);

      new GameOver(this);
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
        MapDefinitions.DotBlue,
        MapDefinitions.DotRedBlue,
        MapDefinitions.DotBlueYellow,
        MapDefinitions.DotRedBlueYellow,
        MapDefinitions.RingBlue,
        MapDefinitions.RingBlueYellow,
        MapDefinitions.RingRedBlueYellow,
      ],
      red: [
        MapDefinitions.DotRed,
        MapDefinitions.DotRedBlue,
        MapDefinitions.DotRedYellow,
        MapDefinitions.DotRedBlueYellow,
        MapDefinitions.RingRedBlue,
        MapDefinitions.RingRedYellow,
        MapDefinitions.RingRedBlueYellow,
      ],
      yellow: [
        MapDefinitions.DotYellow,
        MapDefinitions.DotRedYellow,
        MapDefinitions.DotBlueYellow,
        MapDefinitions.DotRedBlueYellow,
        MapDefinitions.RingRedYellow,
        MapDefinitions.RingBlueYellow,
        MapDefinitions.RingRedBlueYellow,
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
 * Function returns true if a lethal intersection occurs (with an enemy or an obstacle),
 * and false if the avatar wand intersects with a non-lethal object (e.g. wall or door),
 * functional object (e.g., switcher) or does not intersect with anything at all
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

    // Spikes
    for (const spike of this.spikesCoords) {
      if (lineSegmentIntersectsWithRect(avatarWandSegment, spike)) {
        return true;
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
  // Avatar wand grabs slowdown -- all enemy wands move twice slower
  if (dotType === 17) {
    this.enemiesSpeedCorrection = 2;
  }

  // Avatar wand grabs bonus
  const bonus: IBonus[] = this.level.bonus.filter((item: IBonus) => {
    return item.position[0] === (dotY - 1) && item.position[1] === (dotX - 1);
  });

  if (bonus.length) {
    this.disabledElements.bonus.push(bonus[0].id);
    this.score += bonus[0].size;
    this.level.bonus = this.level.bonus.filter((item: IBonus) => item.id !== bonus[0].id);

    renderPanelCounters.call(this);
  }

  // Avatar wand grabs the goal dot
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
  const ringsMap: number[] = [
    MapDefinitions.RingRegular,
    MapDefinitions.RingRed,
    MapDefinitions.RingBlue,
    MapDefinitions.RingYellow,
    MapDefinitions.RingRedBlue,
    MapDefinitions.RingRedYellow,
    MapDefinitions.RingBlueYellow,
    MapDefinitions.RingRedBlueYellow,
  ];

  if (ringsMap.indexOf(this.level.map[currDotY + 1][currDotX + 1]) > - 1) {
    this.level.map[currDotY + 1][currDotX + 1] = 0;

    animateMapElementElimination.call(this, currDotX, currDotY);
  }
}

export { checkAvatarWand, checkEnemyWand };
