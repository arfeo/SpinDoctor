import { APP } from '../../constants/global';
import { DIFFICULTIES } from '../../constants/game';
import { LEVELS } from '../../constants/levels';

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

import { setCellSize, validateLevel } from '../../utils/game';

import {
  IBoardPanel,
  IDifficulty,
  ILevelExtra,
  IDoorCoords,
  IEnemyWandsCoords,
  IKeysDown,
  ILevel,
  ISwitcherCoords,
} from '../../types/game';

class Game {
  appRoot: HTMLElement;
  level: ILevel;
  lives: number;
  score: number;
  difficulty: IDifficulty;
  levelExtra: ILevelExtra;
  cellSize: number;
  boardPanel: IBoardPanel;
  staticCanvas: HTMLCanvasElement;
  goalCanvas: HTMLCanvasElement;
  wandCanvas: HTMLCanvasElement;
  doorsCanvas: HTMLCanvasElement;
  switchersCanvas: HTMLCanvasElement;
  obstaclesCanvas: HTMLCanvasElement;
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
  spikesCoords: number[][];
  enemiesSpeedCorrection: number;

  constructor(level = 1, lives = 4, score = 0, difficulty = 1, levelExtra: ILevelExtra = { bonus: [], station: [] }) {
    this.appRoot = document.getElementById('root');

    this.level = JSON.parse(JSON.stringify(LEVELS.filter((item: ILevel) => item.id === level)[0]));
    this.lives = lives;
    this.score = score;
    this.difficulty = JSON.parse(JSON.stringify(DIFFICULTIES.filter((item: IDifficulty) => item.id === difficulty)[0]));
    this.levelExtra = JSON.parse(JSON.stringify(levelExtra));

    if (this.levelExtra.station.length) {
      this.level.wand.position = JSON.parse(JSON.stringify(this.levelExtra.station));
    }

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
    this.obstaclesCanvas = document.createElement('canvas');

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
    this.spikesCoords = [];

    this.enemiesSpeedCorrection = 1;

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
