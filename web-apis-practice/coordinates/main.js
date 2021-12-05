'use strict';

const target = document.querySelector('.target');
const { width: targetWidth, height: targetHeight } = target.getBoundingClientRect();
const targetWidthHalf = targetWidth * 0.5;
const targetHeightHalf = targetHeight * 0.5;
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const positionText = document.querySelector('.positionText');

/*
window.addEventListener('mousemove', (event) => {
  // Target Image Move
  target.style.left = `${event.clientX}px`;
  target.style.top = `${event.clientY}px`;

  // Line Move
  horizontal.style.top = `${event.clientY}px`;
  vertical.style.left = `${event.clientX}px`;
  vertical.style.height = `${window.innerHeight}px`;

  // Text Move
  positionText.innerText = `${event.clientX}px, ${event.clientY}px`;
  positionText.style.left = `${event.clientX + 20}px`;
  positionText.style.top = `${event.clientY + 20}px`;
});
*/

window.addEventListener('mousemove', (event) => {
  // Target Image Move
  target.style.transform = `translate(${event.clientX - targetWidthHalf}px, ${
    event.clientY - targetHeightHalf
  }px)`;

  // Line Move
  horizontal.style.transform = `translate(0px, ${event.clientY}px)`;
  vertical.style.transform = `translate(${event.clientX}px, 0px)`;

  // Text Move
  positionText.innerText = `${event.clientX}px, ${event.clientY}px`;
  positionText.style.transform = `translate(${event.clientX + 20}px, ${event.clientY + 20}px)`;
});
