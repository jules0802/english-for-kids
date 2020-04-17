import {
  categoryPage, cardObjectList, startGameButton,
} from './constants';

import {
  cards,
} from './cards';

import {
  modeSwitch,
} from './category-page';

const Card = require('./card.js').default;

const pageGenerate = (category) => {
  function generateDifficultCardsArray() {
    let difficultCards = [];
    for (let i = 1; i < cards.length; i++) {
      cards[i].forEach((element) => {
        const percentOfFailure = (element.successPlayClicks + element.failPlayClicks) === 0 ? 0
          : (element.failPlayClicks / (element.successPlayClicks + element.failPlayClicks));
        if (percentOfFailure > 0) {
          difficultCards.push(element);
        }
      });
    }

    difficultCards = difficultCards.sort().reverse().slice(0, 8);

    return difficultCards;
  }

  cardObjectList.splice(0, cardObjectList.length);

  document.querySelector('h2').innerText = category;
  categoryPage.querySelector('.row').innerHTML = '<div class="raiting"></div>';

  switch (category) {
    case 'Difficult': {
      const difficultCards = generateDifficultCardsArray();
      difficultCards.forEach((cardState) => {
        const createdCard = new Card(cardState);
        createdCard.insertCardIntoRow();
        // cardObjectList.push(createdCard);
        cardObjectList.push(cardState);
      });

      // console.log(cardObjectList);
      break;
    }

    default: {
      const cardList = cards[cards[0].indexOf(category) + 1];

      cardList.forEach((cardState) => {
        const createdCard = new Card(cardState);
        createdCard.insertCardIntoRow();
        // cardObjectList.push(createdCard);
        cardObjectList.push(cardState);
      });
      break;
    }
  }
  modeSwitch();
};

export { pageGenerate };
