import {
    button, categoryPage, frontCards, toggler, mainPage, switcher, menu, MODES, hamburger
} from './constants';

import {
    cards
} from './cards';

//import Card from './card';

const Card = require('./card.js').default;

const pageGenerate = (category) => {
    document.querySelector('h2').innerText = category;

    console.log(category);
    console.log(cards[0].indexOf(category));

    const cardList = cards[cards[0].indexOf(category) + 1];

    console.log(cardList);

    cardList.forEach(cardState => {
        const createdCard = new Card(cardState);
        createdCard.insertCardIntoRow();
    })

    /*const cardList = new CardList();
 
    toggler.addEventListener('change', () => {
        cardList.changeMode(MODES.play);

    })*/

   /*/ class CardList {
        constructor(state) {
            this.state = state;
            this.list = document.createElement();

            this.state.forEach(singleState => {
                const card = new Card(singleState);
                this.wordList.append(card.createElement);
            });

            this.cards = this.state.map(singleState => {
                const card = new Card(singleState);
            });

        }

        changeMode(mode) {
            this.cards.forEach(card => this.changeMode(mode));
        }

    }*/

    
}

export { pageGenerate}