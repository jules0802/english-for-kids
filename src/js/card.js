import { frontCards } from "./constants";

export default class Card {
    constructor(state) {
        this.word = state.word;
        this.translation = state.translation;
        this.image = state.image;
        this.audioSrc = state.audioSrc;
    }

    createCard() { 
        const bootstrapGrid = document.createElement('div');
        bootstrapGrid.className = 'col-12 col-sm-6 col-md-4 col-xl-3';

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card card mb-1 text-white';

        const frontCard = this.createFrontCard();
        const backCard = this.createBackCard();

        categoryCard.appendChild(frontCard);
        categoryCard.appendChild(backCard);
        cardContainer.appendChild(categoryCard);
        bootstrapGrid.appendChild(cardContainer);

        return bootstrapGrid;
    }

    createCardBody() {
        const newImage = document.createElement('img');
        newImage.className = 'card-image-top';
        newImage.setAttribute('src', `${this.image}`);
        newImage.setAttribute('alt', this.word);
        newImage.setAttribute('src', `${this.image}`);
        console.log(newImage);
       

        const newCardBody = document.createElement('div');
        newCardBody.className ='card-body';
        newCardBody.appendChild(newImage);

        return newCardBody;
    }

    createFrontCard() {
        const front = document.createElement('div');
        front.className = 'front';

        const footer = document.createElement('div');
        footer.className = 'card-footer';
        footer.innerHTML = `${this.word} <img class="icon" src="./assets/icons/hand-point-right-solid.svg" alt ="flip"> `;

        const body = this.createCardBody();
        front.appendChild(body);
        front.appendChild(footer);
        return front;
    }

    createBackCard() {
        const back = document.createElement('div');
        back.className = 'back';

        const footer = document.createElement('div');
        footer.className = 'card-footer';
        footer.innerText = this.translation;

        const body = this.createCardBody();
        back.appendChild(body);
        back.appendChild(footer);
     
        return back;
    }

    insertCardIntoRow() {
        const card = this.createCard();
        document.querySelector('body > div.container-fluid.category > div:nth-child(2)').appendChild(card);
    }

}


