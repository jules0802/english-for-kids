import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import {
  button, categoryPage, toggler, mainPage, switcher, menu
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
  modeSwitch
} from './category-page';

import {
  pageGenerate
} from './pagegeneration';

import {
  Card
} from './card';

sideMenu();
cardFlipper();
//modeSwitch();
