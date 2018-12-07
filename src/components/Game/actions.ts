import { renderPanelCounters } from './render';

function tryWandMove() {
  if (this.keyDown.flip || this.keyDown.bounce || this.keyDown.swing) {
    const { position, angle } = this.wand;
    let nextDotX = 0;
    let nextDotY = 0;
    let nextDotType = 0;

    switch (angle) {
      case 0: { // East
        nextDotX = position[1] + 3;
        nextDotY = position[0] + 1;
        nextDotType = this.map[nextDotY][nextDotX];

        if (nextDotType !== 0) {
          if (!this.keyDown.bounce) {
            this.wand.position[ 1 ] += 2;
            this.wand.angle = 180;
          } else {
            this.wand.direction *= -1;
          }
        }

        break;
      }
      case 90: { // South
        nextDotX = position[1] + 1;
        nextDotY = position[0] + 3;
        nextDotType = this.map[nextDotY][nextDotX];

        if (nextDotType !== 0) {
          if (!this.keyDown.bounce) {
            this.wand.position[0] += 2;
            this.wand.angle = 270;
          } else {
            this.wand.direction *= -1;
          }
        }

        break;
      }
      case 180: { // West
        nextDotX = position[1] - 1;
        nextDotY = position[0] + 1;
        nextDotType = this.map[nextDotY][nextDotX];

        if (nextDotType !== 0) {
          if (!this.keyDown.bounce) {
            this.wand.position[1] -= 2;
            this.wand.angle = 0;
          } else {
            this.wand.direction *= -1;
          }
        }

        break;
      }
      case 270: { // North
        nextDotX = position[1] + 1;
        nextDotY = position[0] - 1;
        nextDotType = this.map[nextDotY][nextDotX];

        if (nextDotType !== 0) {
          if (!this.keyDown.bounce) {
            this.wand.position[0] -= 2;
            this.wand.angle = 90;
          } else {
            this.wand.direction *= -1;
          }
        }

        break;
      }
      default: break;
    }

    if (nextDotType !== 0 && !this.keyDown.bounce) {
      if (this.keyDown.flip) {
        this.wand.direction *= -1;
      }

      checkNextDot.call(this, nextDotType, nextDotX, nextDotY);
    }
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
