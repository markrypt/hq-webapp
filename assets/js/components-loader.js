/**
 * Component Loader Script
 * Handles loading reusable components like header and navigation
 */

// Capture the script's own source URL immediately.
// This should be valid during the initial synchronous execution of this script.
const LOADER_SCRIPT_SRC = document.currentScript ? document.currentScript.src : null;

document.addEventListener('DOMContentLoaded', () => {
  if (!LOADER_SCRIPT_SRC) {
    console.error("components-loader.js: Could not determine its own script URL. Components may not load. Ensure the script is not loaded as a module or in an unusual way that prevents document.currentScript from being set.");
    return;
  }

  // Relative path from this script (in assets/js/) to other assets
  const headerComponentRelPath = '../components/header.html';
  const navigationComponentRelPath = '../components/navigation.html';
  const searchManagerScriptPath = 'search-manager.js';
  const searchInitScriptPath = 'search-init.js';

  try {
    // Base URL is the loader script's own URL
    const loaderUrl = new URL(LOADER_SCRIPT_SRC); 
    
    const headerPath = new URL(headerComponentRelPath, loaderUrl).href;
    const navPath = new URL(navigationComponentRelPath, loaderUrl).href;
    const searchManagerPath = new URL(searchManagerScriptPath, loaderUrl).href;
    const searchInitPath = new URL(searchInitScriptPath, loaderUrl).href;    // Helper function to determine base path
    window.getBasePath = function() {
      const currentPath = window.location.pathname;
      return currentPath.includes('/category/') ? '../' : '/';
    };
    
    // Load search scripts first, then load components
    console.log("🔄 Loading global search functionality...");
    
    // Load global products loader first, then other search scripts
    const globalProductsLoaderPath = new URL('global-products-loader.js', loaderUrl).href;
    const productsManagerPath = new URL('products-manager.js', loaderUrl).href;
    const hasProductsManager = !!window.ProductsManager || !!document.querySelector('script[src*="products-manager.js"]');
    
    // Chain of promises to load scripts in the correct order
    loadScript(globalProductsLoaderPath)
      .then(() => hasProductsManager ? Promise.resolve() : loadScript(productsManagerPath))
      .then(() => loadScript(searchManagerPath))
      .then(() => loadScript(searchInitPath))
      .then(() => {
        console.log("✅ All search scripts loaded successfully");
        
        loadComponent('header-placeholder', headerPath, () => {
          // After header loads, set up dropdown functionality
          setupDropdownMenu();
          
          // Initialize global search if not already initialized
          if (!window.searchManager && typeof SearchManager === 'function') {
            console.log('🔧 Initializing global search with comprehensive product data...');
            try {
              // Initialize search with global products loader
              window.searchManager = new SearchManager();
                // Initialize search manager with all products
              const initializeWithAllProducts = () => {
                window.searchManager.init().then(() => {
                  console.log('✅ Global search initialization complete with comprehensive product data');
                }).catch(err => {
                  console.error('❌ Error initializing search:', err);
                });
              };

              // Initialize immediately
              initializeWithAllProducts();
            } catch (err) {
              console.error('❌ Failed to create SearchManager:', err);
            }
          }
        });
      })
      .catch(err => {
        console.error("❌ Failed to load search scripts:", err);
        // Continue loading components even if search scripts fail
        loadComponent('header-placeholder', headerPath, setupDropdownMenu);
      });
    loadComponent('navigation-placeholder', navPath, () => {
      // After navigation loads, set active navigation item
      highlightActiveNavItem();
    });
  } catch (e) {
    console.error("Error resolving component paths in components-loader.js. Loader Script SRC:", LOADER_SCRIPT_SRC, "Error:", e);
  }
});

/**
 * Dynamically loads a JavaScript file
 * @param {string} src - The URL of the script to load
 * @param {Function} [callback] - Optional callback to run after script is loaded
 * @returns {Promise} A promise that resolves when the script is loaded
 */
function loadScript(src, callback) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      console.log(`Script already loaded: ${src}`);
      if (callback) callback();
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log(`Script loaded: ${src}`);
      if (callback) callback();
      resolve();
    };
    script.onerror = (err) => {
      console.error(`Failed to load script: ${src}`, err);
      reject(err);
    };
    document.body.appendChild(script);
  });
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
      // Re-evaluate scripts if any in the loaded component
      // This ensures that scripts inside header.html or navigation.html run
      Array.from(placeholder.getElementsByTagName("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
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
