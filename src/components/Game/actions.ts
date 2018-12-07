import { renderPanelCounters } from './render';

function tryWandMove(bounce?: boolean) {
  const { position, angle } = this.wand;
  let nextDotX = 0;
  let nextDotY = 0;
  let nextDotType = 0;

  if ((angle >= 355 && angle <= 359) || (angle >= 0 && angle <= 5)) { // East
    nextDotX = position[1] + 1 + 2;
    nextDotY = position[0] + 1;
    nextDotType = this.map[nextDotY][nextDotX];

    if (nextDotType !== 0) {
      this.wand.position[1] += 2;
      this.wand.angle += angle >= 355 && angle <= 359 ? -180 : 180;
    }
  } else if (angle >= 85 && angle <= 95) { // South
    nextDotX = position[1] + 1;
    nextDotY = position[0] + 1 + 2;
    nextDotType = this.map[nextDotY][nextDotX];

    if (nextDotType !== 0) {
      this.wand.position[0] += 2;
      this.wand.angle += 180;
    }
  } else if (angle >= 175 && angle <= 185) { // West
    nextDotX = position[1] + 1 - 2;
    nextDotY = position[0] + 1;
    nextDotType = this.map[nextDotY][nextDotX];

    if (nextDotType !== 0) {
      this.wand.position[1] -= 2;
      this.wand.angle -= angle >= 175 && angle < 180 ? 180 : -180;
    }
  } else if (angle >= 265 && angle <= 275) { // North
    nextDotX = position[1] + 1;
    nextDotY = position[0] + 1 - 2;
    nextDotType = this.map[nextDotY][nextDotX];

    if (nextDotType !== 0) {
      this.wand.position[0] -= 2;
      this.wand.angle -= 180;
    }
  }

  if (nextDotType !== 0) {
    if (bounce) {
      this.wand.direction *= -1;
    }

    checkNextDot.call(this, nextDotType, nextDotX, nextDotY);
  }
}

function checkNextDot(dotType: number, dotX: number, dotY: number) {
  switch (dotType) {
    case 2: {
      this.score += 1000;
      this.map[dotY][dotX] = 1;

      renderPanelCounters.call(this);
      break;
    }
    case 3: {
      this.score += 2000;
      this.map[dotY][dotX] = 1;

      renderPanelCounters.call(this);
      break;
    }
    default: break;
  }
}

export { tryWandMove };
