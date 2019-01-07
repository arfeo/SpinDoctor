import { APP, FunctionalKeys } from '../../constants/app';

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
      if (!this.keyDown.reverse) {
        this.level.wand.direction *= -1;
      }

      setActiveKey.call(this, 'reverse');
      break;
    }
    case FunctionalKeys.Flip: {
      setActiveKey.call(this, 'flip');
      break;
    }
    case FunctionalKeys.Bounce: {
      setActiveKey.call(this, 'bounce');
      break;
    }
    case FunctionalKeys.Swing: {
      setActiveKey.call(this, 'swing');
      break;
    }
    case FunctionalKeys.Pause: {
      if (!this.isLevelCompleted) {
        if (!this.keyDown.pause) {
          const pauseLabel: HTMLElement = document.getElementById('pause');

          this.isGameStopped = !this.isGameStopped;

          if (this.isGameStopped) {
            pauseLabel.classList.add('show');
          } else {
            pauseLabel.classList.remove('show');
          }
        }

        setActiveKey.call(this, 'pause');
      }
      break;
    }
    default: break;
  }
}

function keyUpHandler() {
  setActiveKey.call(this);
}

function setActiveKey(type?: string) {
  this.keyDown = {
    reverse: false,
    flip: false,
    bounce: false,
    swing: false,
    pause: false,
  };

  if (type) {
    this.keyDown[type] = true;
  }
}

export {
  setUpEventHandlers,
  removeEventHandlers,
  keyDownHandler,
  keyUpHandler,
  setActiveKey,
};
