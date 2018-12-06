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
      this.wandDir *= -1;
      break;
    }
    default: break;
  }
}

export { setUpEventHandlers, removeEventHandlers, keyUpHandler };
