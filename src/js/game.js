/* eslint-disable no-param-reassign */
import {
    gameButton, categoryPage, toggler, mainPage, switcher, menu, cardObjectList
} from './constants';

const game = () => {
    let countOfClicks = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i 
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function playWords() {
        shuffle(cardObjectList);
        console.log(cardObjectList);
    }

    gameButton.addEventListener('click', event => {
        countOfClicks = (countOfClicks + 1) % 2;
        if (countOfClicks === 1) {
            gameButton.innerHTML = '<img class="icon" src="./assets/icons/repeat.svg" width="40px" height="40px" alt ="repeat">Restart game';
            playWords();
        } else {
            gameButton.innerText = 'Start game';
        }
    } )

    
}

export { game }