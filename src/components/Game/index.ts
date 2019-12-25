import { LEVELS } from '../../constants/levels';
import { DIFFICULTIES, CELL_SIZE_VMIN } from '../../constants/game';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
} from './render';

import {
  removeEventHandlers,
  setUpEventHandlers,
} from './events';

import {
  setCellSize,
  validateLevel,
} from './utils';

import {
  IBoardPanel,
  ILevelExtra,
  IDoorCoords,
  IEnemyWandsCoords,
  IKeysDown,
  IDifficulty,
  ILevel,
  ISwitcherCoords,
  IHourglassCoords,
} from '../../types/game';

class Game {
  protected level: ILevel;
  protected lives: number;
  protected score: number;
  protected difficulty: IDifficulty;
  protected timeAvailable: number;
  protected levelExtra: ILevelExtra;
  protected cellSize: number;
  protected boardPanelElements: IBoardPanel;
  protected staticCanvas: HTMLCanvasElement;
  protected goalCanvas: HTMLCanvasElement;
  protected wandCanvas: HTMLCanvasElement;
  protected doorsCanvas: HTMLCanvasElement;
  protected switchersCanvas: HTMLCanvasElement;
  protected obstaclesCanvas: HTMLCanvasElement;
  protected labelsCanvas: HTMLCanvasElement;
  protected keysDown: IKeysDown;
  protected isTimeTickerOn: boolean;
  protected isGameStopped: boolean;
  protected isSwitcherActive: boolean;
  protected goalPosition: number[];
  protected animateGoal: number;
  protected animateAvatarWand: number;
  protected animateEnemyWand: number[];
  protected animateTimeTicker: number;
  protected avatarWandCoords: number[][];
  protected enemyWandsCoords: IEnemyWandsCoords[];
  protected wallsCoords: number[][];
  protected doorsCoords: IDoorCoords[];
  protected switchersCoords: ISwitcherCoords[];
  protected spikesCoords: number[][];
  protected hourglassesCoords: IHourglassCoords[];
  protected enemiesSpeedCorrection: number;

  public constructor(
    level = 1,
    lives = 4,
    score = 0,
    difficulty = 1,
    levelExtra: ILevelExtra = { bonus: [], station: [] },
  ) {
    this.level = JSON.parse(JSON.stringify(LEVELS.find((item: ILevel): boolean => item.id === level)));
    this.lives = lives;
    this.score = score;

    this.difficulty = JSON.parse(JSON.stringify(
      DIFFICULTIES.find((item: IDifficulty): boolean => item.id === difficulty),
    ));

    this.timeAvailable = this.level.time;
    this.levelExtra = JSON.parse(JSON.stringify(levelExtra));

    if (this.levelExtra.station.length) {
      this.level.wand.position = [...this.levelExtra.station];
    }

    this.cellSize = setCellSize(CELL_SIZE_VMIN);

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

    this.render();
  }

  public render(): void {
    if (!validateLevel.call(this)) {
      return;
    }

    renderGameWindow.call(this);
    renderLevelMap.call(this);
    renderPanelCounters.call(this);

    setUpEventHandlers.call(this);
  }

  public destroy(): void {
    removeEventHandlers.call(this);

    cancelAnimationFrame(this.animateAvatarWand);
    cancelAnimationFrame(this.animateGoal);
    cancelAnimationFrame(this.animateTimeTicker);

    for (const frame of this.animateEnemyWand) {
      cancelAnimationFrame(frame);
    }
  }
}

export { Game };
