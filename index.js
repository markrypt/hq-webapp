// Main JavaScript file for Markrypt
document.addEventListener('DOMContentLoaded', () => {
  // Add any home page specific functionality here
  
  // Example: Add event listeners for hero buttons
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  if (heroButtons) {
    heroButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.target;
        if (target) {
          window.location.href = target;
        }
      });
    });
  }
});
