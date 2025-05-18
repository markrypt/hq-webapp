document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const closeMenu = document.querySelector('.close-menu');
  const sideNav = document.querySelector('.side-nav');
  const overlay = document.querySelector('.overlay');

  menuIcon.addEventListener('click', () => {
    sideNav.classList.add('active');
    overlay.classList.add('active');
  });

  closeMenu.addEventListener('click', () => {
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
  });
});
