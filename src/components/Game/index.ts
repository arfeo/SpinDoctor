import { LEVELS } from '../../constants/levels';
import { APP, DIFFICULTIES } from '../../constants/app';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderWand,
} from './render';

import {
  removeEventHandlers,
  setUpEventHandlers,
  keyDownHandler,
  keyUpHandler,
  setActiveKey,
} from './events';

import { setCellSize } from '../../utils/common';

import { IDifficulty, IWand } from '../../types/global';

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
  difficulty: IDifficulty;
  map: number[][];
  wand: IWand;
  keyDown: {
    reverse: boolean;
    flip: boolean;
    bounce: boolean;
    swing: boolean;
    pause: boolean;
  };
  isGameStopped: boolean;

  constructor(level = 1, lives = 5, score = 0, difficulty = 1) {
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

    this.difficulty = DIFFICULTIES[difficulty - 1];

    this.map = LEVELS[this.level - 1].map;
    this.wand = LEVELS[this.level - 1].wand;

    this.isGameStopped = false;

    APP.eventListeners = {
      onKeyDown: keyDownHandler.bind(this),
      onKeyUp: keyUpHandler.bind(this),
    };

    setActiveKey.call(this);

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

    APP.pageInstance = null;
  }
}

export { Game };
