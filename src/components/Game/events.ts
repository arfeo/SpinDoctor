import { APP, FunctionalKeys } from '../../constants/app';

import { tryWandMove } from './actions';

function setUpEventHandlers() {
  document.body.addEventListener('keydown', APP.eventListeners.onKeyDown);
  document.body.addEventListener('keyup', APP.eventListeners.onKeyUp);
}

function removeEventHandlers() {
  document.body.removeEventListener('keydown', APP.eventListeners.onKeyDown);
  document.body.removeEventListener('keyup', APP.eventListeners.onKeyUp);
}

function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case FunctionalKeys.Reverse: {
      this.wand.direction *= -1;
      break;
    }
    case FunctionalKeys.Flip: {
      tryWandMove.call(this, 'flip');
      break;
    }
    case FunctionalKeys.Bounce: {
      tryWandMove.call(this, 'bounce');
      break;
    }
    case FunctionalKeys.Swing: {
      tryWandMove.call(this);
      break;
    }
    case FunctionalKeys.Pause: {
      const pauseLabel: HTMLElement = document.getElementById('pause');

      this.isGameStopped = !this.isGameStopped;

      if (this.isGameStopped) {
        pauseLabel.classList.add('show');
      } else {
        pauseLabel.classList.remove('show');
      }
      break;
    }
    default: break;
  }
}

function keyUpHandler() {
  // ..
}

export {
  setUpEventHandlers,
  removeEventHandlers,
  keyDownHandler,
  keyUpHandler,
};
