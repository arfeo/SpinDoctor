import { renderGameWindow, renderPanelCounters } from './render';

class Game {
  appRoot: HTMLElement;
  level: number;
  lives: number;
  score: number;
  boardPanel: {
    level: HTMLElement;
    lives: HTMLElement;
    score: HTMLElement;
  };

  constructor(level = 1, lives = 5, score = 0) {
    this.appRoot = document.getElementById('root');

    this.level = level;
    this.lives = lives;
    this.score = score;

    this.boardPanel = {
      level: document.createElement('div'),
      lives: document.createElement('div'),
      score: document.createElement('div'),
    };

    this.boardPanel.level.className = '-level';
    this.boardPanel.lives.className = '-lives';
    this.boardPanel.score.className = '-score';

    this.render();
  }

  render() {
    renderGameWindow.call(this);
    renderPanelCounters.call(this);
  }
}

export { Game };
