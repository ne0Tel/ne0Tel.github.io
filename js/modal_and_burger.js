// Modal

const modalWindow = document.querySelector('.modal');
const overlayFixed = document.querySelector('.overlay');

const btnOpen = document.querySelector('#open-modal');
const btnClose = document.querySelector('#delete-modal');

btnOpen.addEventListener('click', () =>{
  modalWindow.classList.add('active');
  overlayFixed.classList.add('active');
});

btnClose.addEventListener('click', () =>{
  modalWindow.classList.remove('active');
  overlayFixed.classList.remove('active');
});

// Burger

const burgerMenu = document.querySelector(".nav-menu-burger");

const btnOpen_2 = document.querySelector('#open-burger');
const btnClose_2 = document.querySelector('#delete-burger');

btnOpen_2.addEventListener('click', () =>{
  burgerMenu.classList.add('active');
  overlayFixed.classList.add('active');
});

btnClose_2.addEventListener('click', () =>{
  overlayFixed.classList.remove('active');
  burgerMenu.classList.remove('active');
});
