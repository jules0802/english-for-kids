import {
    button, categoryPage, frontCards, toggler, mainPage, switcher, menu
} from './constants';


const displayToggler = () => {
    if (mainPage.hidden) {
        switcher.hidden = false;
    } else {
        switcher.hidden = true;
    }
};

const modeSwitch = () => {
    toggler.addEventListener('change', () => {
        // console.log(toggler.checked)       
        frontCards.forEach(card => {
            if (toggler.checked) {
                card.classList.add('play-mode');
            }
            else {
                card.classList.remove('play-mode');
            }
        })        

        if (toggler.checked) {
            menu.style.background = 'linear-gradient(180deg, #96f193, #FFD56F)';
            button.hidden = false;
        }
        else {
            menu.style.background = '';
            button.hidden = true;
        }
    })
};

const cardFlipper = () => {    
    categoryPage.addEventListener('click', event => {
        if (event.target.className === 'icon') {
            event.target.closest('.card').classList.add('flipped')
        }
    });

    categoryPage.addEventListener('mouseout', event => {
        if (event.target.closest('.card-container')) {
            event.target.closest('.card').classList.remove('flipped');
        }        
    });

}

export { cardFlipper, displayToggler, modeSwitch };