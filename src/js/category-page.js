/* eslint-disable no-param-reassign */
import {
    button, categoryPage, toggler, mainPage, switcher, menu, cardObjectList
} from './constants';


const displayToggler = () => {
    if (mainPage.hidden) {
        switcher.hidden = false;
    } else {
        switcher.hidden = true;
    }
};

const modeSwitch = () => {

    function checkToggler() {
        if (toggler.checked) {
            menu.style.background = 'linear-gradient(180deg, #96f193, #FFD56F)';
            button.hidden = false;
        }
        else {
            menu.style.background = '';
            button.hidden = true;
        }
    }
    
    toggler.addEventListener('change', () => {
       
        const frontCards = document.querySelectorAll('.card .front');
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

        checkToggler();
    })
   
    checkToggler();
};


const cardFlipper = () => {    
    categoryPage.addEventListener('click', event => {
        if (event.target.className === 'icon') {
            event.target.closest('.card').classList.add('flipped')
        } else if (event.target.closest('.card-container')) {          
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