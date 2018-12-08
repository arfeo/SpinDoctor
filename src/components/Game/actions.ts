import { Game } from './index';

import { APP, MapDefinitions } from '../../constants/app';
import { LEVELS } from '../../constants/levels';

import { renderPanelCounters } from './render';

import { intersects } from './utils';

/**
 * Function checks the ability of the avatar wand to move to the next dot,
 * as well as checks the intersections with enemy wands and other objects on the game board
 */
function checkAvatarWand() {
  const { flip, bounce, swing } = this.keyDown;

  if (checkIntersections.call(this)) {
    this.isGameStopped = true;

    alert('Game over!');

    return;
  }

  if (flip || bounce || swing) {
    const { map } = this.level;
    const { position, angle } = this.level.wand;
    let nextDotX = 0;
    let nextDotY = 0;
    let nextDotType = 0;

    switch (angle) {
      case 0: { // East
        nextDotX = position[1] + 3;
        nextDotY = position[0] + 1;
        nextDotType = map[nextDotY][nextDotX];

        if (nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[ 1 ] += 2;
            this.level.wand.angle = 180;
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      case 90: { // South
        nextDotX = position[1] + 1;
        nextDotY = position[0] + 3;
        nextDotType = map[nextDotY][nextDotX];

        if (nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[0] += 2;
            this.level.wand.angle = 270;
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      case 180: { // West
        nextDotX = position[1] - 1;
        nextDotY = position[0] + 1;
        nextDotType = map[nextDotY][nextDotX];

        if (nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[1] -= 2;
            this.level.wand.angle = 0;
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      case 270: { // North
        nextDotX = position[1] + 1;
        nextDotY = position[0] - 1;
        nextDotType = map[nextDotY][nextDotX];

        if (nextDotType !== MapDefinitions.Empty) {
          if (!bounce) {
            this.level.wand.position[0] -= 2;
            this.level.wand.angle = 90;
          } else {
            this.level.wand.direction *= -1;
          }
        }
        break;
      }
      default: break;
    }

    if (nextDotType !== MapDefinitions.Empty && !bounce) {
      if (flip) {
        this.level.wand.direction *= -1;
      }

      checkNextDot.call(this, nextDotType, nextDotX, nextDotY);
    }
  }
}

/**
 * Function returns true if a lethal intersection occurs (with an enemy),
 * and false if the avatar wand intersects with a non-lethal object like a wall
 * or does not intersect with anything
 */
function checkIntersections(): boolean {
  if (this.avatarWandCoords && this.level.enemies && this.enemyWandsCoords) {
    for (let i = 0; i < this.level.enemies.length; i += 1) {
      if (this.enemyWandsCoords[i] !== undefined) {
        const isIntersecting = intersects(
          {
            start: {
              x: this.avatarWandCoords[0][0],
              y: this.avatarWandCoords[0][1],
            },
            end: {
              x: this.avatarWandCoords[1][0],
              y: this.avatarWandCoords[1][1],
            },
          },
          {
            start: {
              x: this.enemyWandsCoords[i][0][0],
              y: this.enemyWandsCoords[i][0][1],
            },
            end: {
              x: this.enemyWandsCoords[i][1][0],
              y: this.enemyWandsCoords[i][1][1],
            },
          },
        );

        if (isIntersecting) {
          return true;
        }
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
    case MapDefinitions.Bonus1000: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.Regular;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.Bonus2000: {
      this.score += 2000;
      this.level.map[dotY][dotX] = MapDefinitions.Regular;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.Goal: {
      this.isGameStopped = true;

      if (LEVELS[this.level.id] === undefined) {
        alert('Game over!');
      } else {
        this.destroy();

        APP.pageInstance = new Game(this.level.id + 1, this.lives, this.score, this.difficulty.id);
      }
      break;
    }
    case MapDefinitions.BonusRed: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.RegularRed;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.BonusBlue: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.RegularBlue;

      renderPanelCounters.call(this);
      break;
    }
    case MapDefinitions.BonusYellow: {
      this.score += 1000;
      this.level.map[dotY][dotX] = MapDefinitions.RegularYellow;

      renderPanelCounters.call(this);
      break;
    }
    default: break;
  }
}

export { checkAvatarWand };
