import { GameComponent, Utils } from 'gpt-ts';

import { Menu } from '../Menu';
import { Alert } from '../common/Alert';

import { APP } from '../../constants/global';
import { LEVELS } from '../../constants/levels';
import { DIFFICULTIES, CELL_SIZE_VMIN } from '../../constants/game';

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
  IDifficulty,
  IBoardPanel,
  ILevelExtra,
  IDoorCoords,
  IEnemyWandsCoords,
  IKeysDown,
  ILevel,
  ISwitcherCoords,
  IHourglassCoords,
} from '../../types/game';

class Game extends GameComponent {
  private level: ILevel;
  private levelExtra: ILevelExtra;
  private boardPanelElements: IBoardPanel;
  private animateGoal: number;
  private animateAvatarWand: number;
  private animateEnemyWand: number[];
  private animateTimeTicker: number;

  public lives: number;
  public score: number;
  public difficulty: IDifficulty;
  public timeAvailable: number;
  public cellSize: number;
  public keysDown: IKeysDown;
  public isTimeTickerOn: boolean;
  public isGameStopped: boolean;
  public isSwitcherActive: boolean;
  public goalPosition: number[];
  public avatarWandCoords: number[][];
  public enemyWandsCoords: IEnemyWandsCoords[];
  public wallsCoords: number[][];
  public doorsCoords: IDoorCoords[];
  public switchersCoords: ISwitcherCoords[];
  public spikesCoords: number[][];
  public hourglassesCoords: IHourglassCoords[];
  public enemiesSpeedCorrection: number;

  public constructor(level = 1, lives = 4, score = 0, difficulty = 1, levelExtra: ILevelExtra = { bonus: [], station: [] }) {
    super(level, lives, score, difficulty, levelExtra);
  }

  public init(level: number, lives: number, score: number, difficulty: number, levelExtra: ILevelExtra): void {
    this.level = JSON.parse(JSON.stringify(LEVELS.find((item: ILevel): boolean => item.id === level)));
    this.lives = lives;
    this.score = score;
    this.difficulty = JSON.parse(JSON.stringify(DIFFICULTIES.find((item: IDifficulty): boolean => item.id === difficulty)));
    this.timeAvailable = this.level.time;
    this.levelExtra = JSON.parse(JSON.stringify(levelExtra));

    if (this.levelExtra.station.length) {
      this.level.wand.position = [ ...this.levelExtra.station ];
    }

    this.cellSize = Utils.getCellSize(CELL_SIZE_VMIN);

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
        target: this.boardPanelElements.menuButton,
        type: 'click',
        listener: (): void => {
          this.destroy();

          APP.pageInstance = new Menu();
        },
      },
      {
        target: this.boardPanelElements.pauseButton,
        type: 'click',
        listener: onPauseGame.bind(this),
      },
      {
        target: document.body,
        type: 'keydown',
        listener: keyDownHandler.bind(this),
      },
      {
        target: document.body,
        type: 'keyup',
        listener: keyUpHandler.bind(this),
      },
    ];
  }

  public render(): void {
    if (!validateLevel.call(this)) {
      new Alert(this, 'The level description is invalid: there is no "map" and/or "goal" found.');

      return;
    }

    renderGameWindow.call(this);
    renderLevelMap.call(this);
    renderPanelCounters.call(this);
  }

  public beforeUnmount(): void {
    cancelAnimationFrame(this.animateAvatarWand);
    cancelAnimationFrame(this.animateGoal);
    cancelAnimationFrame(this.animateTimeTicker);

    for (const frame of this.animateEnemyWand) {
      cancelAnimationFrame(frame);
    }
  }
}

export { Game };
