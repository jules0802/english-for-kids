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
  cardObjectList,
  repeatButton,
} from './constants';

import {
  initialCardsArray, cards,
} from './cards';

import {
  pageGenerate,
} from './pagegeneration';


const statistics = () => {
  const table = document.querySelector('tbody');
  table.innerHTML = '';

  function generatePage() {
    for (let i = 1; i < cards.length; i++) {
      cards[i].forEach((element, index) => {
        const newRow = document.createElement('tr');

        const newTh = document.createElement('th');
        newTh.setAttribute('scope', 'row');
        newTh.innerText = `${8 * (i - 1) + index + 1}`;

        newRow.appendChild(newTh);
        table.appendChild(newRow);

        for (let j = 0; j < 7; j++) {
          const newTd = document.createElement('td');
          newRow.appendChild(newTd);

          switch (j) {
            case 0: {
              newTd.innerText = cards[0][i - 1];
              break;
            }
            case 1: {
              newTd.innerText = element.word;
              break;
            }
            case 2: {
              newTd.innerText = element.translation;
              break;
            }
            case 3: {
              newTd.innerText = element.trainClicks;
              break;
            }
            case 4: {
              newTd.innerText = element.successPlayClicks;
              break;
            }
            case 5: {
              newTd.innerText = element.failPlayClicks;
              break;
            }
            default: {
              newTd.innerText = (element.successPlayClicks + element.failPlayClicks) === 0 ? '0%' : `${Math.round(element.failPlayClicks / (element.successPlayClicks + element.failPlayClicks) * 100)}%`;
              break;
            }
          }
        }
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
    // document.querySelectorAll('.table_sort thead').forEach((tableTH) => tableTH.addEventListener('click', (event) => getSort(event)));
  });

  document.querySelector('.difficult-btn').addEventListener('click', () => {
    statisticsPage.hidden = true;
    categoryPage.hidden = false;
    pageGenerate('Difficult');
  });
};

export { statistics };
