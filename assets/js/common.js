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

// Helper function to determine base path for script loading
function determineBasePath() {
  const path = window.location.pathname;
  // Check if we're in a subdirectory
  return path.includes('/', 1) ? '../' : './';
}

// Helper function to dynamically load scripts
function loadScript(url, callback) {
  // Check if script is already loaded
  if (document.querySelector(`script[src="${url}"]`)) {
    if (callback) callback();
    return;
  }
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  
  if (callback) {
    script.onload = callback;
  }
  
  document.head.appendChild(script);
}
