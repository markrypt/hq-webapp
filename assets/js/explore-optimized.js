/**
 * Optimized script for Explore page performance
 */

// Direct image loading as fallback if lazy loading fails
function ensureImagesLoad() {
  // Wait a short time after page load to check for unloaded images
  setTimeout(() => {
    const images = document.querySelectorAll('.blog-image:not(.loaded)');
    if (images.length > 0) {
      console.log(`Found ${images.length} unloaded images after timeout, loading directly`);
      
      images.forEach(img => {
        if (img.dataset.src && !img.classList.contains('loaded')) {
          img.onload = () => img.classList.add('loaded');
          img.src = img.dataset.src;
        }
      });
    }
  }, 2000); // Check after 2 seconds
}

// Improved image loading with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  // Force card images to load if they didn't load via optimizer
  ensureImagesLoad();
  
  // Add click event listeners to blog cards with performance optimizations
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const url = card.dataset.url;
      if (url) {
        window.location.href = url;
      }
    });
  });
});
