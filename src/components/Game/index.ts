import { GameComponent, Utils } from 'gpt-ts';

import { Menu } from '../Menu';
import { Alert } from '../common/Alert';

import { APP, DIFFICULTIES } from '../../constants/global';
import { LEVELS } from '../../constants/levels';
import { CELL_SIZE_VMIN } from '../../constants/game';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
} from './render';

import {
  keyDownHandler,
  keyUpHandler,
  onPauseGame,
} from './events';

import { validateLevel } from './utils';

import {
  IBoardPanel,
  ILevelExtra,
  IDoorCoords,
  IEnemyWandsCoords,
  IKeysDown,
  ILevel,
  ISwitcherCoords,
  IHourglassCoords,
} from '../../types/game';

import { IDifficulty } from '../../types/global';

class Game extends GameComponent {
  level: ILevel;
  lives: number;
  score: number;
  difficulty: IDifficulty;
  timeAvailable: number;
  levelExtra: ILevelExtra;
  cellSize: number;
  boardPanelElements: IBoardPanel;
  staticCanvas: HTMLCanvasElement;
  goalCanvas: HTMLCanvasElement;
  wandCanvas: HTMLCanvasElement;
  doorsCanvas: HTMLCanvasElement;
  switchersCanvas: HTMLCanvasElement;
  obstaclesCanvas: HTMLCanvasElement;
  labelsCanvas: HTMLCanvasElement;
  keysDown: IKeysDown;
  isTimeTickerOn: boolean;
  isGameStopped: boolean;
  isSwitcherActive: boolean;
  goalPosition: number[];
  animateGoal: number;
  animateAvatarWand: number;
  animateEnemyWand: number[];
  animateTimeTicker: number;
  avatarWandCoords: number[][];
  enemyWandsCoords: IEnemyWandsCoords[];
  wallsCoords: number[][];
  doorsCoords: IDoorCoords[];
  switchersCoords: ISwitcherCoords[];
  spikesCoords: number[][];
  hourglassesCoords: IHourglassCoords[];
  enemiesSpeedCorrection: number;

  constructor(level = 1, lives = 4, score = 0, difficulty = 1, levelExtra: ILevelExtra = { bonus: [], station: [] }) {
    super(level, lives, score, difficulty, levelExtra);
  }

  init(level: number, lives: number, score: number, difficulty: number, levelExtra: ILevelExtra) {
    this.level = JSON.parse(JSON.stringify(LEVELS.find((item: ILevel) => item.id === level)));
    this.lives = lives;
    this.score = score;
    this.difficulty = JSON.parse(JSON.stringify(DIFFICULTIES.find((item: IDifficulty) => item.id === difficulty)));
    this.timeAvailable = this.level.time;
    this.levelExtra = JSON.parse(JSON.stringify(levelExtra));

    if (this.levelExtra.station.length) {
      this.level.wand.position = [...this.levelExtra.station];
    }

    this.cellSize = Utils.setCellSize(CELL_SIZE_VMIN);

    this.isTimeTickerOn = false;
    this.isGameStopped = false;
    this.isSwitcherActive = false;

    this.goalPosition = [...this.level.goal];

    this.animateEnemyWand = [];

    this.avatarWandCoords = [];
    this.enemyWandsCoords = [];
    this.wallsCoords = [];
    this.doorsCoords = [];
    this.switchersCoords = [];
    this.spikesCoords = [];
    this.hourglassesCoords = [];

    this.enemiesSpeedCorrection = 1;

    this.boardPanelElements = {
      menuButton: document.createElement('button'),
      pauseButton: document.createElement('button'),
      level: document.createElement('div'),
      time: document.createElement('div'),
      lives: document.createElement('div'),
      score: document.createElement('div'),
    };

    this.keysDown = {
      reverse: false,
      flip: false,
      bounce: false,
      swing: false,
      pause: false,
    };

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

  render() {
    if (!validateLevel.call(this)) {
      return new Alert(this, 'The level description is invalid: there is no "map" and/or "goal" found.');
    }

    renderGameWindow.call(this);
    renderLevelMap.call(this);
    renderPanelCounters.call(this);
  }

  unmount() {
    cancelAnimationFrame(this.animateAvatarWand);
    cancelAnimationFrame(this.animateGoal);
    cancelAnimationFrame(this.animateTimeTicker);

    for (const frame of this.animateEnemyWand) {
      cancelAnimationFrame(frame);
    }
  }
}

export { Game };
