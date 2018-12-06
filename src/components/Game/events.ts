import { APP } from '../../constants/app';

function setUpEventHandlers() {
  document.body.addEventListener('keydown', APP.eventListeners.onKeyDown);
}

function removeEventHandlers() {
  document.body.removeEventListener('keydown', APP.eventListeners.onKeyDown);
}

function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case ' ': {
      this.wandDir *= -1;
      break;
    }
    default: break;
  }
}

export { setUpEventHandlers, removeEventHandlers, keyDownHandler };
