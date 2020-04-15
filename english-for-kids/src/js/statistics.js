import {
    statisticsPage,
    startGameButton,
    categoryPage,
    toggler,
    mainPage,
    switcher,
    menu,
    hamburger,
    cardObjectList,
    repeatButton
} from './constants';

import {
    cards
} from './cards';

const statistics = () => {

    const table = document.querySelector('tbody');

    function generatePage() {
        for (let i = 1; i < cards.length; i++) {
            cards[i].forEach((element, index) => {
                let newRow = document.createElement('tr');

                let newTh = document.createElement('th');
                newTh.setAttribute('scope', 'row');
                newTh.innerText = `${8 * (i - 1) + index + 1}`;

                newRow.appendChild(newTh);
                table.appendChild(newRow);

                for (let j = 0; j < 8; j++) {
                    let newTd = document.createElement('td');
                    newRow.appendChild(newTd);

                    switch (j) {
                        case 0: {
                            newTd.innerText = cards[0][i-1];
                            break;
                        } 
                        case 1: {
                            newTd.innerText = element.word;
                            break;
                        }
                        case 2: {
                            newTd.innerText = element.translation;
                            break;
                        }
                    }
                }              
                
            });
       }
    }

    generatePage();

}

export {statistics}