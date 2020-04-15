import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';

import {
  sideMenu
} from './burger-menu';

import {
  statistics
} from './statistics';

import {
  cardFlipper,
  modeSwitch,
  game
} from './category-page';

sideMenu();
cardFlipper();
modeSwitch();
game();
statistics();

