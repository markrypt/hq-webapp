// Helper functions for category pages
window.initializeCategoryPage = function(categoryName, productsNamespace) {
  // Initialize MARKRYPT namespace
  window.MARKRYPT = window.MARKRYPT || {};
  
  // Log page initialization
  console.log(`[${categoryName}] Initializing page...`);

  // Product initialization check
  window.checkProductsLoaded = function() {
    if (!window.MARKRYPT || !window.MARKRYPT[productsNamespace]) {
      console.error(`[${categoryName}] Products not initialized`);
      window.handleProductLoadError();
      return false;
    }
    return true;
  };

  // Error handler for product loading
  window.handleProductLoadError = function() {
    console.error(`[${categoryName}] Failed to load products`);
    const mainContent = document.querySelector('.category-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="error-message">
          <h2>Unable to load products</h2>
          <p>Please try refreshing the page. If the problem persists, contact support.</p>
        </div>
      `;
    }
  };

  // Set products when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    if (checkProductsLoaded()) {
      console.log(`[${categoryName}] Page ready`);
      // Set the products data for both filter system and search
      window.productsData = window.MARKRYPT[productsNamespace];
    }
  });
};
