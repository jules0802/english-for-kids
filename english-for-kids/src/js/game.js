/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
  startGameButton, categoryPage, mainPage, repeatButton, toggler, menu,
} from './constants';

import {
  cardObjectList
} from './store';

import {
  cards,
} from './cards';

import {
  modeSwitch,
} from './category-page';


const gameStart = () => {

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(cardObjectList);

  const playWord = (cardObject) => {
    const audio = document.querySelector('audio');
    audio.setAttribute('src', cardObject.audioSrc);
    audio.setAttribute('autoplay', true);
  }

  let mode = 'play';
  let currentCard = cardObjectList[0];
  let currentCardIndex = 0;
  let errorsCount = 0;

  repeatButton.addEventListener('click', () => {
    playWord(currentCard);
  });

  const categoryName = categoryPage.querySelector('h2').innerText;

  const gameEventHandler = (event) => {
    if (event.target.closest('.card').style.opacity !== '0.6') {
      if (event.target.closest('.card').innerText === currentCard.translation) {
        event.target.closest('.card').style.opacity = 0.6;
        document.querySelector('audio').setAttribute('src', 'assets/audio/correct.mp3');
        const starWin = document.createElement('img');
        starWin.setAttribute('src', './assets/images/star-win.svg');
        starWin.setAttribute('width', '50px');
        starWin.setAttribute('height', '50px');
        document.querySelector('.raiting').appendChild(starWin);

        if (categoryName !== 'Difficult') {
          cards[cards[0].indexOf(categoryName) + 1]
            .find((item) => item.translation === currentCard.translation).successPlayClicks++;
        }

        currentCard = cardObjectList[++currentCardIndex];
        nextIteration();
      } else if (event.target.closest('.card')) {
        errorsCount++;
        const starFail = document.createElement('img');
        starFail.setAttribute('src', './assets/images/star.svg');
        starFail.setAttribute('width', '50px');
        starFail.setAttribute('height', '50px');
        document.querySelector('.raiting').appendChild(starFail);
        document.querySelector('audio').setAttribute('src', 'assets/audio/error.mp3');

        if (categoryName !== 'Difficult') {
          cards[cards[0].indexOf(categoryName) + 1]
            .find((item) => item.translation === currentCard.translation).failPlayClicks++;
        }
      }
    }
  }

  const goToMain = () => {
    errorsCount = 0;
    document.querySelector('.raiting').innerHTML = '';
    document.querySelector('header').classList.remove('hidden');
    startGameButton.classList.remove('hidden');
    repeatButton.classList.add('hidden');
    mainPage.classList.remove('hidden');
    document.querySelector('.game-result-container').classList.add('hidden');
    document.querySelectorAll('.link a').forEach((link) => link.classList.remove('active'));
    document.querySelector('.main-link a').classList.add('active');
    document.querySelector('.game-result').innerText = 'You win!';
    document.querySelector('.game-result-img').setAttribute('src', 'assets/images/success.jpg');
  }

  const displayGameResult = () => {
    startGameButton.classList.add('hidden');
    repeatButton.classList.add('hidden');
    categoryPage.classList.add('hidden');
    document.querySelector('header').classList.add('hidden');
    document.querySelector('.game-result-container').classList.remove('hidden');
    if (errorsCount === 0) {
      document.querySelector('audio').setAttribute('src', 'assets/audio/success.mp3');
    } else {
      document.querySelector('audio').setAttribute('src', 'assets/audio/failure.mp3');
      document.querySelector('.game-result').innerText = `${errorsCount} errors`;
      document.querySelector('.game-result-img').setAttribute('src', 'assets/images/failure.jpg');
    }
  }

  const nextIteration = () => {
    if (toggler.checked) {
      if (currentCardIndex === cardObjectList.length) {
        mode = 'stop';
        displayGameResult();
        setTimeout(goToMain, 5000);
        document.querySelector('.raiting').innerHTML = '';
        document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
       }
      if (mode === 'play') {
        setTimeout(playWord, 2000, currentCard);
        document.querySelector('.category .row').addEventListener('click', gameEventHandler);
      } else {
        document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
      }
    } else {
      mode = 'stop';
      document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
      document.querySelectorAll('.card').forEach((card) => { card.style.opacity = 1; });
      startGameButton.classList.add('hidden');
      repeatButton.classList.add('hidden');
      document.querySelector('.game-result-container').classList.add('hidden');
      document.querySelector('.raiting').innerHTML = '';
      document.querySelector('.game-result').innerText = 'You win!';
      document.querySelector('.game-result-img').setAttribute('src', 'assets/images/success.jpg');
    }
  }

  toggler.addEventListener('change', () => {
    if (!toggler.checked) {
      nextIteration();
    }
  });

  menu.addEventListener('click', (event) => {
    if (toggler.checked) {
      if (event.target.closest('.link')) {
        toggler.checked = false;
        nextIteration();
        toggler.checked = true;
        modeSwitch();
      }
    }
  });

  nextIteration();
};

export { gameStart };
