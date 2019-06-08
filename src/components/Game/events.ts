import { Menu } from '../Menu';

import { APP } from '../../constants/global';
import { FunctionalKeys } from '../../constants/game';

import { animateTimeTicker } from './animations';

/**
 * Function creates all game's event listeners
 */
function setUpEventHandlers() {
  setActiveKey.call(this);

  this.eventHandlers = [
    {
      id: 1,
      target: this.boardPanelElements.menuButton,
      type: 'click',
      listener: () => {
        this.destroy();

        APP.pageInstance = new Menu();
      },
    },
    {
      id: 2,
      target: this.boardPanelElements.pauseButton,
      type: 'click',
      listener: onPauseGame.bind(this),
    },
    {
      id: 3,
      target: document.body,
      type: 'keydown',
      listener: keyDownHandler.bind(this),
    },
    {
      id: 4,
      target: document.body,
      type: 'keyup',
      listener: keyUpHandler.bind(this),
    },
  ];
}

/**
 * Function fires at key down event
 *
 * @param event
 */
function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case FunctionalKeys.Reverse: {
      if (!this.keysDown.reverse && !this.isGameStopped) {
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
      onPauseGame.call(this);
      setActiveKey.call(this, 'pause');
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
  this.keysDown = {
    reverse: false,
    flip: false,
    bounce: false,
    swing: false,
    pause: false,
  };

  if (type) {
    this.keysDown[type] = true;

    if (type !== 'pause' && !this.isTimeTickerOn && this.difficulty.id !== 1) {
      this.isTimeTickerOn = true;

      animateTimeTicker.call(this);
    }
  }
}

/**
 * Function stops all game animations, including time ticker animation, if the game is active,
 * and resumes the game if it has been stopped earlier
 */
function onPauseGame() {
  if (this.keysDown.pause) {
    return;
  }

  const pauseLabel: HTMLElement = document.getElementById('pause');

  this.isGameStopped = !this.isGameStopped;

  if (this.isGameStopped) {
    pauseLabel.classList.add('show');
  } else {
    pauseLabel.classList.remove('show');
  }
}

export { setUpEventHandlers };
