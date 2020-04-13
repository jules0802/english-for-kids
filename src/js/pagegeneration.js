import {
    categoryPage, cardObjectList 
} from './constants';

import {
    cards
} from './cards';

const Card = require('./card.js').default;



const pageGenerate = (category) => {

    cardObjectList.splice(0, cardObjectList.length);

    document.querySelector('h2').innerText = category;
    categoryPage.querySelector('.row').innerHTML = '';

    //console.log(category);
    //console.log(cards[0].indexOf(category));

    const cardList = cards[cards[0].indexOf(category) + 1];
    console.log(cardList);

    cardList.forEach(cardState => {
        const createdCard = new Card(cardState);
        createdCard.insertCardIntoRow();
        cardObjectList.push(createdCard);
    })  
    
    console.log(cardObjectList);
}

export { pageGenerate }