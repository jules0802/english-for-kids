const sideMenu = () => {
    const icon = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
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

        icon.classList.remove('closed');
        icon.classList.add('open');
        
        icon.removeEventListener('click', open);
        // eslint-disable-next-line no-use-before-define
        icon.addEventListener('click', close);
    };

    let close = () => {
        
        one.style.transform = 'rotate(0)';
        two.style.transform = 'rotate(0)';

        three.style.opacity = '1';
    
        one.style.top = '0';
        two.style.top = '12px';
        three.style.top = '24px';

        menu.classList.remove('active');;

        icon.classList.remove('open');
        icon.classList.add('closed');
    
        icon.removeEventListener('click', close);
        icon.addEventListener('click', open);
    };


    if(icon.classList.contains('closed')){
        icon.addEventListener('click', open);
    } else {
        icon.addEventListener('click', close);
    }
}

  module.exports = { sideMenu };