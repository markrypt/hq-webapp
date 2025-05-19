/**
 * Global search functionality for Markrypt
 */

class SearchManager {
  constructor(productsData) {
    this.productsData = productsData;
    this.setupSearchUI();
    this.setupEventListeners();
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
              <input type="text" id="globalSearchInput" placeholder="Search products, categories...">
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

      // Add styles if not already in the CSS
      if (!document.getElementById('searchStyles')) {
        const style = document.createElement('style');
        style.id = 'searchStyles';
        style.textContent = `
          .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            z-index: 1000;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .search-modal.active {
            display: block;
            opacity: 1;
          }
          
          .search-container {
            max-width: 800px;
            margin: 80px auto 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            max-height: 80vh;
            display: flex;
            flex-direction: column;
          }
          
          .search-header {
            padding: 20px;
            border-bottom: 1px solid #e0e6ef;
            background: white;
          }
          
          .search-input-wrapper {
            display: flex;
            align-items: center;
            position: relative;
          }
          
          .search-icon-input {
            position: absolute;
            left: 15px;
            color: var(--accent-color);
            font-size: 16px;
          }
          
          #globalSearchInput {
            width: 100%;
            padding: 15px 20px 15px 45px;
            border: 1px solid #e0e6ef;
            border-radius: 50px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
          }
          
          #globalSearchInput:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.2);
          }
          
          .search-close {
            position: absolute;
            right: 15px;
            color: var(--text-secondary);
            font-size: 16px;
            cursor: pointer;
            padding: 10px;
          }
          
          .search-results {
            padding: 0;
            overflow-y: auto;
            max-height: calc(80vh - 77px);
          }
          
          .search-empty-state {
            padding: 40px;
            text-align: center;
            color: var(--text-secondary);
          }
          
          .search-empty-icon {
            font-size: 48px;
            margin-bottom: 15px;
            opacity: 0.2;
          }
          
          .search-result-item {
            padding: 15px 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: background 0.2s ease;
            text-decoration: none;
            color: var(--text-color);
          }
          
          .search-result-item:hover {
            background: #f9fbfd;
          }
          
          .search-result-image {
            width: 60px;
            height: 60px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 8px;
            background-color: #f9f9f9;
            flex-shrink: 0;
          }
          
          .search-result-content {
            flex-grow: 1;
          }
          
          .search-result-title {
            font-weight: 600;
            margin-bottom: 5px;
          }
          
          .search-result-category {
            font-size: 13px;
            color: var(--accent-color);
          }
          
          .search-result-rating {
            display: flex;
            align-items: center;
            font-size: 13px;
            margin-top: 4px;
          }
          
          .search-result-stars {
            color: #FFB900;
            margin-right: 5px;
          }
          
          .search-no-results {
            padding: 30px;
            text-align: center;
            color: var(--text-secondary);
          }
          
          .search-result-badge {
            display: inline-block;
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 20px;
            color: white;
            margin-left: 8px;
            text-transform: uppercase;
            font-weight: 600;
          }
          
          .search-result-badge.trending {
            background: linear-gradient(45deg, #339af0, #4dabf7);
          }
          
          .search-result-badge.new {
            background: linear-gradient(45deg, #51cf66, #69db7c);
          }
          
          .search-result-badge.sale {
            background: linear-gradient(45deg, #ff6b6b, #ff8787);
          }
          
          .search-result-badge.premium {
            background: linear-gradient(45deg, #845ef7, #b197fc);
          }
          
          .search-result-badge.bestseller {
            background: linear-gradient(45deg, #f59f00, #ffd43b);
          }
          
          .search-result-badge.value {
            background: linear-gradient(45deg, #20c997, #63e6be);
          }
          
          @media (max-width: 768px) {
            .search-container {
              margin: 0;
              max-width: 100%;
              height: 100vh;
              max-height: 100vh;
              border-radius: 0;
            }
            
            .search-results {
              max-height: calc(100vh - 77px);
            }
          }
        `;
        
        document.head.appendChild(style);
      }
    }
  }

  setupEventListeners() {
    // Open search on search icon click
    const searchIcons = document.querySelectorAll('.search-icon');
    if (searchIcons.length > 0) {
      searchIcons.forEach(icon => {
        icon.addEventListener('click', () => this.openSearchModal());
      });
    }

    // Close search modal
    const closeSearch = document.getElementById('closeSearchModal');
    if (closeSearch) {
      closeSearch.addEventListener('click', () => this.closeSearchModal());
    }

    // Handle search input
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeSearchModal();
        }
      });
    }

    // Close on modal background click
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
          this.closeSearchModal();
        }
      });
    }

    // Close on Escape key
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
    
    // Focus on the search input after modal is visible
    setTimeout(() => {
      document.getElementById('globalSearchInput').focus();
    }, 100);
  }

  closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear search input and results
    document.getElementById('globalSearchInput').value = '';
    this.clearSearchResults();
  }

  clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `
      <div class="search-empty-state">
        <i class="fas fa-search search-empty-icon"></i>
        <p>Type to search products</p>
      </div>
    `;
  }

  // Generate star rating HTML
  generateStarRating(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
  }

  handleSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query.trim()) {
      this.clearSearchResults();
      return;
    }
    
    // Search products
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
    
    // Display results
    searchResults.innerHTML = '';
    results.forEach(product => {
      const resultItem = document.createElement('a');
      resultItem.href = `product/${product.id}`;
      resultItem.className = 'search-result-item';
      
      let badgeHTML = '';
      if (product.badge) {
        badgeHTML = `<span class="search-result-badge ${product.badge}">${product.badge}</span>`;
      }
      
      resultItem.innerHTML = `
        <div class="search-result-image" style="background-image: url('${product.image}')"></div>
        <div class="search-result-content">
          <div class="search-result-title">
            ${product.title} ${badgeHTML}
          </div>
          <div class="search-result-category">${product.category} › ${product.subcategory}</div>
          <div class="search-result-rating">
            <div class="search-result-stars">${this.generateStarRating(product.rating)}</div>
            <div>(${product.reviewCount.toLocaleString()})</div>
          </div>
        </div>
      `;
      
      searchResults.appendChild(resultItem);
    });
  }

  searchProducts(query) {
    const lowerQuery = query.toLowerCase().trim();
    return this.productsData.filter(product => {
      // Match in title
      if (product.title.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Match in description
      if (product.description && product.description.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Match in category or subcategory
      if (product.category && product.category.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      if (product.subcategory && product.subcategory.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Match in tags
      if (product.tags && Array.isArray(product.tags)) {
        return product.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      }
      
      return false;
    }).slice(0, 8); // Limit to 8 results for better performance
  }
}

// Initialize search manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if productsData is available (loaded from products-data.js)
  if (typeof window.productsData !== 'undefined') {
    window.searchManager = new SearchManager(window.productsData);
    console.log('Search Manager initialized successfully');
  } else {
    console.error('Products data not available for search functionality');
  }
});
