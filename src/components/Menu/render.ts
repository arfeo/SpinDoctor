import { Game } from '../Game';

import { APP, DIFFICULTIES } from '../../constants/global';

import { saveStorageData } from '../../utils/storage';

import { IDifficulty } from '../../types/game';

/**
 * Function renders the menu window and adds all necessary event listeners
 */
function renderMenuWindow(): void {
  const appRoot: HTMLElement = document.getElementById('root');
  const menuWindow: HTMLElement = document.createElement('div');
  const playerBlock: HTMLElement = document.createElement('div');
  const playerLabel: HTMLLabelElement = document.createElement('label');
  const difficultyBlock: HTMLElement = document.createElement('div');
  const difficultyLabel: HTMLLabelElement = document.createElement('label');
  const buttonsBlock: HTMLElement = document.createElement('div');
  const playButton: HTMLButtonElement = document.createElement('button');
  const helpButton: HTMLButtonElement = document.createElement('button');
  this.playerInput = document.createElement('input');
  this.difficultySelect = document.createElement('select');

  menuWindow.className = 'menuWindow';
  playerBlock.className = '-player';
  playerLabel.innerText = 'Doctor on duty:';
  this.playerInput.type = 'text';
  this.playerInput.value = this.player;
  difficultyBlock.className = '-difficulty';
  difficultyLabel.innerText = 'Difficulty:';
  buttonsBlock.className = '-buttons';
  playButton.innerText = 'Play';
  helpButton.innerText = 'Help';

  appRoot.innerHTML = '';

  appRoot.appendChild(menuWindow);
  menuWindow.appendChild(playerBlock);
  playerBlock.appendChild(playerLabel);
  playerBlock.appendChild(this.playerInput);
  menuWindow.appendChild(difficultyBlock);
  difficultyBlock.appendChild(difficultyLabel);
  difficultyBlock.appendChild(this.difficultySelect);
  menuWindow.appendChild(buttonsBlock);
  buttonsBlock.appendChild(playButton);
  buttonsBlock.appendChild(helpButton);

  renderDifficultyOptions.call(this);

  this.playerInput.addEventListener('input', ((element: HTMLInputElement & { target?: { value: string } }): void => {
    this.player = element.target.value;

    saveStorageData('player', this.player);
  }) as any);

  this.difficultySelect.addEventListener('change', ((element: HTMLInputElement & { target: { value: string } }) => {
    this.difficulty = parseInt(element.target.value, 10);

    saveStorageData('difficulty', this.difficulty);
  }) as any);

  playButton.addEventListener('click', (): void => {
    APP.pageInstance = new Game(1, 4, 0, this.difficulty);
  });
}

/**
 * Function renders the difficulty select's options list according to the corresponding constant
 */
function renderDifficultyOptions(): void {
  DIFFICULTIES.map((item: IDifficulty) => {
    const option: HTMLOptionElement = document.createElement('option');

    option.value = item.id.toString();
    option.innerText = `${item.icon} ${item.title}`;

    if (this.difficulty === item.id) {
      option.selected = true;
    }

    this.difficultySelect.appendChild(option);
  });
}

export { renderMenuWindow };
