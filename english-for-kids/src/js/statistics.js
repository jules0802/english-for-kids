/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
  statisticsPage,
  startGameButton,
  categoryPage,
  toggler,
  mainPage,
  switcher,
  menu,
  hamburger,
  repeatButton,
} from './constants';

import {
  cardObjectList
} from './store';

import {
  initialCardsArray, cards,
} from './cards';

import {
  pageGenerate,
} from './pagegeneration';


const statistics = () => {
  const table = document.querySelector('tbody');
  table.innerHTML = '';

  const generatePage = () => {
    for (let i = 1; i < cards.length; i++) {
      cards[i].forEach((element, index) => {
        const newRow = document.createElement('tr');
        const newTh = document.createElement('th');
        
        newTh.setAttribute('scope', 'row');
        newTh.innerText = `${8 * (i - 1) + index + 1}`;

        newRow.appendChild(newTh);
        table.appendChild(newRow);

        let percentOfFails = (element.successPlayClicks + element.failPlayClicks) === 0 ? '0%' : `${Math.round(element.failPlayClicks / (element.successPlayClicks + element.failPlayClicks) * 100)}%`;

        let arr = [
          cards[0][i - 1],
          element.word, 
          element.translation, 
          element.trainClicks, 
          element.successPlayClicks, 
          element.failPlayClicks, 
          percentOfFails
        ];

        arr.forEach((item) => {
          const newTd = document.createElement('td');
          newRow.appendChild(newTd);
          newTd.innerText = item;
        });
      });
    }
  }

  generatePage();

  // reset-button
  document.querySelector('.reset-btn').addEventListener('click', () => {
    table.innerHTML = '';
    for (let i = 1; i < initialCardsArray.length; i++) {
      initialCardsArray[i].forEach((element) => {
        element.trainClicks = 0;
        element.successPlayClicks = 0;
        element.failPlayClicks = 0;
      });
    }
    cards.splice(0, cards.length);
    cards.push(...initialCardsArray);
    generatePage();
  });

  document.querySelector('.difficult-btn').addEventListener('click', () => {
    statisticsPage.classList.add('hidden');
    categoryPage.classList.remove('hidden');
    pageGenerate('Difficult');
  });
};

export { statistics };
