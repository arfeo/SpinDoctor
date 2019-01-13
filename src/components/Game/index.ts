import { DIFFICULTIES } from '../../constants/global';
import { LEVELS } from '../../constants/levels';

import {
  renderGameWindow,
  renderLevelMap,
  renderPanelCounters,
} from './render';

import {
  removeEventHandlers,
  setUpEventHandlers,
} from './events';

import { setCellSize, validateLevel } from '../../utils/game';

import {
  IBoardPanel,
  ILevelExtra,
  IDoorCoords,
  IEnemyWandsCoords,
  IKeysDown,
  ILevel,
  ISwitcherCoords,
} from '../../types/game';

import { IDifficulty } from '../../types/global';

class Game {
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
  keyDown: IKeysDown;
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
  enemiesSpeedCorrection: number;

  constructor(level = 1, lives = 4, score = 0, difficulty = 1, levelExtra: ILevelExtra = { bonus: [], station: [] }) {
    this.level = JSON.parse(JSON.stringify(LEVELS.filter((item: ILevel) => item.id === level)[0]));
    this.lives = lives;
    this.score = score;
    this.difficulty = JSON.parse(JSON.stringify(DIFFICULTIES.filter((item: IDifficulty) => item.id === difficulty)[0]));
    this.timeAvailable = this.level.time;
    this.levelExtra = JSON.parse(JSON.stringify(levelExtra));

    if (this.levelExtra.station.length) {
      this.level.wand.position = JSON.parse(JSON.stringify(this.levelExtra.station));
    }

    this.cellSize = setCellSize();

    this.isTimeTickerOn = false;
    this.isGameStopped = false;
    this.isSwitcherActive = false;

    this.goalPosition = this.level.goal;

    this.animateEnemyWand = [];

    this.avatarWandCoords = [];
    this.enemyWandsCoords = [];
    this.wallsCoords = [];
    this.doorsCoords = [];
    this.switchersCoords = [];
    this.spikesCoords = [];

    this.enemiesSpeedCorrection = 1;

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
    cancelAnimationFrame(this.animateTimeTicker);

    for (const frame of this.animateEnemyWand) {
      cancelAnimationFrame(frame);
    }
  }
}

export { Game };
