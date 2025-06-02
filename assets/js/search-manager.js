class SearchManager {
  constructor() {
    this.productsData = [];
    this.isLoading = true;
    this.addedProductIds = new Set(); // Track added product IDs to prevent duplicates
    this.setupSearchUI();
    this.setupEventListeners();
  }
    /**
   * Add products to the search index, avoiding duplicates
   * @param {Array} products - Array of products to add
   * @param {string} source - Source description for logging
   * @returns {number} Number of products added
   */
  addProducts(products, source = 'unknown source') {
    if (!Array.isArray(products)) return 0;
    
    const initialCount = this.productsData.length;
    products.forEach(product => {
      if (product && product.id && !this.addedProductIds.has(product.id)) {
        this.productsData.push(product);
        this.addedProductIds.add(product.id);
      }
    });
    
    const addedCount = this.productsData.length - initialCount;
    if (addedCount > 0) {
      console.log(`Added ${addedCount} unique products from ${source}`);
    }
    return addedCount;
  }

  async init() {
    try {
      console.log('🔍 Initializing SearchManager...');
      
      // Use the global products loader for comprehensive product data
      if (window.globalProductsLoader) {
        console.log('📦 Using GlobalProductsLoader for product data...');
        const allProducts = await window.globalProductsLoader.getProducts();
        this.addProducts(allProducts, 'GlobalProductsLoader (all categories)');
      } else {
        console.warn('⚠️ GlobalProductsLoader not available, falling back to legacy method');
        
        // Fallback: Try to gather products from existing sources
        // First, add any current page's products
        if (window.productsData && Array.isArray(window.productsData)) {
          this.addProducts(window.productsData, 'current page (window.productsData)');
        }

        // Then add any products from MARKRYPT namespace
        if (window.MARKRYPT) {
          Object.keys(window.MARKRYPT).forEach(key => {
            if (key.endsWith('Products') && Array.isArray(window.MARKRYPT[key])) {
              this.addProducts(window.MARKRYPT[key], `MARKRYPT.${key}`);
            }
          });
        }
        
        // Also check for direct window variables for each category
        const categoryProductVars = [
          'amazonFreshProducts',
          'automotiveProducts',
          'beautyAndHealthProducts',
          'booksProducts',
          'clothingShoesJewelryAndWatchesProducts',
          'computersProducts',
          'electronicsProducts',
          'foodAndGroceryProducts',
          'handmadeProducts',
          'homeGardenAndToolsProducts',
          'householdEssentialsProducts',
          'industrialAndScientificProducts',
          'moviesMusicAndGamesProducts',
          'petSuppliesProducts',
          'smartHomeProducts',
          'sportsAndOutdoorsProducts',
          'toysKidsAndBabyProducts',
          'wholeFoodsMarketProducts'
        ];
        
        categoryProductVars.forEach(varName => {
          if (window[varName] && Array.isArray(window[varName])) {
            this.addProducts(window[varName], `window.${varName}`);
          }
        });
      }

      this.isLoading = false;
      console.log('✅ Search initialization complete with', this.productsData.length, 'total unique products');
    } catch (err) {
      console.error('❌ Error during SearchManager initialization:', err);
      this.isLoading = false;
      throw err;
    }
  }

  setupSearchUI() {
    // Create search modal if it doesn't exist
    if (!document.getElementById('searchModal')) {
      const searchModal = document.createElement('div');
      searchModal.id = 'searchModal';
      searchModal.className = 'search-modal';
      
      searchModal.innerHTML = `
        <div class="search-container">
          <div class="search-header">
            <div class="search-input-wrapper">
              <i class="fas fa-search search-icon-input"></i>
              <input type="text" id="globalSearchInput" placeholder="Search across all categories...">
              <i class="fas fa-times search-close" id="closeSearchModal"></i>
            </div>
          </div>
          <div class="search-results" id="searchResults">
            <div class="search-empty-state">
              <i class="fas fa-search search-empty-icon"></i>
              <p>Type to search products</p>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(searchModal);
    }
  }

  setupEventListeners() {
    const closeBtn = document.getElementById('closeSearchModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeSearchModal());
    }

    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
          this.closeSearchModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('searchModal').classList.contains('active')) {
        this.closeSearchModal();
      }
    });
  }

  openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }

  closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.value = '';
      this.clearSearchResults();
    }
  }

  clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (this.isLoading) {
      searchResults.innerHTML = `
        <div class="search-loading-state">
          <i class="fas fa-spinner fa-spin search-empty-icon"></i>
          <p>Loading products...</p>
        </div>
      `;
    } else {
      searchResults.innerHTML = `
        <div class="search-empty-state">
          <i class="fas fa-search search-empty-icon"></i>
          <p>Type to search products across all categories</p>
        </div>
      `;
    }
  }

  handleSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (this.isLoading) {
      searchResults.innerHTML = `
        <div class="search-loading-state">
          <i class="fas fa-spinner fa-spin search-empty-icon"></i>
          <p>Loading products...</p>
        </div>
      `;
      return;
    }
    
    if (!query.trim()) {
      this.clearSearchResults();
      return;
    }
    
    const results = this.searchProducts(query);
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <p>No products found for "${query}"</p>
          <p>Try a different search term or browse our categories</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = results.map(product => `
      <a href="/product.html?id=${product.id}" class="search-result-item">
        <div class="search-result-image" style="background-image: url('${product.image}')"></div>
        <div class="search-result-content">
          <div class="search-result-title">
            ${product.title}
            ${product.badge ? `<span class="search-result-badge ${product.badge}">${product.badge}</span>` : ''}
          </div>
          <div class="search-result-category">${product.category} › ${product.subcategory}</div>
          <div class="search-result-rating">
            <div class="search-result-stars">${this.generateStarRating(product.rating)}</div>
            <div>(${product.reviewCount.toLocaleString()})</div>
          </div>
        </div>
      </a>
    `).join('');
  }

  generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `${
      '★'.repeat(fullStars)}${
      hasHalfStar ? '½' : ''}${
      '☆'.repeat(emptyStars)
    }`;
  }
  searchProducts(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!this.productsData || this.productsData.length === 0) {
      console.warn('No products data available for search');
      return [];
    }
    
    return this.productsData.filter(product => {
      if (!product) return false;
      
      const searchFields = [
        product.title,
        product.name,
        product.description,
        product.category,
        product.subcategory,
        product.brand
      ].filter(Boolean).map(field => field.toLowerCase());
      
      // Check if any field contains the query
      const matchesText = searchFields.some(field => field.includes(lowerQuery));
      
      // Check tags
      const matchesTags = product.tags && Array.isArray(product.tags) && 
        product.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      
      return matchesText || matchesTags;
    }).slice(0, 8); // Limit to 8 results
  }

  search(query) {
    return this.searchProducts(query);
  }
}
