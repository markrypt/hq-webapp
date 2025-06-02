// Search Functionality Test Script

/**
 * This script tests if the search functionality is working correctly across all pages.
 * It checks if:
 * 1. All category product files are loaded properly
 * 2. The SearchManager correctly picks up products from each category
 * 3. The search UI is properly initialized
 * 4. Tests for duplicate products in search results
 */

(function() {
  console.group('Search Functionality Test');
  
  // Print current page information
  console.log('🔍 Running search test on:', window.location.pathname);
  
  // Check if SearchManager is loaded
  if (!window.SearchManager) {
    console.error('❌ SearchManager class not found!');
  } else {
    console.log('✓ SearchManager class is defined');
  }
  
  // Check if searchManager instance exists
  if (!window.searchManager) {
    console.warn('⚠️ searchManager instance not created yet - this should initialize when needed');
    console.log('👉 Attempting to initialize search manager...');
    try {
      window.searchManager = new SearchManager();
      window.searchManager.init().then(() => {
        console.log('✓ SearchManager successfully initialized manually!');
        runSearchTests();
      }).catch(err => {
        console.error('❌ Failed to initialize SearchManager:', err);
      });
    } catch (err) {
      console.error('❌ Could not create SearchManager instance:', err);
    }
  } else {
    console.log('✓ searchManager instance exists');
    runSearchTests();
  }
  
  function runSearchTests() {
    // Check if products are loaded
    const totalProducts = window.searchManager.productsData?.length || 0;
    console.log(`Total products loaded: ${totalProducts}`);
    
    if (totalProducts === 0) {
      console.error('❌ No products loaded in SearchManager!');
    } else {
      console.log('✓ Products loaded successfully');
    }
    
    // Verify no duplicate product IDs
    const productIds = new Set();
    const duplicateIds = new Set();
    window.searchManager.productsData?.forEach(product => {
      if (productIds.has(product.id)) {
        duplicateIds.add(product.id);
      } else {
        productIds.add(product.id);
      }
    });
    
    if (duplicateIds.size > 0) {
      console.warn(`⚠️ Found ${duplicateIds.size} duplicate product IDs:`, Array.from(duplicateIds));
    } else {
      console.log('✓ No duplicate products found');
    }
    
    // Check which categories are included
    const productCategories = {};
    window.searchManager.productsData?.forEach(product => {
      if (!productCategories[product.category]) {
        productCategories[product.category] = 0;
      }
      productCategories[product.category]++;
    });
    
    console.log('Product categories available in search:', productCategories);
    console.log('Number of distinct categories:', Object.keys(productCategories).length);
  }
    // Check MARKRYPT namespace
  if (!window.MARKRYPT) {
    console.error('❌ MARKRYPT namespace not defined!');
  } else {
    console.log('✓ MARKRYPT namespace exists');
    
    // Check which product arrays exist in MARKRYPT
    const productArrays = Object.keys(window.MARKRYPT)
      .filter(key => key.endsWith('Products') && Array.isArray(window.MARKRYPT[key]));
    
    console.log('Product arrays in MARKRYPT:', productArrays);
    productArrays.forEach(arr => {
      console.log(`  - ${arr}:`, window.MARKRYPT[arr].length, 'products');
    });
  }
  
  // Check if search UI is properly initialized
  const searchModalElement = document.getElementById('searchModal');
  if (!searchModalElement) {
    console.error('❌ Search modal element not found!');
    console.log('👉 This might be normal - search modal is created when search is initiated');
  } else {
    console.log('✓ Search modal element exists');
    
    // Check if search input exists
    const searchInput = document.getElementById('globalSearchInput');
    if (!searchInput) {
      console.error('❌ Search input element not found!');
    } else {
      console.log('✓ Search input element exists');
    }
  }
  
  // Test search initialization function
  if (typeof initializeSearch !== 'function') {
    console.error('❌ initializeSearch function not defined!');
  } else {
    console.log('✓ initializeSearch function exists');
    
    // Test search functionality with a sample query
    console.log('🧪 Testing search with query "headphones"...');
    try {
      // Don't actually open the modal during test
      const originalOpenSearchModal = window.searchManager.openSearchModal;
      window.searchManager.openSearchModal = function() {
        console.log('✓ Search modal open function called successfully');
      };
      
      const results = window.searchManager.search('headphones');
      console.log(`✓ Search returned ${results.length} results for "headphones"`);
      
      // Restore original function
      if (originalOpenSearchModal) {
        window.searchManager.openSearchModal = originalOpenSearchModal;
      }
      
      console.log('✅ Search functionality test completed successfully!');
    } catch (error) {
      console.error('❌ Error during search test:', error);
    }
  }
  
  console.groupEnd();
})();
