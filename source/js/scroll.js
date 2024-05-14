document.querySelectorAll('.nav-link')[0].addEventListener('click', () => {
    const newMaterials = document.querySelector('.car-japan')
    window.scrollTo(0, newMaterials.offsetTop);
});

document.querySelectorAll('.nav-link')[1].addEventListener('click', () => {
    const aboutUs = document.querySelector('.car-china-and-korea')
    window.scrollTo(0, aboutUs.offsetTop);
});

document.querySelectorAll('.nav-link')[2].addEventListener('click', () => {
    const contact = document.querySelector('.car-china-and-korea')
    window.scrollTo(0, contact.offsetTop);
});

//--------------------------------------------------------------------------------

document.querySelectorAll('.dropdown-item')[0].addEventListener('click', () => {
    const contact = document.querySelector('.about-us')
    window.scrollTo(0, contact.offsetTop);
});

document.querySelectorAll('.dropdown-item')[1].addEventListener('click', () => {
    const contact = document.querySelector('.reviews__bottom-side')
    window.scrollTo(0, contact.offsetTop);
});

document.querySelectorAll('.dropdown-item')[2].addEventListener('click', () => {
    const contact = document.querySelector('.contact-information')
    window.scrollTo(0, contact.offsetTop);
});

//--------------------------------------------------------------------------------

document.querySelectorAll('.general-button__trio')[0].addEventListener('click', () => {
    const contact = document.querySelector('.contact-information')
    window.scrollTo(0, contact.offsetTop);
});