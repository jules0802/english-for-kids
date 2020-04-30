/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
  startGameButton, categoryPage, toggler, mainPage, switcher, menu, repeatButton,
} from './constants';

import {
  cardObjectList
} from './store';

import {
  gameStart,
} from './game';

import {
  cards,
} from './cards';


const modeSwitch = () => {
  const frontCards = document.querySelectorAll('.card .front');
  const mainCards = document.querySelectorAll('.main-card');

  const checkToggler = () => {
    if (toggler.checked) {
      menu.style.background = 'linear-gradient(180deg, #96f193, #FFD56F)';
      startGameButton.classList.remove('hidden');
      repeatButton.classList.add('hidden');
      frontCards.forEach((card) => {
        card.classList.add('play-mode');
        card.querySelector('.card-footer').classList.add('hidden');
      });
      mainCards.forEach((card) => {
        card.classList.add('play-mode');
      });
    } else {
      menu.style.background = '';
      startGameButton.classList.add('hidden');
      repeatButton.classList.add('hidden');
      frontCards.forEach((card) => {
        card.classList.remove('play-mode');
        card.querySelector('.card-footer').classList.remove('hidden');
      });
      mainCards.forEach((card) => {
        card.classList.remove('play-mode');
      });
    }
  }

  toggler.addEventListener('change', () => {
    frontCards.forEach((card) => {
      if (toggler.checked) {
        card.classList.add('play-mode');
        card.querySelector('.card-footer').classList.add('hidden');
      } else {
        card.classList.remove('play-mode');
        card.querySelector('.card-footer').classList.remove('hidden');
      }
    });

    mainCards.forEach((card) => {
      if (toggler.checked) {
        card.classList.add('play-mode');
      } else {
        card.classList.remove('play-mode');
      }
    });

    checkToggler();
  });

  checkToggler();
};


const cardFlipper = () => {
  categoryPage.addEventListener('click', (event) => {
    if (!toggler.checked) {
      if (event.target.closest('.card-container')) {
        const wordToSay = event.target.closest('.card-container .front').innerText;
        const categoryName = categoryPage.querySelector('h2').innerText;

        if (categoryName !== 'Difficult') {
          cards[cards[0].indexOf(categoryName) + 1]
            .find((item) => item.word === wordToSay).trainClicks++;
        }

        if (event.target.className === 'icon') {
          event.target.closest('.card').classList.add('flipped');
        } else {
          const audioPath = cardObjectList.find((cardObj) => cardObj.word === wordToSay).audioSrc;
          const audio = document.querySelector('audio');
          audio.setAttribute('src', audioPath);
          audio.setAttribute('autoplay', true);
        }
      }
    }
  });

  categoryPage.addEventListener('mouseout', (event) => {
    if (event.relatedTarget.classList[1] === 'js-container'
            || event.relatedTarget.classList[2] === 'js-row'
            || event.relatedTarget.classList[4] === 'js-col') {
      event.target.closest('.card-container').querySelector('.card').classList.remove('flipped');
    }
  });
};

const game = () => {
  startGameButton.addEventListener('click', () => {
    startGameButton.classList.add('hidden');
    repeatButton.classList.remove('hidden');
    gameStart();
  });
};

export {
  cardFlipper, modeSwitch, game,
};
