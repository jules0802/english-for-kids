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

import {
  cards
} from './cards';

//let cards1 = JSON.parse(localStorage.getItem('cardsArray'));

sideMenu();
cardFlipper();
modeSwitch();
game();
//statistics();

window.addEventListener('unload', () => localStorage.setItem('cardsArray', JSON.stringify(cards)));

