/**
 * Global Products Loader - Loads all product data for global search functionality
 * This ensures search works on all pages, not just category pages
 */
class GlobalProductsLoader {
  constructor() {
    this.categoryFiles = [
      'amazon-fresh-products.js',
      'automotive-products.js', 
      'beauty-and-health-products.js',
      'books-products.js',
      'clothing-shoes-jewelry-and-watches-products.js',
      'computers-products.js',
      'electronics-products.js',
      'food-and-grocery-products.js',
      'handmade-products.js',
      'home-garden-and-tools-products.js',
      'household-essentials-products.js',
      'industrial-and-scientific-products.js',
      'movies-music-and-games-products.js',
      'pet-supplies-products.js',
      'smart-home-products.js',
      'sports-and-outdoors-products.js',
      'toys-kids-and-baby-products.js',
      'whole-foods-market-products.js'
    ];
    
    this.loadedProducts = [];
    this.isLoading = false;
    this.isLoaded = false;
    
    // Initialize MARKRYPT namespace
    window.MARKRYPT = window.MARKRYPT || {};
  }

  /**
   * Get the correct base path for assets based on current location
   */
  getBasePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/category/')) {
      return '../'; // Category pages are one level deep
    }
    return './'; // Main pages are at root level
  }

  /**
   * Load all category product files
   */
  async loadAllProducts() {
    if (this.isLoading || this.isLoaded) {
      return this.loadedProducts;
    }

    this.isLoading = true;
    console.log('🔄 Loading all category products for global search...');

    try {
      const basePath = this.getBasePath();
      const loadPromises = this.categoryFiles.map(file => this.loadProductFile(file, basePath));
      
      await Promise.all(loadPromises);
      
      // Collect all products from MARKRYPT namespace
      this.collectAllProducts();
      
      this.isLoading = false;
      this.isLoaded = true;
      
      console.log(`✅ Successfully loaded ${this.loadedProducts.length} total products from all categories`);
      return this.loadedProducts;
      
    } catch (error) {
      console.error('❌ Error loading global products:', error);
      this.isLoading = false;
      throw error;
    }
  }
  /**
   * Load a single product file
   */
  loadProductFile(filename, basePath) {
    return new Promise((resolve) => {
      const varName = this.getVariableNameFromFile(filename);
      const directVarName = this.getDirectVariableNameFromFile(filename);
      
      // Check if this product data is already available in MARKRYPT namespace
      if (window.MARKRYPT && window.MARKRYPT[varName] && Array.isArray(window.MARKRYPT[varName])) {
        console.log(`📦 ${filename} already loaded (${window.MARKRYPT[varName].length} products)`);
        resolve();
        return;
      }
      
      // Check if this product data is available as direct window variable
      if (window[directVarName] && Array.isArray(window[directVarName])) {
        console.log(`📦 ${filename} already loaded as direct variable (${window[directVarName].length} products)`);
        // Ensure it's also in MARKRYPT namespace
        window.MARKRYPT = window.MARKRYPT || {};
        window.MARKRYPT[varName] = window[directVarName];
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = basePath + 'assets/js/' + filename;
      
      script.onload = () => {
        // After loading, try to get products from either namespace or direct variable
        let products = [];
        
        if (window.MARKRYPT && window.MARKRYPT[varName]) {
          products = window.MARKRYPT[varName];
        } else if (window[directVarName]) {
          products = window[directVarName];
          // Ensure it's also in MARKRYPT namespace
          window.MARKRYPT = window.MARKRYPT || {};
          window.MARKRYPT[varName] = products;
        }
        
        console.log(`📦 Loaded ${filename}: ${products.length} products`);
        resolve();
      };
      
      script.onerror = (error) => {
        console.error(`❌ Failed to load ${filename}:`, error);
        resolve(); // Continue loading other files even if one fails
      };
      
      // Add a timeout to prevent hanging
      setTimeout(() => {
        console.warn(`⏰ Timeout loading ${filename}`);
        resolve();
      }, 5000);
      
      document.head.appendChild(script);
    });
  }
  /**
   * Convert filename to expected variable name
   */
  getVariableNameFromFile(filename) {
    // Convert 'electronics-products.js' to 'electronicsProducts'
    return filename
      .replace('-products.js', '')
      .split('-')
      .map((word, index) => 
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('') + 'Products';
  }

  /**
   * Convert filename to direct variable name (for legacy support)
   */
  getDirectVariableNameFromFile(filename) {
    // Convert 'amazon-fresh-products.js' to 'amazonFreshProducts'
    return filename
      .replace('-products.js', '')
      .split('-')
      .map((word, index) => 
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('') + 'Products';
  }
  /**
   * Collect all products from the MARKRYPT namespace
   */
  collectAllProducts() {
    this.loadedProducts = [];
    const addedIds = new Set();

    if (!window.MARKRYPT) {
      console.warn('⚠️ MARKRYPT namespace not found');
      return;
    }

    // Collect from MARKRYPT namespace
    Object.keys(window.MARKRYPT).forEach(key => {
      if (key.endsWith('Products') && Array.isArray(window.MARKRYPT[key])) {
        const products = window.MARKRYPT[key];
        let addedFromCategory = 0;
        
        products.forEach(product => {
          if (product && product.id && !addedIds.has(product.id)) {
            this.loadedProducts.push(product);
            addedIds.add(product.id);
            addedFromCategory++;
          }
        });
        
        if (addedFromCategory > 0) {
          console.log(`📦 Added ${addedFromCategory} products from ${key}`);
        }
      }
    });

    // Also check for direct window variables (fallback for legacy files)
    this.categoryFiles.forEach(filename => {
      const directVarName = this.getDirectVariableNameFromFile(filename);
      const markryptVarName = this.getVariableNameFromFile(filename);
      
      if (window[directVarName] && Array.isArray(window[directVarName]) && 
          (!window.MARKRYPT[markryptVarName] || window.MARKRYPT[markryptVarName].length === 0)) {
        
        const products = window[directVarName];
        let addedFromCategory = 0;
        
        products.forEach(product => {
          if (product && product.id && !addedIds.has(product.id)) {
            this.loadedProducts.push(product);
            addedIds.add(product.id);
            addedFromCategory++;
          }
        });
        
        if (addedFromCategory > 0) {
          console.log(`📦 Added ${addedFromCategory} products from direct variable ${directVarName}`);
          // Also add to MARKRYPT namespace for consistency
          window.MARKRYPT[markryptVarName] = products;
        }
      }    });

    console.log(`📦 Total products collected: ${this.loadedProducts.length}`);
  }

  /**
   * Get all loaded products (loads them if not already loaded)
   */
  async getProducts() {
    if (!this.isLoaded && !this.isLoading) {
      await this.loadAllProducts();
    }
    return this.loadedProducts;
  }

  /**
   * Check if products are currently loading
   */
  isLoadingProducts() {
    return this.isLoading;
  }

  /**
   * Check if products have been loaded
   */
  areProductsLoaded() {
    return this.isLoaded;
  }
}

// Create global instance
window.globalProductsLoader = new GlobalProductsLoader();

// Auto-load products when DOM is ready for better UX
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to let other scripts initialize first
  setTimeout(() => {
    window.globalProductsLoader.loadAllProducts().catch(err => {
      console.error('Failed to auto-load products:', err);
    });
  }, 500);
});
