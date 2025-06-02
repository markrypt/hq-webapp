// Product data for Computers category
const computersProducts = [
  {
    id: "computers-product-1",
    title: "Example Computers Product 1",
    category: "Computers",
    subcategory: "Example Subcategory",
    tags: ["computers", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Computers category.",
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
    id: "computers-product-2",
    title: "Example Computers Product 2",
    category: "Computers",
    subcategory: "Another Subcategory",
    tags: ["computers", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Computers category.",
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
window.computersProducts = computersProducts;

// Add Computers products to the main products data array
if (typeof productsData !== 'undefined') {
  computersProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('computers')) {
      product.tags.push('computers');
    }
    productsData.push(product);
  });
}