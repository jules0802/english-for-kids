/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import {
    startGameButton, categoryPage, mainPage, cardObjectList, repeatButton, toggler
} from './constants';

const gameStart = () => {

    function shuffle(array) {    
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(cardObjectList);

    function playWord(cardObject) {
        const audio = document.querySelector('audio');
        audio.setAttribute('src', cardObject.audioSrc);
        audio.setAttribute('autoplay', true);
    }

    let mode = 'play';   
    let currentCard = cardObjectList[0];
    let currentCardIndex = 0;
    let errorsCount = 0; 

    repeatButton.addEventListener('click', () => {
        playWord(currentCard);
    });

    function gameEventHandler(event) {
        if (event.target.closest('.card').style.opacity !== '0.6') {
            let result;
            if (event.target.closest('.card').innerText === currentCard.translation) {
                event.target.closest('.card').style.opacity = 0.6;
                document.querySelector('audio').setAttribute('src', 'assets/audio/correct.mp3');
                const starWin = document.createElement('img');
                starWin.setAttribute('src', './assets/images/star-win.svg');
                starWin.setAttribute('width', '50px');
                starWin.setAttribute('height', '50px');
                document.querySelector('.raiting').appendChild(starWin);
                result = 'win';
                currentCard = cardObjectList[++currentCardIndex];
                nextIteration();
            } else if (event.target.closest('.card')) {
                errorsCount++;
                const starFail = document.createElement('img');
                starFail.setAttribute('src', './assets/images/star.svg');
                starFail.setAttribute('width', '50px');
                starFail.setAttribute('height', '50px');
                document.querySelector('.raiting').appendChild(starFail);
                document.querySelector('audio').setAttribute('src', 'assets/audio/error.mp3');
                result = 'fail';
            }
        }
    }

    function goToMain() {
        document.querySelector('header').hidden = false;
        startGameButton.hidden = false;
        repeatButton.hidden = true;
        mainPage.hidden = false;
        document.querySelector('.game-result-container').hidden = true;
    }

    function displayGameResult() {
        startGameButton.hidden = true;
        repeatButton.hidden = true;
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
        console.log(toggler.checked);
        if (toggler.checked) {
            if (currentCardIndex === cardObjectList.length) {
                mode = 'stop';
                displayGameResult();
                setTimeout(goToMain, 5000);
                document.querySelector('.raiting').innerHTML = '';                
            }
            if (mode === 'play') {
                setTimeout(playWord, 2000, currentCard);
                document.querySelector('.category .row').addEventListener('click', gameEventHandler);
            } else {
                document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
            }
        } else {
            console.log('do');
            mode = 'stop';
            document.querySelector('.category .row').removeEventListener('click', gameEventHandler);
            document.querySelectorAll('.card').forEach(card => { card.style.opacity = 1 });
            startGameButton.hidden = true;
            repeatButton.hidden = true;
            document.querySelector('.game-result-container').hidden = true;
            document.querySelector('.raiting').innerHTML = ''; 
        }
    }

    toggler.addEventListener('change', () => {
        if (!toggler.checked) {
        nextIteration();
        }
    })

    nextIteration();        
}

export { gameStart }