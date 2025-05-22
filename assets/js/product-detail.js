/**
 * Product Detail Page Handler
 * Loads and displays product details based on URL parameters
 */
class ProductDetailManager {
  constructor() {
    console.log('ProductDetailManager constructor called');
    this.productId = this.getProductIdFromUrl();
    this.product = null;
    this.relatedProducts = [];
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM loaded, initializing product detail manager');
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
    
    // Try to extract from path like /product/product-id
    const pathParts = window.location.pathname.split('/');
    
    // Look for /product/[productId] format
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (pathParts[i] === 'product' && pathParts[i+1]) {
        return pathParts[i+1].replace('.html', '');
      }
    }
    
    // Otherwise try to get the last path segment (fallback)
    if (pathParts.length > 0) {
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart !== 'product' && lastPart !== 'product.html') {
        return lastPart.replace('.html', '');
      }
    }
    
    return null;
  }
  
  /**
   * Initialize the product detail page
   */  init() {
    console.log(`ProductDetailManager initializing with product ID: ${this.productId}`);
    
    if (!this.productId) {
      console.error('No product ID found in URL');
      this.showProductNotFound();
      return;
    }

    // Ensure productsData is available
    if (typeof productsData === 'undefined' || !productsData || productsData.length === 0) {
      console.error('productsData is not available or empty. Cannot find product.');
      this.showProductNotFound(); // Or some other error message
      return;
    }
    
    // Find the product in the data
    this.product = this.findProduct(this.productId);
    
    if (!this.product) {
      console.error(`Product not found with ID: ${this.productId}`);
      this.showProductNotFound();
      return;
    }
      console.log(`Product found: ${this.product.title}`);
    console.log(`Product affiliate link: ${this.product.affiliateLink}`); // Log the affiliate link
    
    // Set page title and update schema markup
    document.title = `Markrypt - ${this.product.title} Reviews, Ratings & Best Price`;
    this.updateProductSchema();
    
    // Render the product details
    this.renderProductDetails();
    
    // Find and render related products
    this.findRelatedProducts();
    this.renderRelatedProducts();
    
    // Setup event listeners
    this.setupEventListeners();
  }  /**   
   * Find a product by ID from the products data
   */
  findProduct(id) {
    console.log(`Attempting to find product with ID: "${id}"`);
    
    // First try the global productsData
    if (typeof productsData !== 'undefined' && productsData && productsData.length > 0) {
      console.log(`Looking in global productsData (${productsData.length} products)...`);
      
      const product = productsData.find(product => product.id === id);
      if (product) {
        console.log(`Found product in global productsData: "${product.title}"`);
        return product;
      }
    } else {
      console.warn('Global productsData is not available or empty.');
    }
    
    // If not found, try amazonFreshProducts separately
    if (typeof window.amazonFreshProducts !== 'undefined' && window.amazonFreshProducts && window.amazonFreshProducts.length > 0) {
      console.log(`Looking in window.amazonFreshProducts (${window.amazonFreshProducts.length} products)...`);
      
      const freshProduct = window.amazonFreshProducts.find(product => product.id === id);
      if (freshProduct) {
        console.log(`Found product in amazonFreshProducts: "${freshProduct.title}"`);
        return freshProduct;
      }
    } else {
      console.warn('window.amazonFreshProducts is not available or empty.');
    }
    
    // Check if there's a raw amazonFreshProducts (not on window)
    if (typeof amazonFreshProducts !== 'undefined' && amazonFreshProducts && amazonFreshProducts.length > 0) {
      console.log(`Looking in local amazonFreshProducts (${amazonFreshProducts.length} products)...`);
      
      const localFreshProduct = amazonFreshProducts.find(product => product.id === id);
      if (localFreshProduct) {
        console.log(`Found product in local amazonFreshProducts: "${localFreshProduct.title}"`);
        return localFreshProduct;
      }
    }
    
    // Last resort: Try to access a specific product directly (specifically for debugging Amazon Fresh products)
    if (id === 'organic-bananas' && typeof amazonFreshProducts !== 'undefined' && amazonFreshProducts) {
      console.log('Attempting emergency lookup for organic-bananas...');
      const firstProduct = amazonFreshProducts[0];
      if (firstProduct && firstProduct.id === 'organic-bananas') {
        console.log('Emergency lookup successful for organic-bananas');
        return firstProduct;
      }
    }
    
    console.error(`Product with id "${id}" not found in any data source`);
    return null;
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
      ? this.renderFeatures(product.features).outerHTML
      : '';
    
    // Generate badge HTML
    const badgeHtml = product.badge 
      ? `<span class="product-detail-badge ${product.badge}">${product.badge}</span>` 
      : '';
    
    container.innerHTML = `        <div class="product-detail-container">
        <div class="product-detail-image-container" id="productImageContainer">
          <img src="${this.getFormattedImagePath(product.image)}" 
               alt="${product.title}" 
               class="product-detail-img"
               onerror="this.onerror=null; this.src='assets/logo/logo.png';">
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
          
          ${this.createActionButtons(product).outerHTML}
          <p class="product-detail-description">${product.description}</p>
          
          ${featuresHtml}
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
   * Update schema.org product markup with current product data
   */
  updateProductSchema() {
    if (!this.product) return;
    
    const schemaScript = document.getElementById('productSchema');
    if (!schemaScript) return;
    
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.product.name,
      "image": this.product.image,
      "description": this.product.description,
      "brand": {
        "@type": "Brand",
        "name": this.product.brand || this.product.manufacturer || ""
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": this.product.rating.toString(),
        "reviewCount": this.product.reviewCount.toString()
      },
      "review": []
    };
    
    // Add sample reviews if available
    if (this.product.reviews && this.product.reviews.length) {
      schemaData.review = this.product.reviews.map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating.toString()
        },
        "author": {
          "@type": "Person",
          "name": review.author || "Anonymous"
        },
        "reviewBody": review.text
      }));
    }
    
    schemaScript.textContent = JSON.stringify(schemaData);
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

  /**
   * Render features with icons
   */
  renderFeatures(features) {
    const featuresList = document.createElement('ul');
    featuresList.className = 'product-detail-features';
    
    features.forEach(feature => {
      const featureItem = document.createElement('li');
      featureItem.className = 'product-detail-feature';
      
      // Add an appropriate icon based on feature content
      let iconClass = 'check-circle';
      if (feature.toLowerCase().includes('battery')) iconClass = 'battery-full';
      else if (feature.toLowerCase().includes('bluetooth')) iconClass = 'bluetooth';
      else if (feature.toLowerCase().includes('water')) iconClass = 'tint';
      else if (feature.toLowerCase().includes('wireless')) iconClass = 'wifi';
      else if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage')) iconClass = 'memory';
      
      // Create feature content with icon and formatted text
      const featureKey = feature.split(':')[0].trim();
      const featureValue = feature.split(':')[1]?.trim() || '';
      
      featureItem.innerHTML = `
        <i class="fas fa-${iconClass}"></i>
        <div class="feature-text">
          <strong>${featureKey}</strong>
          ${featureValue}
        </div>
      `;
      
      featuresList.appendChild(featureItem);
    });
    
    // Add a title with an icon
    const featuresTitle = document.createElement('h3');
    featuresTitle.className = 'product-detail-features-title';
    featuresTitle.innerHTML = '<i class="fas fa-list-ul"></i> Key Features';
    
    // Add both elements to the container
    const featuresContainer = document.createElement('div');
    featuresContainer.appendChild(featuresTitle);
    featuresContainer.appendChild(featuresList);
    
    return featuresContainer;
  }

  /**
   * Create action buttons with icons
   */
  createActionButtons(product) {
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'product-detail-actions';

    // Buy Now Button
    if (product.affiliateLink) {
      const buyButton = document.createElement('a');
      buyButton.href = product.affiliateLink;
      buyButton.target = '_blank'; // Open in new tab
      buyButton.className = 'product-detail-button primary';
      buyButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy Now on Amazon';
      actionsContainer.appendChild(buyButton);
    }

    // Share Button
    if (product.affiliateLink) {
      const shareButton = document.createElement('button');
      shareButton.className = 'product-detail-button secondary share-button';
      shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share'; // Changed text here
      shareButton.addEventListener('click', () => this.shareProduct(product));
      actionsContainer.appendChild(shareButton);
    }
    
    return actionsContainer;
  }

  shareProduct(product) {
    console.log('shareProduct called for:', product.title);
    console.log('Affiliate link:', product.affiliateLink);
    console.log('navigator.share available:', !!navigator.share);

    if (navigator.share && product.affiliateLink) {
      console.log('Attempting to use Web Share API...');
      navigator.share({
        title: product.title,
        text: `Check out this product: ${product.title}`,
        url: product.affiliateLink,
      })
      .then(() => console.log('Successful share via Web Share API'))
      .catch((error) => console.error('Error sharing via Web Share API:', error));
    } else if (product.affiliateLink) {
      console.log('Web Share API not available or condition not met, falling back to prompt.');
      prompt("Copy this link to share:", product.affiliateLink);
    } else {
      console.log('No affiliate link available to share.');
      alert("No affiliate link available to share for this product.");
    }
  }

  /**
   * Get a properly formatted image path from a product's image property
   * @param {string} imagePath - The image path from the product object
   * @returns {string} A properly formatted image path
   */
  getFormattedImagePath(imagePath) {
    if (!imagePath) return 'assets/logo/logo.png';

    // If path is already a full URL (http:// or https://) return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Remove '../' prefix if it exists since product page is at root level
    if (imagePath.startsWith('../')) {
      imagePath = imagePath.substring(3);
    }
    
    // If path starts with 'assets/', return as is
    if (imagePath.startsWith('assets/')) {
      return imagePath;
    }
    
    // For other cases, ensure it points to products directory
    const filename = imagePath.split('/').pop();
    return `assets/products/${filename}`;
  }
}

// Initialize product detail manager
const productManager = new ProductDetailManager();

// Modify the function that renders product details to ensure the correct order
function renderProduct(product) {
  const productInfo = document.createElement('div');
  productInfo.className = 'product-detail-info';
  
  // 1. Create header with title (appears first)
  const headerDiv = document.createElement('div');
  headerDiv.className = 'product-detail-header';
  const productTitle = document.createElement('h1');
  productTitle.className = 'product-detail-title';
  productTitle.textContent = product.name;
  headerDiv.appendChild(productTitle);
  
  // 2. Create action buttons (appears second)
  const actionsDiv = createActionButtons(product);
  
  // 3. Create meta section with category and ratings (appears third)
  const metaDiv = document.createElement('div');
  metaDiv.className = 'product-detail-meta';
  // populate meta div with category, ratings, etc.
  
  // 4. Create description (appears fourth)
  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'product-detail-description';
  descriptionDiv.textContent = product.description;
  
  // 5. Create features section (appears last)
  const featuresContainer = document.createElement('div');
  featuresContainer.className = 'product-features-container';
  // Create features title with icon
  const featuresTitle = document.createElement('h3');
  featuresTitle.className = 'product-detail-features-title';
  featuresTitle.innerHTML = '<i class="fas fa-list-ul"></i> Key Features';
  
  // Create the features list
  const featuresList = renderFeatures(product.features || []);
  
  featuresContainer.appendChild(featuresTitle);
  featuresContainer.appendChild(featuresList);
  
  // Add all elements to product info in the desired order
  productInfo.appendChild(headerDiv);        // 1. Title
  productInfo.appendChild(actionsDiv);       // 2. Buy button
  productInfo.appendChild(metaDiv);          // 3. Meta info
  productInfo.appendChild(descriptionDiv);   // 4. Description
  productInfo.appendChild(featuresContainer); // 5. Features at the bottom
}

// Helper function to create action buttons
function createActionButtons(product) {
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'product-detail-actions';
  
  const buyButton = document.createElement('button');
  buyButton.className = 'product-detail-button primary';
  buyButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy Now';
  buyButton.onclick = () => alert(`Buying ${product.name}`);
  
  const wishlistButton = document.createElement('button');
  wishlistButton.className = 'product-detail-button secondary';
  wishlistButton.innerHTML = '<i class="fas fa-heart"></i> Add to Wishlist';
  
  actionsDiv.appendChild(buyButton);
  actionsDiv.appendChild(wishlistButton);
  
  return actionsDiv;
}

// Helper function to render features
function renderFeatures(features) {
  const featuresList = document.createElement('ul');
  featuresList.className = 'product-detail-features';
  
  features.forEach(feature => {
    const featureItem = document.createElement('li');
    featureItem.className = 'product-detail-feature';
    
    // Add an appropriate icon based on feature content
    let iconClass = 'check-circle';
    if (feature.toLowerCase().includes('battery')) iconClass = 'battery-full';
    else if (feature.toLowerCase().includes('bluetooth')) iconClass = 'bluetooth';
    else if (feature.toLowerCase().includes('water')) iconClass = 'tint';
    else if (feature.toLowerCase().includes('wireless')) iconClass = 'wifi';
    else if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage')) iconClass = 'memory';
    
    // Create feature content with icon and formatted text
    const featureKey = feature.split(':')[0].trim();
    const featureValue = feature.split(':')[1]?.trim() || '';
    
    featureItem.innerHTML = `
      <i class="fas fa-${iconClass}"></i>
      <div class="feature-text">
        <strong>${featureKey}</strong>
        ${featureValue}
      </div>
    `;
    
    featuresList.appendChild(featureItem);
  });
  
  // Add a title with an icon
  const featuresTitle = document.createElement('h3');
  featuresTitle.className = 'product-detail-features-title';
  featuresTitle.innerHTML = '<i class="fas fa-list-ul"></i> Key Features';
  
  // Add both elements to the container
  const featuresContainer = document.createElement('div');
  featuresContainer.appendChild(featuresTitle);
  featuresContainer.appendChild(featuresList);
  
  return featuresContainer;
}

// ...existing code...

function renderProductDetail(product) {
  // Create container
  const productDetailContainer = document.createElement('div');
  productDetailContainer.className = 'product-detail-container';

  // Create image section
  const productImage = document.createElement('div');
  productImage.className = 'product-detail-image';
  productImage.style.backgroundImage = `url(${product.image})`;
  // ...add badge, image click handlers, etc...

  // Create product info container
  const productInfo = document.createElement('div');
  productInfo.className = 'product-detail-info';

  // 1. ADD TITLE FIRST - Create header with title
  const headerDiv = document.createElement('div');
  headerDiv.className = 'product-detail-header';
  const title = document.createElement('h1');
  title.className = 'product-detail-title';
  title.textContent = product.name;
  headerDiv.appendChild(title);
  productInfo.appendChild(headerDiv); // Add title first!

  // 2. ADD BUTTONS SECOND
  // ...create and append buttons...

  // 3. ADD META INFO THIRD
  // ...create and append meta info...

  // 4. ADD DESCRIPTION FOURTH
  // ...create and append description...

  // 5. ADD FEATURES LAST
  // ...create and append features...

  // Add all sections to container
  productDetailContainer.appendChild(productImage);
  productDetailContainer.appendChild(productInfo);
  
  return productDetailContainer;
}

// Function to share product using the affiliate link
function shareProduct(product) {
  const affiliateLink = product.affiliate_link || product.link; // Use affiliate link if available
  const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name}`,
      url: affiliateLink
  };
  
  // Check if Web Share API is available
  if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
          .then(() => console.log('Product shared successfully'))
          .catch((error) => {
              console.error('Error sharing:', error);
              fallbackShare(affiliateLink);
          });
  } else {
      fallbackShare(affiliateLink);
  }
}

