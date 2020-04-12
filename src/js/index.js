import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
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


sideMenu();
cardFlipper();
displayToggler();
modeSwitch();

