/* eslint-disable no-param-reassign */
import {
    gameButton, categoryPage, toggler, mainPage, switcher, menu, cardObjectList
} from './constants';


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
            gameButton.hidden = false;
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
            gameButton.hidden = true;
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
        if (event.target.className === 'icon') {
            event.target.closest('.card').classList.add('flipped')
        } else if (event.target.closest('.card-container') && !event.target.closest('.game-mode')) {          
            const wordToSay = event.target.closest('.card-container .front').innerText;       
            const audioPath = cardObjectList.find(cardObj => cardObj.word === wordToSay).audioSrc;           
           // const audio = new Audio(`../${audioPath}`);
            const audio = document.querySelector('audio');
            audio.setAttribute('src', audioPath);
            audio.setAttribute('autoplay', true);
        }
        
    });

    categoryPage.addEventListener('mouseout', event => {
        if (event.target.closest('.card-container')) {
            event.target.closest('.card').classList.remove('flipped');
        }        
    });

}

export { cardFlipper, displayToggler, modeSwitch };