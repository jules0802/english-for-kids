import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import {
  gameButton, categoryPage, toggler, mainPage, switcher, menu
} from './constants';

import {
  cards
} from './cards';

import {
  sideMenu
} from './burger-menu';

import {
  cardFlipper,
  displayToggler,
  modeSwitch,
  game
} from './category-page';

import {
  pageGenerate
} from './pagegeneration';

import {
  Card
} from './card';

import {
  gameStart
} from './game';

sideMenu();
cardFlipper();
modeSwitch();
game();

