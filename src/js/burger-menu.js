import {
    categoryPage, mainPage, menu, hamburger, toggler
} from './constants';

import {
    pageGenerate
} from './pagegeneration';


import {
    displayToggler,
    modeSwitch
} from './category-page';

const sideMenu = () => {
    const one = document.querySelector('.one');
    const two = document.querySelector('.two');
    const three = document.querySelector('.three');


    const open = () => {
        one.style.transform = 'rotate(45deg)';
        two.style.transform = 'rotate(-45deg)';
        one.style.top = '12px';
        two.style.top = '12px';
        three.style.top = '24px';
        three.style.opacity = '0';

        menu.classList.add('active');

        hamburger.classList.remove('closed');
        hamburger.classList.add('open');
        
        hamburger.removeEventListener('click', open);
        // eslint-disable-next-line no-use-before-define
        hamburger.addEventListener('click', close);
    };

    let close = () => {
        
        one.style.transform = 'rotate(0)';
        two.style.transform = 'rotate(0)';

        three.style.opacity = '1';
    
        one.style.top = '0';
        two.style.top = '12px';
        three.style.top = '24px';

        menu.classList.remove('active');;

        hamburger.classList.remove('open');
        hamburger.classList.add('closed');
    
        hamburger.removeEventListener('click', close);
        hamburger.addEventListener('click', open);
    };


    if (hamburger.classList.contains('closed')) {
        hamburger.addEventListener('click', open);
    } else {
        hamburger.addEventListener('click', close);
    }

    function switchToCategoryPage(categoryName) {
        pageGenerate(categoryName);
        mainPage.hidden = true;
        categoryPage.hidden = false;
        //displayToggler();
       // modeSwitch();
        menu.classList.remove('active');
        close();
    }

    menu.addEventListener('click', event => {

        if (event.target.closest('.main-link')) {
            mainPage.hidden = false;
            categoryPage.hidden = true;
            menu.classList.remove('active');
            close();

        } else if (event.target.closest('.link')) {
            switchToCategoryPage(event.target.closest('.link').innerText);
        }

        //toggler.checked = false;
        //displayToggler();
       // modeSwitch();
    });

    mainPage.addEventListener('click', event => {
       // console.log(event.target);
        if (event.target.closest('.main-card')) {
            switchToCategoryPage(event.target.closest('.main-card').innerText);
            //toggler.checked = false;
            //displayToggler();
            modeSwitch();
        }
    })
}

export { sideMenu }