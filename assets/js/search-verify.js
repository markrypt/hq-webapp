// Search functionality verification script

document.addEventListener('DOMContentLoaded', () => {
  // Verify that search icons trigger the search modal
  const searchIcons = document.querySelectorAll('.search-icon');
  
  if (searchIcons.length === 0) {
    console.error('❌ No search icons found on this page');
  } else {
    console.log(`✅ Found ${searchIcons.length} search icons on this page`);
    
    // Check if search manager is initialized
    if (typeof window.searchManager === 'undefined') {
      console.error('❌ SearchManager is not initialized');
      
      // Check if required scripts are loaded
      const commonScript = document.querySelector('script[src*="common.js"]');
      const productsDataScript = document.querySelector('script[src*="products-data.js"]');
      const searchScript = document.querySelector('script[src*="search.js"]');
      
      console.log(`Common.js loaded: ${!!commonScript}`);
      console.log(`Products-data.js loaded: ${!!productsDataScript}`);
      console.log(`Search.js loaded: ${!!searchScript}`);
      
      // Check if productsData is available
      console.log(`Products data available: ${typeof window.productsData !== 'undefined'}`);
      
      // Try to initialize search manager manually
      if (typeof window.productsData !== 'undefined') {
        console.log('Attempting to initialize SearchManager manually...');
        try {
          window.searchManager = new SearchManager(window.productsData);
          console.log('✅ SearchManager manually initialized');
        } catch (error) {
          console.error('Failed to initialize SearchManager:', error);
        }
      }
    } else {
      console.log('✅ SearchManager is initialized properly');
    }
    
    // Verify search modal exists
    const searchModal = document.getElementById('searchModal');
    if (!searchModal) {
      console.error('❌ Search modal not found in the DOM');
    } else {
      console.log('✅ Search modal found in the DOM');
    }
  }
  
  console.log('Search verification complete. Check console for results.');
});