// Fallback share function (copy to clipboard)
function fallbackShare(url) {
  // Create a temporary input element
  const tempInput = document.createElement('input');
  tempInput.value = url;
  document.body.appendChild(tempInput);
  
  // Select and copy the link
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  
  // Show feedback to the user
  alert('Affiliate link copied to clipboard!');
}

// ...existing code...

function renderProductDetail(product) {
  // Create container
  const productDetailContainer = document.createElement('div');
  productDetailContainer.className = 'product-detail-container';

  // Create image section
  const productImage = document.createElement('div');
  productImage.className = 'product-detail-image';
  productImage.style.backgroundImage = `url(${product.image})`;
  // ...add badge, image click handlers, etc...

  // Create product info container
  const productInfo = document.createElement('div');
  productInfo.className = 'product-detail-info';

  // 1. ADD TITLE FIRST - Create header with title
  const headerDiv = document.createElement('div');
  headerDiv.className = 'product-detail-header';
  const title = document.createElement('h1');
  title.className = 'product-detail-title';
  title.textContent = product.name;
  headerDiv.appendChild(title);
  productInfo.appendChild(headerDiv); // Add title first!

  // 2. ADD BUTTONS SECOND
  // ...create and append buttons...

  // 3. ADD META INFO THIRD
  // ...create and append meta info...

  // 4. ADD DESCRIPTION FOURTH
  // ...create and append description...

  // 5. ADD FEATURES LAST
  // ...create and append features...

  // Add all sections to container
  productDetailContainer.appendChild(productImage);
  productDetailContainer.appendChild(productInfo);
  
  return productDetailContainer;
}

