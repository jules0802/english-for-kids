import {
    categoryPage, cardObjectList 
} from './constants';

import {
    cards
} from './cards';

import {  
  modeSwitch
} from './category-page';

const Card = require('./card.js').default;

const pageGenerate = (category) => {

    cardObjectList.splice(0, cardObjectList.length);

    document.querySelector('h2').innerText = category;
    categoryPage.querySelector('.row').innerHTML = '<div class="raiting"></div>';

    const cardList = cards[cards[0].indexOf(category) + 1];

    cardList.forEach(cardState => {
        const createdCard = new Card(cardState);
        createdCard.insertCardIntoRow();
        cardObjectList.push(createdCard);
    })  

    modeSwitch();
}

export { pageGenerate }