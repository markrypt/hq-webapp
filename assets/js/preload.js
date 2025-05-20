/**
 * Resource Preloader
 * Preloads critical resources like header and navigation components
 * to improve page performance.
 */

(function() {
  // Preload header and navigation components
  const componentUrls = [
    'assets/components/header.html',
    'assets/components/navigation.html'
  ];
  
  // Preload critical CSS
  const stylesheetUrls = [
    'assets/css/explore-optimized.css'
  ];
  
  // Preload critical JavaScript
  const scriptUrls = [
    'assets/js/image-optimizer.js',
    'assets/js/explore-optimized.js'
  ];
  
  // Create preload link elements
  function preloadResource(url, as) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    if (as) link.as = as;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
  
  // Fetch and cache components
  function prefetchComponent(url) {
    if ('caches' in window) {
      caches.open('components-cache').then(cache => {
        cache.add(url).catch(err => {
          console.warn('Failed to cache component:', url, err);
        });
      });
    } else {
      // Fallback for browsers without Cache API
      fetch(url, { cache: 'force-cache' }).catch(() => {});
    }
  }
  
  // Preload hero images (first 4 only for performance)
  function preloadHeroImages() {
    const heroImageUrls = [
      'assets/hero/hero1.jpg',
      'assets/hero/hero2.jpg',
      'assets/hero/hero3.jpg',
      'assets/hero/hero4.jpg'
    ];
    
    // Only preload the first 4 images to avoid too many concurrent requests
    heroImageUrls.forEach(url => {
      preloadResource(url, 'image');
    });
  }
  
  // Initialize preloading
  function init() {
    // Preconnect to external domains
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'].forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload CSS
    stylesheetUrls.forEach(url => {
      preloadResource(url, 'style');
    });
    
    // Preload JS
    scriptUrls.forEach(url => {
      preloadResource(url, 'script');
    });
    
    // Cache components
    componentUrls.forEach(url => {
      prefetchComponent(url);
    });
    
    // Preload hero images (with a slight delay to prioritize critical resources)
    setTimeout(preloadHeroImages, 100);
  }
  
  // Start preloading as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
