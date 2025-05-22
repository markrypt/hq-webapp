/**
 * Products Manager - Handles searching, filtering, and displaying products
 */
class ProductsManager {
  constructor(productsData) {
    this.allProducts = productsData;
    this.filteredProducts = [...productsData];
    this.categories = this.extractCategories();
    this.subcategories = this.extractSubcategories();
    this.tags = this.extractTags();
  }

  // Extract unique categories from products
  extractCategories() {
    const categories = new Set();
    this.allProducts.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories).sort();
  }

  // Extract unique subcategories from products
  extractSubcategories() {
    const subcategories = new Set();
    this.allProducts.forEach(product => {
      if (product.subcategory) {
        subcategories.add(product.subcategory);
      }
    });
    return Array.from(subcategories).sort();
  }

  // Extract all tags from products
  extractTags() {
    const tags = new Set();
    this.allProducts.forEach(product => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }

  // Search products by query string
  searchProducts(query = '') {
    if (!query.trim()) {
      this.filteredProducts = [...this.allProducts];
      return this.filteredProducts;
    }

    const lowerQuery = query.toLowerCase().trim();
    this.filteredProducts = this.allProducts.filter(product => {
      // Search in title
      if (product.title.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      // Search in description
      if (product.description && product.description.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      // Search in category and subcategory
      if (product.category && product.category.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      if (product.subcategory && product.subcategory.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      // Search in tags
      if (product.tags && Array.isArray(product.tags)) {
        return product.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      }
      
      return false;
    });

    return this.filteredProducts;
  }

  // Filter products by category
  filterByCategory(category) {
    if (!category || category === 'all') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(
        product => product.category === category
      );
    }
    return this.filteredProducts;
  }

  // Filter products by subcategory
  filterBySubcategory(subcategory) {
    if (!subcategory || subcategory === 'all') {
      return this.filteredProducts;
    }
    
    this.filteredProducts = this.filteredProducts.filter(
      product => product.subcategory === subcategory
    );
    return this.filteredProducts;
  }

  // Filter products by tag
  filterByTag(tag) {
    if (!tag || tag === 'all') {
      return this.filteredProducts;
    }
    
    this.filteredProducts = this.filteredProducts.filter(
      product => product.tags && product.tags.includes(tag)
    );
    return this.filteredProducts;
  }

  // Sort products by different criteria
  sortProducts(criteria = 'popular') {
    switch (criteria) {
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        this.filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'popular':
      default:
        // Sort by a combination of rating and review count
        this.filteredProducts.sort((a, b) => {
          const scoreA = a.rating * Math.log10(a.reviewCount + 1);
          const scoreB = b.rating * Math.log10(b.reviewCount + 1);
          return scoreB - scoreA;
        });
    }
    
    return this.filteredProducts;
  }

  // Generate HTML for product cards
  generateProductCard(product) {
    let badgeHTML = '';
    if (product.badge) {
      badgeHTML = `<span class="product-badge ${product.badge}">${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}</span>`;
    }

    const starsHTML = this.generateStarRating(product.rating);

    return `
      <a href="product.html?id=${product.id}" class="product-card">
        ${badgeHTML}
        <div class="product-image" style="background-image: url('${product.image}');"></div>
        <div class="product-content">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-meta">
            <span class="product-category">${product.category}</span>
            ${product.subcategory ? `<span class="product-subcategory">${product.subcategory}</span>` : ''}
          </div>
          <div class="product-rating">
            <div class="stars">
              ${starsHTML}
            </div>
            <div class="count">(${product.reviewCount.toLocaleString()})</div>
          </div>
          <div class="product-actions">
            <button class="product-btn primary"><i class="fas fa-shopping-cart"></i> View Details</button>
          </div>
        </div>
      </a>
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

  // Render products to a container element
  renderProducts(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (this.filteredProducts.length === 0) {
      container.innerHTML = '<div class="no-results">No products found. Try a different search term or filter.</div>';
      return;
    }

    let productsHTML = '';
    this.filteredProducts.forEach(product => {
      productsHTML += this.generateProductCard(product);
    });

    container.innerHTML = productsHTML;
  }

  // Get product by ID
  getProductById(id) {
    return this.allProducts.find(product => product.id === id);
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if productsData is available
  if (typeof window.productsData !== 'undefined') {
    // Initialize the products manager
    window.productsManager = new ProductsManager(window.productsData);
  }
});
