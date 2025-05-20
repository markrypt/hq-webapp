/**
 * Component Loader Script
 * Handles loading reusable components like header and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Determine the base path for components based on the current page's location
  const basePath = getBasePath();

  // Load header
  loadComponent('header-placeholder', `${basePath}assets/components/header.html`, () => {
    // After header loads, set up dropdown functionality
    setupDropdownMenu();
  });
  
  // Load navigation
  loadComponent('navigation-placeholder', `${basePath}assets/components/navigation.html`, () => {
    // After navigation loads, set active navigation item
    highlightActiveNavItem();
  });
});

/**
 * Determine the base path prefix based on the current page location
 * This helps with pages in subdirectories (e.g., /category/, /article/)
 * @returns {string} The base path prefix (e.g., '/', '../', '../../')
 */
function getBasePath() {
  // Get the pathname of the current page
  const pathname = window.location.pathname;
  
  // Count directory levels from root
  const pathParts = pathname.split('/').filter(part => part !== '');
  
  // If we're at root or in the root directory with a specific file
  if (pathParts.length === 0 || (pathParts.length === 1 && !pathname.endsWith('/'))) {
    return '/';
  }
  
  // Otherwise, we need to go up one level for each subdirectory
  return '../'.repeat(pathParts.length);
}

/**
 * Load a component from HTML file and inject it into the specified element
 * @param {string} placeholderId - The ID of the element to inject component into
 * @param {string} componentPath - The path to the component HTML file
 * @param {Function} [callback] - Optional callback to run after component is loaded
 */
function loadComponent(placeholderId, componentPath, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) {
    console.warn(`Placeholder element with ID "${placeholderId}" not found.`);
    return;
  }

  fetch(componentPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load component: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      console.error('Error loading component:', error);
      placeholder.innerHTML = `<div class="component-error">Component failed to load</div>`;
    });
}

/**
 * Set up dropdown menu functionality
 */
function setupDropdownMenu() {
  // These functions are already defined in the original pages
  // They're referenced here to ensure they're called after the header is loaded
  if (typeof toggleMenuDropdown !== 'function') {
    window.toggleMenuDropdown = function() {
      const menu = document.getElementById('menuDropdown');
      if (menu) {
        menu.classList.toggle('active');
        const icon = document.querySelector('.menu-icon');
        if (icon) icon.setAttribute('aria-expanded', menu.classList.contains('active'));
      }
    };
  }
  
  if (typeof closeMenuDropdown !== 'function') {
    window.closeMenuDropdown = function() {
      setTimeout(() => {
        const menu = document.getElementById('menuDropdown');
        if (menu) menu.classList.remove('active');
        const icon = document.querySelector('.menu-icon');
        if (icon) icon.setAttribute('aria-expanded', 'false');
      }, 150);
    };
  }
}

/**
 * Highlight the active navigation item based on current URL
 */
function highlightActiveNavItem() {
  const currentPathname = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const normalizedCurrentPath = (currentPathname !== '/' && currentPathname.endsWith('/')) 
    ? currentPathname.slice(0, -1) 
    : currentPathname;

  document.querySelectorAll('.navigation .nav-item, .menu-dropdown a, .header .logo a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref && linkHref !== '#' && !linkHref.startsWith('mailto:') && !linkHref.startsWith('tel:')) {
      const linkUrl = new URL(linkHref, window.location.href);
      let linkPathname = linkUrl.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      const normalizedLinkPath = (linkPathname !== '/' && linkPathname.endsWith('/')) 
        ? linkPathname.slice(0, -1) 
        : linkPathname;

      // Special handling for the root path represented by "/"
      const targetPath = (normalizedLinkPath === '') ? '/' : normalizedLinkPath;
      const currentActivePath = (normalizedCurrentPath === '') ? '/' : normalizedCurrentPath;
      
      if (targetPath === currentActivePath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}
