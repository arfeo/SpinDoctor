import { Menu } from './components/Menu';

import { APP } from './constants/global';

window.onload = (): void => {
  APP.pageInstance = new Menu();
};
