// Product data for Industrial & Scientific category
const industrialAndScientificProducts = [
  {
    id: "industrial-and-scientific-product-1",
    title: "Example Industrial & Scientific Product 1",
    category: "Industrial & Scientific",
    subcategory: "Example Subcategory",
    tags: ["industrial-and-scientific", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Industrial & Scientific category.",
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
    id: "industrial-and-scientific-product-2",
    title: "Example Industrial & Scientific Product 2",
    category: "Industrial & Scientific",
    subcategory: "Another Subcategory",
    tags: ["industrial-and-scientific", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Industrial & Scientific category.",
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
window.industrialAndScientificProducts = industrialAndScientificProducts;

// Add Industrial & Scientific products to the main products data array
if (typeof productsData !== 'undefined') {
  industrialAndScientificProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('industrial-and-scientific')) {
      product.tags.push('industrial-and-scientific');
    }
    productsData.push(product);
  });
}