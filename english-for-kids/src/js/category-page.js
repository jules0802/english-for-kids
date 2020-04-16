/* eslint-disable no-param-reassign */
import {
    startGameButton, categoryPage, toggler, mainPage, switcher, menu, cardObjectList, repeatButton
} from './constants';

import {
    gameStart
} from './game';

import {
    cards
} from './cards';


const displayToggler = () => {
    if (mainPage.hidden) {
        switcher.hidden = false;
    } else {
        switcher.hidden = true;
    }
};

const modeSwitch = () => {

    const frontCards = document.querySelectorAll('.card .front');
    const mainCards = document.querySelectorAll('.main-card');

    function checkToggler() {
        if (toggler.checked) {
            menu.style.background = 'linear-gradient(180deg, #96f193, #FFD56F)';
            startGameButton.hidden = false;
            repeatButton.hidden = true;
            frontCards.forEach(card => {           
                card.classList.add('play-mode');
                card.querySelector('.card-footer').hidden = true;
            });
             mainCards.forEach(card => {           
                card.classList.add('play-mode');
            });
        }
        else {
            menu.style.background = '';
            startGameButton.hidden = true;
            repeatButton.hidden = true;
            frontCards.forEach(card => {
                card.classList.remove('play-mode');
                card.querySelector('.card-footer').hidden = false;
            });
            mainCards.forEach(card => {
                card.classList.remove('play-mode');
            });
        }
    }
    
    toggler.addEventListener('change', () => { 
        frontCards.forEach(card => {
            if (toggler.checked) {
                card.classList.add('play-mode');
                card.querySelector('.card-footer').hidden = true;
            }
            else {
                card.classList.remove('play-mode');
                card.querySelector('.card-footer').hidden = false;
            }
        })

        mainCards.forEach(card => {
            if (toggler.checked) {
                card.classList.add('play-mode');
            }
            else {
                card.classList.remove('play-mode');
            }
        })   

        checkToggler();
    })
   
    checkToggler();
};


const cardFlipper = () => {  
    
    categoryPage.addEventListener('click', event => {
        if (!toggler.checked) {
            if (event.target.closest('.card-container')) {
                const wordToSay = event.target.closest('.card-container .front').innerText;
                const categoryName = categoryPage.querySelector('h2').innerText;

                if (categoryName !== 'Difficult') {
                    cards[cards[0].indexOf(categoryName) + 1].find(item => item.word === wordToSay).trainClicks++;
                }

                if (event.target.className === 'icon') {
                    event.target.closest('.card').classList.add('flipped')
                } else {
                    const audioPath = cardObjectList.find(cardObj => cardObj.word === wordToSay).audioSrc;
                    const audio = document.querySelector('audio');
                    audio.setAttribute('src', audioPath);
                    audio.setAttribute('autoplay', true);
                }
            }
        }
    });

    categoryPage.addEventListener('mouseout', event => {
        if (event.target.closest('.card-container') && !toggler.checked) {            
            //event.target.closest('.card').classList.remove('flipped');
            event.target.closest('.card-container').querySelector('.card').classList.remove('flipped');
        }
    });

}

const game = () => {   
    
    let countOfClicks = 0;

    startGameButton.addEventListener('click', () => {
        countOfClicks++;
        startGameButton.hidden = true;
        repeatButton.hidden = false;                     
        gameStart();  
    })
}

export { cardFlipper, displayToggler, modeSwitch, game };