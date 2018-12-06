import { Game } from './components/Game';

import { APP } from './constants/app';

window.onload = () => {
  APP.pageInstance = new Game();
};
