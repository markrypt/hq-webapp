// Product data for Household Essentials category
const householdEssentialsProducts = [
  {
    id: "household-essentials-product-1",
    title: "Example Household Essentials Product 1",
    category: "Household Essentials",
    subcategory: "Example Subcategory",
    tags: ["household-essentials", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Household Essentials category.",
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
    id: "household-essentials-product-2",
    title: "Example Household Essentials Product 2",
    category: "Household Essentials",
    subcategory: "Another Subcategory",
    tags: ["household-essentials", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Household Essentials category.",
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
window.householdEssentialsProducts = householdEssentialsProducts;

// Add Household Essentials products to the main products data array
if (typeof productsData !== 'undefined') {
  householdEssentialsProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('household-essentials')) {
      product.tags.push('household-essentials');
    }
    productsData.push(product);
  });
}