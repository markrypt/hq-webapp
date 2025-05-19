// common.js - Shared JavaScript functionality for Markrypt website

document.addEventListener('DOMContentLoaded', () => {
  // Set active navigation item
  const setActiveNavItem = () => {
    const pagePath = window.location.pathname;
    const current = pagePath.split('/').pop() || 'index';
    const cleanCurrent = current.replace('.html', '');
    
    document.querySelectorAll('.navigation .nav-item').forEach(item => {
      item.classList.remove('active'); // Ensure all are inactive first
      const href = item.getAttribute('href');
      
      // Handle home page ("/") specially
      if ((href === '/' && (cleanCurrent === 'index' || pagePath === '/')) || 
          (href && href.replace('.html', '') === cleanCurrent)) {
        item.classList.add('active');
      }
    });
  };

  // Call the function to set active nav item
  setActiveNavItem();
});

// Dropdown menu logic
function toggleMenuDropdown() {
  const menu = document.getElementById('menuDropdown');
  menu.classList.toggle('active');
  const icon = document.querySelector('.menu-icon');
  icon.setAttribute('aria-expanded', menu.classList.contains('active'));
}

function closeMenuDropdown() {
  // Timeout to allow click on dropdown items before it closes
  setTimeout(() => {
    const menu = document.getElementById('menuDropdown');
    if (menu) menu.classList.remove('active');
    const icon = document.querySelector('.menu-icon');
    if (icon) icon.setAttribute('aria-expanded', 'false');
  }, 150); 
}
