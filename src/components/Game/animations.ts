import {
  DOORS_ANIMATION_SPEED,
  MAP_ELEMENT_COLORS,
  RING_FADE_OUT_ANIMATION_SPEED,
} from '../../constants/app';

import { renderDoor } from './render';
import { drawDot } from './draw';

import { IDoor } from '../../types/global';

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
          doorWidth += DOORS_ANIMATION_SPEED;

          if (doorWidth >= this.cellSize * 2 - this.cellSize / 2 - 2) {
            cancelAnimationFrame(frame);

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
          doorWidth -= DOORS_ANIMATION_SPEED;

          if (doorWidth <= 0) {
            cancelAnimationFrame(frame);

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

  this.isSwitcherActive = false;
}

/**
 * Function eliminates a ring from the game board with fade out effect
 *
 * @param currDotX
 * @param currDotY
 */
function animateRingElimination(currDotX: number, currDotY: number) {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');
  const top: number = this.cellSize + this.cellSize * (currDotY + 1);
  const left: number = this.cellSize + this.cellSize * (currDotX + 1);
  const dotX: number = left + this.cellSize / 2;
  const dotY: number = top + this.cellSize / 2;
  let frame: number;
  let alpha = 1;

  const animate = () => {
    if (alpha <= 0) {
      return cancelAnimationFrame(frame);
    }

    alpha -= RING_FADE_OUT_ANIMATION_SPEED;

    ctx.globalAlpha = alpha;

    ctx.clearRect(left, top, this.cellSize, this.cellSize);

    drawDot(
      ctx,
      dotX,
      dotY,
      this.cellSize / 5,
      MAP_ELEMENT_COLORS.ring.background,
      2,
      MAP_ELEMENT_COLORS.ring.border,
    );

    frame = requestAnimationFrame(animate);
  };

  frame = requestAnimationFrame(animate);
}

export { animateDoors, animateRingElimination };
