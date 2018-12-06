import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderWand,
} from './render';

import { setCellSize } from '../../utils/common';

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

    this.render();
  }

  render() {
    renderGameWindow.call(this);
    renderLevelMap.call(this);
    renderWand.call(this);
    renderPanelCounters.call(this);
  }
}

export { Game };
