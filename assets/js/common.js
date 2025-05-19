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
function initializeGlobalSearch() {
  const searchIcons = document.querySelectorAll('.search-icon');
  if (searchIcons.length === 0) return;

  // Get base path for assets (handles both root and subdirectory pages)
  const basePath = determineBasePath();

  // Check if products data is already loaded
  if (typeof window.productsData === 'undefined') {
    // Load products data dynamically
    loadScript(basePath + 'assets/js/products-data.js', () => {
      // After products data is loaded, load search.js
      loadScript(basePath + 'assets/js/search.js', () => {
        // Search.js will automatically initialize itself once loaded
      });
    });
  } else if (typeof window.searchManager === 'undefined') {
    // Products data already exists but search.js not loaded
    loadScript(basePath + 'assets/js/search.js', () => {
      // Search.js will automatically initialize itself once loaded
    });
  }
  
  // Attach click event to search icons if search manager is not available yet
  if (typeof window.searchManager === 'undefined') {
    searchIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        if (window.searchManager) {
          window.searchManager.openSearchModal();
        } else {
          // If searchManager isn't initialized yet, delay action slightly
          setTimeout(() => {
            if (window.searchManager) {
              window.searchManager.openSearchModal();
            } else {
              console.error('Search functionality not yet initialized');
            }
          }, 500);
        }
      });
    });
  }
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
