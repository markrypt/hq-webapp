// Product data for Handmade category
const handmadeProducts = [
  {
    id: "handmade-product-1",
    title: "Example Handmade Product 1",
    category: "Handmade",
    subcategory: "Example Subcategory",
    tags: ["handmade", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Handmade category.",
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
    id: "handmade-product-2",
    title: "Example Handmade Product 2",
    category: "Handmade",
    subcategory: "Another Subcategory",
    tags: ["handmade", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Handmade category.",
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

// Explicitly assign handmadeProducts to window object so it's globally accessible
window.handmadeProducts = handmadeProducts;

// Add Handmade products to the main products data array
if (typeof productsData !== 'undefined') {
  handmadeProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('handmade')) {
      product.tags.push('handmade');
    }
    productsData.push(product);
  });
}