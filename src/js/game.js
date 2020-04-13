/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
    gameButton, categoryPage, toggler, mainPage, switcher, menu, cardObjectList
} from './constants';

const game = () => {
    let countOfClicks = 0;

    function shuffle(array) {
        // eslint-disable-next-line no-plusplus
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i 
            [array[i], array[j]] = [array[j], array[i]];
        }
    }    

    function playWord(cardObject) {        
        // console.log(cardObjectList);
        const audio = document.querySelector('audio');       
        audio.setAttribute('src', cardObject.audioSrc);
        audio.setAttribute('autoplay', true);
    }


    /*function playGame(card) {        
        //for (let i = 0; i < cardObjectList.length; i++) {
        //const cardObject = cardObjectList[0];
        //console.log(cardObject);
        playWord(card); 
        document.querySelector('.category .row').addEventListener('click', event => {
                if (event.target.closest('.card').innerText === cardObject.translation) {
                    const starWin = document.createElement('img');
                    starWin.setAttribute('src', './assets/images/star-win.svg');
                    starWin.setAttribute('width', '50px');
                    starWin.setAttribute('height', '50px');                 
                    document.querySelector('.raiting').appendChild(starWin);  
                    result = 'win';
                } else {
                    const starFail = document.createElement('img');
                    starFail.setAttribute('src', './assets/images/star.svg');
                    starFail.setAttribute('width', '50px');
                    starFail.setAttribute('height', '50px');                    
                    document.querySelector('.raiting').appendChild(starFail);
                }
            });

                     

    }*/

    let mode;   

   /* gameButton.addEventListener('click', event => {        
            countOfClicks++;
            if (countOfClicks === 1) {
                gameButton.innerHTML = '<img class="icon" src="./assets/icons/repeat.svg" width="40px" height="40px" alt ="repeat">Repeat';
                gameButton.classList.add('game-mode');
                /*shuffle(cardObjectList);
                cardObjectList.forEach(card => {
                    playGame(card);
                });   
                mode = 'play';                
            }        
    })

    function gameEventHandler(event) {
        for (let i = 0; i < cardObjectList.length; i++) {
            let cardObject = cardObjectList[i];
            playWord(cardObject); 
                if (event.target.closest('.card').innerText === cardObject.translation) {
                    const starWin = document.createElement('img');
                    starWin.setAttribute('src', './assets/images/star-win.svg');
                    starWin.setAttribute('width', '50px');
                    starWin.setAttribute('height', '50px');                 
                    document.querySelector('.raiting').appendChild(starWin);  
                    result = 'win';
                } else {
                    const starFail = document.createElement('img');
                    starFail.setAttribute('src', './assets/images/star.svg');
                    starFail.setAttribute('width', '50px');
                    starFail.setAttribute('height', '50px');                    
                    document.querySelector('.raiting').appendChild(starFail);
                }
        }
    }

    document.querySelector('.category .row').addEventListener('click', gameEventHandler(event));*/

}

export { game }