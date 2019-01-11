import { APP } from '../../constants/global';
import { FunctionalKeys } from '../../constants/game';

import { animateTimeTicker } from './animations';

/**
 * Function creates all game's event listeners
 */
function setUpEventHandlers() {
  document.body.addEventListener('keydown', APP.eventListeners.onKeyDown);
  document.body.addEventListener('keyup', APP.eventListeners.onKeyUp);
}

/**
 * Function removes all game's event listeners
 */
function removeEventHandlers() {
  document.body.removeEventListener('keydown', APP.eventListeners.onKeyDown);
  document.body.removeEventListener('keyup', APP.eventListeners.onKeyUp);
}

/**
 * Function fires at key down event
 *
 * @param event
 */
function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case FunctionalKeys.Reverse: {
      if (!this.keyDown.reverse && !this.isGameStopped) {
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

/**
 * Function fires at key up event
 */
function keyUpHandler() {
  setActiveKey.call(this);
}

/**
 * Function stores currently pressed key (if any) in a state variable;
 * if no key type is passed, all previously stored states are cleared
 *
 * @param type
 */
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

    if (type !== 'pause' && !this.isTimeTickerOn && this.difficulty.id !== 1) {
      this.isTimeTickerOn = true;

      animateTimeTicker.call(this);
    }
  }
}

export {
  setUpEventHandlers,
  removeEventHandlers,
  keyDownHandler,
  keyUpHandler,
  setActiveKey,
};
