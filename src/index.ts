import { Menu } from './components/Menu';

import { APP } from './constants/game';

window.onload = (): void => {
  APP.pageInstance = new Menu();
};
