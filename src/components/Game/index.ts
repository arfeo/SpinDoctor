import { LEVELS } from '../../constants/levels';
import { APP, DIFFICULTIES } from '../../constants/app';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
  renderAvatarWand,
} from './render';

import {
  removeEventHandlers,
  setUpEventHandlers,
  keyDownHandler,
  keyUpHandler,
  setActiveKey,
} from './events';

import { setCellSize } from '../../utils/common';

import {
  IBoardPanel,
  IDifficulty,
  IEnemyWandsCoords,
  IKeysDown,
  ILevel,
} from '../../types/global';

class Game {
  appRoot: HTMLElement;
  level: ILevel;
  lives: number;
  score: number;
  difficulty: IDifficulty;
  cellSize: number;
  boardPanel: IBoardPanel;
  staticCanvas: HTMLCanvasElement;
  goalCanvas: HTMLCanvasElement;
  wandCanvas: HTMLCanvasElement;
  keyDown: IKeysDown;
  isGameStopped: boolean;
  isLevelCompleted: boolean;
  goalPosition: number[];
  animateGoal: number;
  animateAvatarWand: number;
  animateEnemyWand: number[];
  avatarWandCoords: number[][];
  enemyWandsCoords: IEnemyWandsCoords;
  wallsCoords: number[][];
  doorsCoords: number[][];

  constructor(level = 1, lives = 4, score = 0, difficulty = 1) {
    this.appRoot = document.getElementById('root');

    this.level = JSON.parse(JSON.stringify(LEVELS[level - 1]));
    this.lives = lives;
    this.score = score;
    this.difficulty = JSON.parse(JSON.stringify(DIFFICULTIES[difficulty - 1]));

    this.cellSize = setCellSize();

    this.boardPanel = {
      level: document.createElement('div'),
      lives: document.createElement('div'),
      score: document.createElement('div'),
    };

    this.staticCanvas = document.createElement('canvas');
    this.goalCanvas = document.createElement('canvas');
    this.wandCanvas = document.createElement('canvas');

    this.isGameStopped = false;
    this.isLevelCompleted = false;

    this.goalPosition = this.level.goal;

    this.animateEnemyWand = [];

    this.avatarWandCoords = [];
    this.enemyWandsCoords = {};
    this.wallsCoords = [];
    this.doorsCoords = [];

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
    renderAvatarWand.call(this);
    renderPanelCounters.call(this);

    setUpEventHandlers.call(this);
  }

  destroy() {
    removeEventHandlers.call(this);

    cancelAnimationFrame(this.animateAvatarWand);
    cancelAnimationFrame(this.animateGoal);

    for (const frame of this.animateEnemyWand) {
      cancelAnimationFrame(frame);
    }
  }
}

export { Game };
