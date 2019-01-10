import { LEVELS } from '../../constants/levels';
import { APP, DIFFICULTIES } from '../../constants/app';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
} from './render';

import {
  removeEventHandlers,
  setUpEventHandlers,
  keyDownHandler,
  keyUpHandler,
  setActiveKey,
} from './events';

import { setCellSize } from '../../utils/common';
import { validateLevel } from './utils';

import {
  IBoardPanel,
  IDifficulty,
  IDisabled,
  IDoorCoords,
  IEnemyWandsCoords,
  IKeysDown,
  ILevel,
  ISwitcherCoords,
} from '../../types/global';

class Game {
  appRoot: HTMLElement;
  level: ILevel;
  lives: number;
  score: number;
  difficulty: IDifficulty;
  disabledElements: IDisabled;
  cellSize: number;
  boardPanel: IBoardPanel;
  staticCanvas: HTMLCanvasElement;
  goalCanvas: HTMLCanvasElement;
  wandCanvas: HTMLCanvasElement;
  doorsCanvas: HTMLCanvasElement;
  switchersCanvas: HTMLCanvasElement;
  spikesCanvas: HTMLCanvasElement;
  keyDown: IKeysDown;
  isGameStopped: boolean;
  isLevelCompleted: boolean;
  isSwitcherActive: boolean;
  goalPosition: number[];
  animateGoal: number;
  animateAvatarWand: number;
  animateEnemyWand: number[];
  avatarWandCoords: number[][];
  enemyWandsCoords: IEnemyWandsCoords;
  wallsCoords: number[][];
  doorsCoords: IDoorCoords[];
  switchersCoords: ISwitcherCoords[];

  constructor(level = 1, lives = 4, score = 0, difficulty = 1, disabledElements: IDisabled = { bonus: [] }) {
    this.appRoot = document.getElementById('root');

    this.level = JSON.parse(JSON.stringify(LEVELS.filter((item: ILevel) => item.id === level)[0]));
    this.lives = lives;
    this.score = score;
    this.difficulty = JSON.parse(JSON.stringify(DIFFICULTIES.filter((item: IDifficulty) => item.id === difficulty)[0]));
    this.disabledElements = JSON.parse(JSON.stringify(disabledElements));

    this.cellSize = setCellSize();

    this.boardPanel = {
      level: document.createElement('div'),
      lives: document.createElement('div'),
      score: document.createElement('div'),
    };

    this.staticCanvas = document.createElement('canvas');
    this.goalCanvas = document.createElement('canvas');
    this.wandCanvas = document.createElement('canvas');
    this.doorsCanvas = document.createElement('canvas');
    this.switchersCanvas = document.createElement('canvas');
    this.spikesCanvas = document.createElement('canvas');

    this.isGameStopped = false;
    this.isLevelCompleted = false;
    this.isSwitcherActive = false;

    this.goalPosition = this.level.goal;

    this.animateEnemyWand = [];

    this.avatarWandCoords = [];
    this.enemyWandsCoords = {};
    this.wallsCoords = [];
    this.doorsCoords = [];
    this.switchersCoords = [];

    APP.eventListeners = {
      onKeyDown: keyDownHandler.bind(this),
      onKeyUp: keyUpHandler.bind(this),
    };

    setActiveKey.call(this);

    this.render();
  }

  render() {
    if (!validateLevel.call(this)) {
      return;
    }

    renderGameWindow.call(this);
    renderLevelMap.call(this);
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
