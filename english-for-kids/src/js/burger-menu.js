import {
  categoryPage, mainPage, menu, hamburger, statisticsPage,
} from './constants';

import {
  pageGenerate,
} from './pagegeneration';


import {
  modeSwitch,
} from './category-page';

import {
  statistics,
} from './statistics';

const sideMenu = () => {
  const firstBar = document.querySelector('.line-first');
  const secondBar = document.querySelector('.line-second');
  const thirdBar = document.querySelector('.line-third');

  const open = () => {
    firstBar.style.transform = 'rotate(45deg)';
    secondBar.style.transform = 'rotate(-45deg)';
    firstBar.style.top = '12px';
    secondBar.style.top = '12px';
    thirdBar.style.top = '24px';
    thirdBar.style.opacity = '0';

    menu.classList.add('active');

    hamburger.classList.remove('closed');
    hamburger.classList.add('open');

    hamburger.removeEventListener('click', open);
    // eslint-disable-next-line no-use-before-define
    hamburger.addEventListener('click', close);
  };

  let close = () => {
    firstBar.style.transform = 'rotate(0)';
    secondBar.style.transform = 'rotate(0)';

    thirdBar.style.opacity = '1';

    firstBar.style.top = '0';
    secondBar.style.top = '12px';
    thirdBar.style.top = '24px';

    menu.classList.remove('active');

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

  const switchToCategoryPage = (categoryName) => {
    pageGenerate(categoryName);
    mainPage.classList.add('hidden');
    categoryPage.classList.remove('hidden');
    menu.classList.remove('active');
    close();
  }

  menu.addEventListener('click', (event) => {
    if (event.target.closest('.main-link')) {
      mainPage.classList.remove('hidden');
      categoryPage.classList.add('hidden');
      statisticsPage.classList.add('hidden');
      menu.classList.remove('active');
      close();
      document.querySelectorAll('.link a').forEach((link) => link.classList.remove('active'));
      event.target.closest('.main-link a').classList.add('active');
    } else if (event.target.closest('.link') && !event.target.closest('.statistics-link')) {
      switchToCategoryPage(event.target.closest('.link').innerText);
      statisticsPage.classList.add('hidden');
      document.querySelectorAll('.link a').forEach((link) => link.classList.remove('active'));
      event.target.closest('.link a').classList.add('active');
    } else if (event.target.closest('.statistics-link')) {
      mainPage.classList.add('hidden');
      categoryPage.classList.add('hidden');
      statisticsPage.classList.remove('hidden');
      menu.classList.remove('active');
      close();
      document.querySelectorAll('.link a').forEach((link) => link.classList.remove('active'));
      event.target.closest('.link a').classList.add('active');
      statistics();
    }
  });

  mainPage.addEventListener('click', (event) => {
    if (event.target.closest('.main-card')) {
      const categoryName = event.target.closest('.main-card').innerText;
      switchToCategoryPage(categoryName);
      modeSwitch();
      document.querySelectorAll('.link a').forEach((link) => link.classList.remove('active'));
      document.querySelectorAll('.link a').forEach((link) => {
        if (link.innerText === categoryName) {
          link.classList.add('active');
        }
      });
    }
    if (!event.target.closest('.menu')) {
      menu.classList.remove('active');
      close();
    }
  });

  categoryPage.addEventListener('click', (event) => {
    if (!event.target.closest('.menu')) {
      menu.classList.remove('active');
      close();
    }
  });
};

export { sideMenu };
