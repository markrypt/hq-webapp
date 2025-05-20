/**
 * Image Optimizer Script
 * Handles efficient image loading and optimization features
 */

class ImageOptimizer {
  constructor(options = {}) {
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
    // Init observer on construction if supported
    this.init();
  }
  
  /**
   * Initialize the image optimizer
   */
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
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadAllImages();
    }
  }
    /**
   * Handle intersection events
   * @param {IntersectionObserverEntry[]} entries 
   */
  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.imageObserver.unobserve(entry.target);
      }
    });
  }
  
  /**
   * Load a single image
   * @param {HTMLImageElement} img - The image element to load
   */
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    // Direct approach - simpler and more reliable
    img.onload = () => {
      img.classList.add(this.options.loadedClass);
      
      // Trigger a custom event for other components to listen to
      const loadEvent = new CustomEvent('imageLoaded', { detail: { image: img } });
      img.dispatchEvent(loadEvent);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      // Try again once with a slight delay
      setTimeout(() => {
        img.src = src;
      }, 1000);
    };
    
    // Set the source to begin loading
    img.src = src;
  }
    /**
   * Finds and observes all images matching our selector
   */
  observeImages() {
    const images = document.querySelectorAll(this.options.selector);
    
    // Log how many images we're trying to observe
    console.log(`Found ${images.length} images to lazy load`);
    
    images.forEach(img => {
      // Skip if already observed or no data-src
      if (this.observedImages.has(img)) {
        return;
      }
      
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
  
  /**
   * Watch for DOM changes to handle dynamically added images
   */
  watchDOMChanges() {
    if ('MutationObserver' in window) {
      const mutationObserver = new MutationObserver((mutations) => {
        // Check if any mutation added nodes that might contain images
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
    /**
   * Fallback to load all images immediately
   * Used for browsers that don't support IntersectionObserver
   */
  loadAllImages() {
    const images = document.querySelectorAll(this.options.selector);
    console.log(`Fallback: Loading all ${images.length} images immediately`);
    
    images.forEach(img => {
      if (img.dataset.src) {
        img.onload = () => {
          img.classList.add(this.options.loadedClass);
        };
        img.src = img.dataset.src;
      }
    });
  }
}

// Create a global instance when the script loads
// but also make sure we initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
    console.log('Image optimizer initialized on DOMContentLoaded');
  });
} else {
  window.imageOptimizer = new ImageOptimizer();
  console.log('Image optimizer initialized immediately');
}

/**
 * Generate optimized image URL based on size and format
 * This is a placeholder for potential image CDN integration
 * @param {string} src - Original image URL
 * @param {Object} options - Options like width, height, format
 * @returns {string} Optimized image URL
 */
function getOptimizedImageUrl(src, options = {}) {
  // This function could be expanded to work with an image CDN
  // For now, it just returns the original source
  return src;
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ImageOptimizer, getOptimizedImageUrl };
}

// Add a global safety net for image loading
window.addEventListener('load', function() {
  // After everything is loaded, make one final check for any images
  // that didn't get loaded by our lazy loader
  setTimeout(function() {
    const unloadedImages = document.querySelectorAll('img[data-src]:not(.loaded)');
    console.log('Final safety check found', unloadedImages.length, 'unloaded images');
    
    if (unloadedImages.length > 0) {
      unloadedImages.forEach(img => {
        // Force load the image directly
        console.log('Safety net loading:', img.dataset.src);
        img.onload = function() {
          this.classList.add('loaded');
        };
        img.src = img.dataset.src;
      });
    }
  }, 3000); // Wait 3 seconds after window load
});
