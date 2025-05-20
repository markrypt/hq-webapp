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
  
  // Initialize global search if search icons exist and the search manager isn't initialized yet
  initializeGlobalSearch();
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

// Global search initialization
function initializeGlobalSearch(openModalAfterInit = false) {
  const searchIcons = document.querySelectorAll('.search-icon');
  // No longer return if searchIcons.length is 0, as this function might be called directly to ensure scripts are loaded.

  const basePath = determineBasePath();

  const loadSearchScriptsAndInitialize = () => {
    loadScript(basePath + 'assets/js/products-data.js', () => {
      loadScript(basePath + 'assets/js/search.js', () => {
        if (window.searchManager && typeof window.searchManager.openSearchModal === 'function' && openModalAfterInit) {
          window.searchManager.openSearchModal();
        } else if (openModalAfterInit) {
          console.error('Search manager still not available after loading scripts.');
        }
      });
    });
  };

  if (typeof window.productsData === 'undefined' || typeof window.searchManager === 'undefined') {
    loadSearchScriptsAndInitialize();
  } else if (openModalAfterInit && window.searchManager && typeof window.searchManager.openSearchModal === 'function') {
    // Scripts already loaded, just open modal
    window.searchManager.openSearchModal();
  }

  // Ensure click events are attached to icons if they weren't already
  // This part handles cases where common.js loads and executes initializeGlobalSearch
  // before the header (with the search icon) is dynamically loaded into the DOM.
  // Or if the icon is clicked before searchManager is ready.
  searchIcons.forEach(icon => {
    // Remove existing listener to avoid duplicates if this function is called multiple times
    const newIcon = icon.cloneNode(true);
    icon.parentNode.replaceChild(newIcon, icon);
    
    newIcon.addEventListener('click', () => {
      if (window.searchManager && typeof window.searchManager.openSearchModal === 'function') {
        window.searchManager.openSearchModal();
      } else {
        // If searchManager isn't initialized yet, try to load scripts and then open
        console.log('Search manager not ready, attempting to initialize and open...');
        initializeGlobalSearch(true);
      }
    });
  });
}

// Helper function to determine the base path
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
