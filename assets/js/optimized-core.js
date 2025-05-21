/**
 * Optimized Core Script
 * Consolidated functionality for image loading, resource preloading and performance monitoring
 * 
 * This file combines multiple optimization strategies that were previously spread across
 * several files (preload.js, image-optimizer.js, explore-optimized.js) to improve
 * maintainability and reduce HTTP requests.
 * 
 * Global search initialization also integrated to reduce HTTP requests.
 */

// Immediately execute preload functions
(function() {
  // Preconnect to external domains
  ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'].forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical resources based on current page
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  
  // Define resources to preload based on page
  const pagePriorities = {
    'explore': {
      images: ['assets/hero/hero1.jpg', 'assets/hero/hero2.jpg'],
      stylesheets: ['assets/css/explore-optimized.css']
    },
    'index': {
      images: ['assets/products/jbl-go-4-squad.jpg', 'assets/products/beskar-foot-massager.jpg'],
      stylesheets: []
    },
    'products': {
      images: [],
      stylesheets: []
    }
  };

  // Get resources for current page, or default to an empty array
  const pageResources = pagePriorities[currentPage] || { images: [], stylesheets: [] };
  
  // Preload page-specific stylesheets
  pageResources.stylesheets.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'style';
    document.head.appendChild(link);
  });

  // Create a low priority preload for the first few hero images
  pageResources.images.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    link.fetchPriority = 'low';
    document.head.appendChild(link);
  });

  // Cache components
  ['assets/components/header.html', 'assets/components/navigation.html'].forEach(url => {
    if ('caches' in window) {
      caches.open('components-cache').then(cache => {
        cache.add(url).catch(() => {});
      });
    }
  });
})();

/**
 * Image Optimizer Class
 * Enhanced image loading with IntersectionObserver, error handling and fallbacks
 */
class ImageOptimizer {  constructor(options = {}) {
    this.options = {
      selector: '.blog-image, .product-image, .lazy-image', // Default image selectors
      rootMargin: '200px 0px', // Load images 200px before they come into view
      threshold: 0.01,
      loadedClass: 'loaded',
      placeholderSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      ...options
    };
    
    // Store observed images to prevent double observation
    this.observedImages = new WeakSet();
    // Track loading status
    this.loadingStats = {
      total: 0,
      loaded: 0,
      failed: 0
    };
    
    // Check for WebP support
    this.supportsWebP = this.checkWebPSupport();
    
    // Init optimizer
    this.init();
  }
  
  // Check if the browser supports WebP images
  checkWebPSupport() {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }
  