// ...existing code...

function renderProductDetail(product) {
    // ...existing code...
    
    // Create product detail HTML
    const productDetailHTML = `
        <div class="product-detail-container">
            <div class="product-detail-image" style="background-image: url('${product.image}')" id="productDetailImage">
                ${getBadgeHTML(product)}
            </div>
            <div class="product-detail-info">
                <div class="product-detail-header">
                    <h1 class="product-detail-title">${product.name}</h1>
                    <div class="product-detail-meta">
                        <a href="products?category=${encodeURIComponent(product.category)}" class="product-detail-category">
                            <i class="fas fa-tag"></i> ${product.category}
                        </a>
                        <div class="product-detail-rating">
                            <div class="product-detail-stars">${getStarsHTML(product.rating)}</div>
                            <span class="product-detail-count">(${product.reviewCount})</span>
                        </div>
                    </div>
                    <p class="product-detail-description">${product.description}</p>
                </div>
                
                <h3 class="product-detail-features-title"><i class="fas fa-check-circle"></i> Key Features</h3>
                <ul class="product-detail-features">
                    ${getProductFeaturesHTML(product.features)}
                </ul>
                
                <div class="product-detail-actions">
                    <a href="${product.link}" target="_blank" class="product-detail-button primary">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </a>
                    <button class="product-detail-button secondary" id="shareProductButton">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Update product container with the new HTML
    productContainer.innerHTML = productDetailHTML;
    
    // Add event listeners after the HTML has been inserted
    document.getElementById('productDetailImage').addEventListener('click', () => {
        openProductZoom(product.image);
    });

    // Add event listener for the share button
    document.getElementById('shareProductButton').addEventListener('click', () => {
        shareProduct(product);
    });
    
    // ...existing code...
}
