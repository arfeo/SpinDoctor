import { LEVELS } from '../../constants/levels';
import { APP } from '../../constants/app';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderWand,
} from './render';

import {
  removeEventHandlers,
  setUpEventHandlers,
  keyUpHandler,
} from './events';

import { setCellSize } from '../../utils/common';

import { IWand } from '../../types/global';

class Game {
  appRoot: HTMLElement;
  level: number;
  lives: number;
  score: number;
  cellSize: number;
  boardPanel: {
    level: HTMLElement;
    lives: HTMLElement;
    score: HTMLElement;
  };
  staticCanvas: HTMLCanvasElement;
  wandCanvas: HTMLCanvasElement;
  wand: IWand;

  constructor(level = 1, lives = 5, score = 0) {
    this.appRoot = document.getElementById('root');

    this.level = level;
    this.lives = lives;
    this.score = score;

    this.cellSize = setCellSize();

    this.boardPanel = {
      level: document.createElement('div'),
      lives: document.createElement('div'),
      score: document.createElement('div'),
    };

    this.staticCanvas = document.createElement('canvas');
    this.wandCanvas = document.createElement('canvas');

    this.wand = LEVELS[this.level - 1].wand;

    APP.eventListeners = {
      onKeyDown: keyUpHandler.bind(this),
    };

    this.render();
  }

  render() {
    renderGameWindow.call(this);
    renderLevelMap.call(this);
    renderWand.call(this);
    renderPanelCounters.call(this);

    setUpEventHandlers.call(this);
  }

  destroy() {
    removeEventHandlers.call(this);
  }
}

export { Game };
