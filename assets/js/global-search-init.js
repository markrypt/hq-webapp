// Common search functionality for all pages
// This script loads the search functionality

// First, load common.js if not already loaded
if (!document.querySelector('script[src$="common.js"]')) {
  const commonScript = document.createElement('script');
  commonScript.src = getBasePath() + 'assets/js/common.js';
  document.body.appendChild(commonScript);
}

// Load products-data.js if not already loaded
if (typeof window.productsData === 'undefined' && !document.querySelector('script[src$="products-data.js"]')) {
  const productsDataScript = document.createElement('script');
  productsDataScript.src = getBasePath() + 'assets/js/products-data.js';
  productsDataScript.onload = function() {
    // After products data is loaded, load search.js if not already loaded
    if (typeof window.searchManager === 'undefined' && !document.querySelector('script[src$="search.js"]')) {
      const searchScript = document.createElement('script');
      searchScript.src = getBasePath() + 'assets/js/search.js';
      document.body.appendChild(searchScript);
    }
  };
  document.body.appendChild(productsDataScript);
} 
// If products data is loaded but search.js is not
else if (typeof window.searchManager === 'undefined' && !document.querySelector('script[src$="search.js"]')) {
  const searchScript = document.createElement('script');
  searchScript.src = getBasePath() + 'assets/js/search.js';
  document.body.appendChild(searchScript);
}

// Helper function to determine the base path (for handling directories like /category/ or /article/)
function getBasePath() {
  // Get the path from the current location
  const path = window.location.pathname;
  
  // For files in the root directory
  if (!path.includes('/', 1)) {
    return './';
  }
  
  // For files in subdirectories (one level deep)
  return '../';
}
