import { APP } from '../../constants/app';

function setUpEventHandlers() {
  document.body.addEventListener('keyup', APP.eventListeners.onKeyDown);
}

function removeEventHandlers() {
  document.body.removeEventListener('keyup', APP.eventListeners.onKeyDown);
}

function keyUpHandler(event: KeyboardEvent) {
  switch (event.key) {
    case ' ': {
      this.wand.direction *= -1;
      break;
    }
    case 'Meta': {
      break;
    }
    case 'Control': {
      break;
    }
    default: break;
  }
}

export { setUpEventHandlers, removeEventHandlers, keyUpHandler };
