import { DOORS_ANIMATION_SPEED } from '../../constants/app';

import { renderDoor } from './render';

import { IDoor } from '../../types/global';

/**
 * Function animates closing & opening of all doors of the given type
 *
 * @param type
 */
function animateDoors(type: string) {
  this.level.doors.map((door: IDoor) => {
    if (door.type === type) {
      if (door.opened) {
        let doorWidth = 0;

        const closeDoor = () => {
          doorWidth += DOORS_ANIMATION_SPEED;

          if (doorWidth >= this.cellSize * 2 - this.cellSize / 2 - 2) {
            return this.level.doors = [
              ...this.level.doors.filter((item: IDoor) => item.id !== door.id),
              {
                ...door,
                opened: false,
              },
            ];
          }

          renderDoor.call(this, door, doorWidth);

          requestAnimationFrame(closeDoor);
        };

        requestAnimationFrame(closeDoor);
      } else {
        let doorWidth = this.cellSize * 2 - this.cellSize / 2 - 2;

        const openDoor = () => {
          doorWidth -= DOORS_ANIMATION_SPEED;

          if (doorWidth <= 0) {
            return this.level.doors = [
              ...this.level.doors.filter((item: IDoor) => item.id !== door.id),
              {
                ...door,
                opened: true,
              },
            ];
          }

          renderDoor.call(this, door, doorWidth);

          requestAnimationFrame(openDoor);
        };

        requestAnimationFrame(openDoor);
      }
    }
  });

  this.isSwitcherActive = false;
}

export { animateDoors };
