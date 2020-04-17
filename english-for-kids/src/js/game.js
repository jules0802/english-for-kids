/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
  startGameButton, categoryPage, mainPage, cardObjectList, repeatButton, toggler, menu,
} from './constants';

import {
  cards,
} from './cards';

import {
  modeSwitch,
} from './category-page';


const gameStart = () => {
  console.log('at start ', cardObjectList);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(cardObjectList);
  console.log('after shuffle ', cardObjectList);


  function playWord(cardObject) {
    const audio = document.querySelector('audio');
    audio.setAttribute('src', cardObject.audioSrc);
    audio.setAttribute('autoplay', true);
  }

  let mode = 'play';
  console.log('mode ', mode);
  let currentCard = cardObjectList[0];
  console.log('currentCard ', currentCard);
  let currentCardIndex = 0;
  let errorsCount = 0;
  console.log('errorsCount ', errorsCount);

  repeatButton.addEventListener('click', () => {
    playWord(currentCard);
  });

  const categoryName = categoryPage.querySelector('h2').innerText;

  function gameEventHandler(event) {
    if (event.target.closest('.card').style.opacity !== '0.6') {
      console.log('start enet handling at category', categoryName);
      console.log(event.target);
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

        console.log(currentCard);

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

        console.log(currentCard);

        if (categoryName !== 'Difficult') {
          cards[cards[0].indexOf(categoryName) + 1]
            .find((item) => item.translation === currentCard.translation).failPlayClicks++;
        }
      }
    }

    // localStorage.setItem('cardsArray', cards);
  }

  function goToMain() {
    errorsCount = 0;
    document.querySelector('.raiting').innerHTML = '';
    document.querySelector('header').hidden = false;
    startGameButton.hidden = false;
    repeatButton.hidden = true;
    mainPage.hidden = false;
    document.querySelector('.game-result-container').hidden = true;
    document.querySelectorAll('.link a').forEach((link) => link.classList.remove('active'));
    document.querySelector('.main-link a').classList.add('active');
    console.log(cards);
    document.querySelector('.game-result').innerText = 'You win!';
    document.querySelector('.game-result-img').setAttribute('src', 'assets/images/success.jpg');
  }

  function displayGameResult() {
    startGameButton.hidden = true;
    repeatButton.hidden = true;
    categoryPage.hidden = true;
    document.querySelector('header').hidden = true;
    document.querySelector('.game-result-container').hidden = false;
    if (errorsCount === 0) {
      document.querySelector('audio').setAttribute('src', 'assets/audio/success.mp3');
    } else {
      document.querySelector('audio').setAttribute('src', 'assets/audio/failure.mp3');
      document.querySelector('.game-result').innerText = `${errorsCount} errors`;
      document.querySelector('.game-result-img').setAttribute('src', 'assets/images/failure.jpg');
    }
  }

  function nextIteration() {
    console.log('iteration ', currentCardIndex);
    console.log('currentCardIndex', currentCardIndex);
    console.log('toggler.checked ', toggler.checked);
    console.log('cardObjectList', cardObjectList);
    // console.log(currentCardIndex);
    console.log('currentCardIndex === cardObjectList.length', currentCardIndex === cardObjectList.length);

    if (toggler.checked) {
      if (currentCardIndex === cardObjectList.length) {
        console.log('stop');
        mode = 'stop';
        displayGameResult();
        setTimeout(goToMain, 5000);
        document.querySelector('.raiting').innerHTML = '';
        document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
        console.log('listener removed');
      }
      if (mode === 'play') {
        setTimeout(playWord, 2000, currentCard);
        document.querySelector('.category .row').addEventListener('click', gameEventHandler);
        console.log('listener added');
      } else {
        document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
        console.log('listener removed');
      }
    } else {
      console.log('do');
      mode = 'stop';
      document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
      console.log('listener removed');
      document.querySelectorAll('.card').forEach((card) => { card.style.opacity = 1; });
      startGameButton.hidden = true;
      repeatButton.hidden = true;
      document.querySelector('.game-result-container').hidden = true;
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
