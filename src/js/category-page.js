


const displayToggler = () => {
    if (document.querySelector('.main-page').hidden) {
        document.querySelector('.switcher-container').hidden = false;
    } else {
        document.querySelector('.switcher-container').hidden = true;
    }

};

const modeSwitch = () => {
    const toggler = document.querySelector('#switch');

    toggler.addEventListener('change', () => {
        // console.log(toggler.checked)
        const frontCards = document.querySelectorAll('.card .front');
        frontCards.forEach(card => {
            console.log(card);
           /* if (toggler.checked) {
                card.classList.add('play-mode');
            }
            else {
                card.classList.remove('play-mode');
            }*/
        })
    })
};

const cardFlipper = () => {
    const categoryPage = document.querySelector('.category');

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

module.exports = { cardFlipper, displayToggler, modeSwitch };