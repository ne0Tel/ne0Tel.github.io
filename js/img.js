function changeImageOnWidth() {
  const logo = document.querySelector('#logo');
  const windowWidth = window.innerWidth;

  if (windowWidth < 645) {
    logo.src = '../img/header/NAAM_2.png';
  } else {
    logo.src = '../img/header/NAAM_1.png';
  }
}

window.onload = changeImageOnWidth;
window.onresize = changeImageOnWidth;