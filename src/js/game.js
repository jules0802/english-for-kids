/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
    gameButton, categoryPage, toggler, mainPage, switcher, menu, cardObjectList
} from './constants';

const gameStart = () => {
    //let countOfClicks = 0;

    function shuffle(array) {
        // eslint-disable-next-line no-plusplus
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i 
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(cardObjectList);

    function playWord(cardObject) {
        // console.log(cardObjectList);
        const audio = document.querySelector('audio');
        audio.setAttribute('src', cardObject.audioSrc);
        audio.setAttribute('autoplay', true);
    }

    const repeatButton = document.querySelector('.game-btn.game-mode');

    repeatButton.addEventListener('click', event =>{
        playWord(currentCard);
    });


    /* function playGame(card) {        
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

                     

    } */

    let mode = 'play';
    
    const startGameButton = document.querySelector('.start-game-btn');  


    /*startGameButton.addEventListener('click', event => {        
        countOfClicks++;        
        gameButton.innerHTML = '<img class="icon" src="./assets/icons/repeat.svg" width="40px" height="40px" alt ="repeat">Repeat';
        gameButton.classList.remove('start-game-btn');
        gameButton.classList.add('game-mode');
        shuffle(cardObjectList);
        mode = 'play';          
    })*/

    let currentCard = cardObjectList[0];
    let currentCardIndex = 0;

    let errorsCount = 0; 


    function gameEventHandler(event) {
        console.log('game started');
        console.log(event.target);
        let result;
        //playWord(currentCard); 
        if (event.target.closest('.card').innerText === currentCard.translation) {
            document.querySelector('audio').setAttribute('src', 'assets/audio/correct.mp3');
            const starWin = document.createElement('img');
            starWin.setAttribute('src', './assets/images/star-win.svg');
            starWin.setAttribute('width', '50px');
            starWin.setAttribute('height', '50px');
            document.querySelector('.raiting').appendChild(starWin);
            result = 'win';
            currentCard = cardObjectList[++currentCardIndex];
            nextIteration();
            console.log(currentCard);
            console.log(currentCardIndex);
        } else {
            errorsCount++;
            const starFail = document.createElement('img');
            starFail.setAttribute('src', './assets/images/star.svg');
            starFail.setAttribute('width', '50px');
            starFail.setAttribute('height', '50px');
            document.querySelector('.raiting').appendChild(starFail);
            document.querySelector('audio').setAttribute('src', 'assets/audio/error.mp3');
            result = 'fail';
        }

        console.log(result);

        /*if (currentCardIndex === cardObjectList.length - 1) {
            mode = 'stop';
            console.log('stop');
            return result;
        }        
        gameEventHandler(event);   */
    }

    function displayGameResult() {
        gameButton.classList.remove('.game-mode');
        categoryPage.hidden = true;
        document.querySelector('header').hidden=true;
        document.querySelector('.game-result-container').hidden=false;
        if (errorsCount === 0) {
            document.querySelector('audio').setAttribute('src', 'assets/audio/success.mp3');
        }
        else {
            document.querySelector('audio').setAttribute('src', 'assets/audio/failure.mp3');
            document.querySelector('.game-result').innerText=`${errorsCount} errors`;
            document.querySelector('.game-result-img').setAttribute('src', 'assets/images/failure.jpg');
        }
    }

    function nextIteration() {
        if (currentCardIndex === cardObjectList.length) {
            mode = 'stop';
            console.log('stop');
            displayGameResult();
        }
        if (mode === 'play') {
            console.log(currentCard);
            setTimeout(playWord, 2000 ,currentCard);
            document.querySelector('.category .row').addEventListener('click', gameEventHandler);
        } else {
            document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
        }
        }

        nextIteration();

        document.querySelector('.game-result-button').addEventListener('click', event => {
            document.querySelector('header').hidden = false;
            gameButton.classList.remove('game-mode');
             gameButton.innerHTML = 'Start Game';
            gameButton.classList.add('start-game-btn');
            mainPage.hidden = false;
            document.querySelector('.game-result-container').hidden = true;
        })   

}


export { gameStart }