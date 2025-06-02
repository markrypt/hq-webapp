// Product data for Smart Home category
const smartHomeProducts = [
  {
    id: "smart-home-product-1",
    title: "Example Smart Home Product 1",
    category: "Smart Home",
    subcategory: "Example Subcategory",
    tags: ["smart-home", "smart-home-security", "automation"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Smart Home category.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    colors: ["black", "white"],
    brand: "Example Brand"
  },
  {
    id: "smart-home-product-2",
    title: "Example Smart Home Product 2",
    category: "Smart Home",
    subcategory: "Another Subcategory",
    tags: ["smart-home", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Smart Home category.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    colors: ["red", "blue"],
    brand: "Another Brand"
  }
];

// Assign to window object so it can be accessed globally
window.smartHomeProducts = smartHomeProducts;

// Add Smart Home products to the main products data array
if (typeof productsData !== 'undefined') {
  smartHomeProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('smart-home')) {
      product.tags.push('smart-home');
    }
    productsData.push(product);
  });
}