  // Initialize the image optimizer
  init() {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Create intersection observer if supported
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver(
        this.onIntersection.bind(this), 
        {
          rootMargin: this.options.rootMargin,
          threshold: this.options.threshold
        }
      );
      
      // Start observing all images on page
      this.observeImages();
      
      // Watch for DOM changes to observe new images
      this.watchDOMChanges();
      
      // Set up safety net for any missed images
      this.setupSafetyNet();
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadAllImages();
    }
  }

  // Handle intersection events - when images enter the viewport
  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.imageObserver.unobserve(entry.target);
      }
    });
  }
    // Load a single image
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    this.loadingStats.total++;
    
    // Check if WebP version exists and can be used
    if (this.supportsWebP && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
      
      // Try to load WebP version first
      const webpImg = new Image();
      webpImg.onload = () => {
        // WebP exists and loaded successfully, use it
        img.src = webpSrc;
        img.onload = () => {
          img.classList.add(this.options.loadedClass);
          this.loadingStats.loaded++;
          
          // Trigger event for other components
          const loadEvent = new CustomEvent('imageLoaded', { detail: { image: img } });
          img.dispatchEvent(loadEvent);
        };
      };
      
      webpImg.onerror = () => {
        // WebP doesn't exist or failed, fall back to original format
        this.loadOriginalImage(img, src);
      };
      
      // Start trying to load WebP
      webpImg.src = webpSrc;
    } else {
      // Browser doesn't support WebP or not an image type we convert, load original
      this.loadOriginalImage(img, src);
    }
  }
  
  // Load the original image format
  loadOriginalImage(img, src) {
    img.onload = () => {
      img.classList.add(this.options.loadedClass);
      this.loadingStats.loaded++;
      
      // Trigger event for other components
      const loadEvent = new CustomEvent('imageLoaded', { detail: { image: img } });
      img.dispatchEvent(loadEvent);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      this.loadingStats.failed++;
      
      // Try again once with a slight delay
      setTimeout(() => {
        if (!img.classList.contains(this.options.loadedClass)) {
          img.src = src;
        }
      }, 2000);
    };
    
    // Set the source to begin loading
    img.src = src;
  }
  
  // Find and observe all matching images
  observeImages() {
    const images = document.querySelectorAll(this.options.selector);
    
    if (images.length > 0) {
      console.log(`Found ${images.length} images to lazy load`);
    }
    
    images.forEach(img => {
      // Skip if already observed
      if (this.observedImages.has(img)) return;
      
      // Skip if no data-src
      if (!img.dataset.src) {
        console.warn('Image missing data-src attribute:', img);
        return;
      }
      
      // Add a placeholder if needed
      if (!img.src || img.src === '') {
        img.src = this.options.placeholderSrc;
      }
      
      // Start observing the image
      this.imageObserver.observe(img);
      this.observedImages.add(img);
    });
  }
  
  // Watch for DOM changes to handle dynamically added images
  watchDOMChanges() {
    if ('MutationObserver' in window) {
      const mutationObserver = new MutationObserver((mutations) => {
        const hasNewNodes = mutations.some(mutation => 
          mutation.type === 'childList' && mutation.addedNodes.length > 0
        );
        
        if (hasNewNodes) {
          this.observeImages();
        }
      });
      
      // Watch for changes to the entire document
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  
  // Safety net - load any missed images after a timeout
  setupSafetyNet() {
    // First check after 3 seconds
    setTimeout(() => this.checkForUnloadedImages(), 3000);
    
    // Second check after page fully loads
    window.addEventListener('load', () => {
      // Wait a bit after load to ensure all other scripts have run
      setTimeout(() => this.checkForUnloadedImages(), 1000);
    });
  }
  
  // Check for any images that haven't loaded yet and force load them
  checkForUnloadedImages() {
    const unloadedImages = document.querySelectorAll(`${this.options.selector}:not(.${this.options.loadedClass})`);
    
    if (unloadedImages.length > 0) {
      console.log(`Safety net found ${unloadedImages.length} unloaded images - forcing load`);
      
      unloadedImages.forEach(img => {
        if (img.dataset.src && !img.classList.contains(this.options.loadedClass)) {
          img.onload = () => img.classList.add(this.options.loadedClass);
          img.src = img.dataset.src;
        }
      });
    }
  }
  
  // Fallback to load all images immediately
  loadAllImages() {
    const images = document.querySelectorAll(this.options.selector);
    
    if (images.length > 0) {
      console.log(`Fallback loading all ${images.length} images immediately`);
    }
    
    images.forEach(img => {
      if (img.dataset.src) {
        img.onload = () => img.classList.add(this.options.loadedClass);
        img.src = img.dataset.src;
      }
    });
  }
  
  // Add image loading to items with data-url attribute (like blog cards)
  setupCardClicks() {
    const clickableItems = document.querySelectorAll('[data-url]');
    
    clickableItems.forEach(item => {
      item.addEventListener('click', () => {
        const url = item.dataset.url;
        if (url) {
          window.location.href = url;
        }
      });
    });
  }
}

// Create a global optimizer instance
let globalImageOptimizer;

// Initialize optimizer when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    globalImageOptimizer = new ImageOptimizer();
    globalImageOptimizer.setupCardClicks();
  });
} else {
  globalImageOptimizer = new ImageOptimizer();
  globalImageOptimizer.setupCardClicks();
}

// Performance monitoring
window.performance.mark('optimized-core-loaded');

// Global search initialization functionality
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

// Ensure necessary scripts are loaded for search functionality
document.addEventListener('DOMContentLoaded', function() {
  // First, ensure products-data.js is loaded (needed for search)
  if (typeof window.productsData === 'undefined' && !document.querySelector('script[src$="products-data.js"]')) {
    const productsDataScript = document.createElement('script');
    productsDataScript.src = getBasePath() + 'assets/js/products-data.js';
    document.body.appendChild(productsDataScript);
  }
  
  // Then ensure search.js is loaded
  if (typeof window.searchManager === 'undefined' && !document.querySelector('script[src$="search.js"]')) {
    const searchScript = document.createElement('script');
    searchScript.src = getBasePath() + 'assets/js/search.js';
    document.body.appendChild(searchScript);
  }
});
