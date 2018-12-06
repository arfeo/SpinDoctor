import { APP } from '../../constants/app';

import { tryWandMove } from './draw';

function setUpEventHandlers() {
  document.body.addEventListener('keydown', APP.eventListeners.onKeyDown);
}

function removeEventHandlers() {
  document.body.removeEventListener('keydown', APP.eventListeners.onKeyDown);
}

function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case ' ': {
      this.wand.direction *= -1;
      break;
    }
    case 'Meta': {
      tryWandMove.call(this);
      break;
    }
    case 'Control': {
      tryWandMove.call(this, true);
      break;
    }
    default: break;
  }
}

export { setUpEventHandlers, removeEventHandlers, keyDownHandler };
