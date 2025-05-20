/**
 * Product Detail Page Handler
 * Loads and displays product details based on URL parameters
 */
class ProductDetailManager {
  constructor() {
    this.productId = this.getProductIdFromUrl();
    this.product = null;
    this.relatedProducts = [];
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }
  
  /**
   * Get product ID from URL
   * Format: /product.html?id=product-id or /product/product-id
   */
  getProductIdFromUrl() {
    // First try to get from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get('id');
    if (paramId) return paramId;
    
    // If no URL parameter, try to extract from path
    const pathParts = window.location.pathname.split('/');
    if (pathParts.length > 0) {
      // Get the last part of the path
      const lastPart = pathParts[pathParts.length - 1];
      // Return the part without .html extension if it exists
      return lastPart.replace('.html', '');
    }
    
    return null;
  }
  
  /**
   * Initialize the product detail page
   */
  init() {
    if (!this.productId) {
      this.showProductNotFound();
      return;
    }
    
    // Find the product in the data
    this.product = this.findProduct(this.productId);
    
    if (!this.product) {
      this.showProductNotFound();
      return;
    }
    
    // Set page title
    document.title = `${this.product.title} - Markrypt`;
    
    // Render the product details
    this.renderProductDetails();
    
    // Find and render related products
    this.findRelatedProducts();
    this.renderRelatedProducts();
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  /**
   * Find a product by ID from the products data
   */
  findProduct(id) {
    return productsData.find(product => product.id === id);
  }
  
  /**
   * Display product not found message
   */
  showProductNotFound() {
    const container = document.getElementById('productContainer');
    
    container.innerHTML = `
      <div class="product-not-found">
        <i class="fas fa-search"></i>
        <h2>Product Not Found</h2>
        <p>We couldn't find the product you're looking for. It may have been removed or the URL is incorrect.</p>
        <a href="products.html" class="product-detail-button primary">
          <i class="fas fa-tag"></i> Browse All Products
        </a>
      </div>
    `;
  }
  
  /**
   * Render product details in the page
   */
  renderProductDetails() {
    const container = document.getElementById('productContainer');
    const product = this.product;
    
    // Generate star rating HTML
    const starsHtml = this.generateStarRating(product.rating);
    
    // Generate features HTML
    const featuresHtml = product.features?.length 
      ? `
        <h3 class="product-detail-features-title">Key Features</h3>
        <ul class="product-detail-features">
          ${product.features.map(feature => `
            <li class="product-detail-feature">
              <i class="fas fa-check-circle"></i>
              <span>${feature}</span>
            </li>
          `).join('')}
        </ul>
      ` 
      : '';
    
    // Generate badge HTML
    const badgeHtml = product.badge 
      ? `<span class="product-detail-badge ${product.badge}">${product.badge}</span>` 
      : '';
    
    container.innerHTML = `
      <div class="product-detail-container">
        <div class="product-detail-image" style="background-image: url('${product.image}');" id="productImage">
          ${badgeHtml}
        </div>
        
        <div class="product-detail-info">
          <div class="product-detail-header">
            <h1 class="product-detail-title">${product.title}</h1>
            
            <div class="product-detail-meta">
              <a href="category/${this.slugify(product.category)}" class="product-detail-category">
                <i class="fas fa-tag"></i> ${product.category}
              </a>
              
              <div class="product-detail-rating">
                <div class="product-detail-stars">
                  ${starsHtml}
                </div>
                <div class="product-detail-count">(${product.reviewCount.toLocaleString()})</div>
              </div>
            </div>
          </div>
          
          <p class="product-detail-description">${product.description}</p>
          
          ${featuresHtml}
          
          <div class="product-detail-actions">
            <a href="#" class="product-detail-button primary" id="viewOnAmazon">
              <i class="fas fa-external-link-alt"></i> View on Amazon
            </a>
            <button class="product-detail-button secondary" id="shareProduct">
              <i class="fas fa-share-alt"></i> Share
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate HTML for star ratings
   */
  generateStarRating(rating = 0) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
  }
  
  /**
   * Find related products based on category and tags
   */
  findRelatedProducts() {
    if (!this.product) return;
    
    // Find products in the same category or with matching tags
    const related = productsData.filter(product => {
      if (product.id === this.product.id) return false;
      
      // Same category
      if (product.category === this.product.category) return true;
      
      // Check for tag overlap if both products have tags
      if (this.product.tags && product.tags) {
        return this.product.tags.some(tag => product.tags.includes(tag));
      }
      
      return false;
    });
    
    // Limit to 4 related products
    this.relatedProducts = related.slice(0, 4);
  }
  
  /**
   * Render related products
   */
  renderRelatedProducts() {
    const container = document.getElementById('relatedProductsContainer');
    
    if (!this.relatedProducts.length) {
      container.style.display = 'none';
      return;
    }
    
    let html = `
      <div class="related-products">
        <h2 class="related-products-title">Related Products</h2>
        <div class="related-products-grid">
    `;
    
    this.relatedProducts.forEach(product => {
      // Generate star rating HTML
      const starsHtml = this.generateStarRating(product.rating);
      
      // Generate badge HTML
      const badgeHtml = product.badge 
        ? `<span class="product-badge ${product.badge}">${product.badge}</span>` 
        : '';
      
      html += `
        <a href="product.html?id=${product.id}" class="product-card">
          ${badgeHtml}
          <div class="product-image" style="background-image: url('${product.image}');"></div>
          <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-meta">
              <!-- Price removed -->
            </div>
            <div class="product-rating">
              <div class="stars">
                ${starsHtml}
              </div>
              <div class="count">(${product.reviewCount.toLocaleString()})</div>
            </div>
            <div class="product-actions">
              <button class="product-btn primary"><i class="fas fa-shopping-cart"></i> View Details</button>
            </div>
          </div>
        </a>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  }
  
  /**
   * Set up event listeners for the product page
   */
  setupEventListeners() {
    // Image zoom functionality
    const productImage = document.getElementById('productImage');
    const zoomModal = document.getElementById('productZoomModal');
    const zoomedImage = document.getElementById('zoomedProductImage');
    const closeZoom = document.getElementById('closeZoom');
    
    if (productImage && zoomModal && zoomedImage) {
      productImage.addEventListener('click', () => {
        zoomedImage.src = this.product.image;
        zoomModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    }
    
    if (closeZoom) {
      closeZoom.addEventListener('click', () => {
        zoomModal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
      });
    }
    
    // Close zoom on background click
    if (zoomModal) {
      zoomModal.addEventListener('click', (event) => {
        if (event.target === zoomModal) {
          zoomModal.classList.remove('show');
          document.body.style.overflow = ''; // Re-enable scrolling
        }
      });
    }
    
    // Share button functionality
    const shareButton = document.getElementById('shareProduct');
    if (shareButton && navigator.share) {
      shareButton.addEventListener('click', () => {
        navigator.share({
          title: this.product.title,
          text: this.product.description,
          url: window.location.href
        })
        .catch(err => console.error('Error sharing:', err));
      });
    } else if (shareButton) {
      // If Web Share API is not supported, copy URL to clipboard
      shareButton.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            alert('Link copied to clipboard!');
          })
          .catch(err => {
            console.error('Could not copy link:', err);
          });
      });
    }
  }
  
  /**
   * Convert a string to a URL-friendly slug
   */
  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
}

// Initialize product detail manager
const productManager = new ProductDetailManager();
