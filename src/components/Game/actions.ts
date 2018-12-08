import { Game } from './index';

import { APP, MapDefinitions } from '../../constants/app';
import { LEVELS } from '../../constants/levels';

import { renderPanelCounters } from './render';

/**
 * Function checks the ability of the avatar wand to move to the next dot,
 * as well as checks the intersections with enemy wands and other objects on the game board
 */
function checkAvatarWand() {
  const { flip, bounce, swing } = this.keyDown;

  // Whether the wand is able to move to the next dot
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
