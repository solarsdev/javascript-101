'use strict';

const btn = document.querySelector('.btn');
const rabbit = document.querySelector('.rabbit');

btn.addEventListener('click', () => {
  rabbit.scrollIntoView({
    //top: rabbitDOMRect.y + rabbitDOMRect.height * 0.5 - document.documentElement.clientHeight * 0.5,
    block: 'center',
    behavior: 'smooth',
  });
});
