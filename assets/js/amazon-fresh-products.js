// Product data for Amazon Fresh category
const amazonfreshProducts = [
  {
    id: "amazon-fresh-product-1",
    title: "Example Amazon Fresh Product 1",
    category: "Amazon Fresh",
    subcategory: "Example Subcategory",
    tags: ["amazon-fresh", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Amazon Fresh category.",
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
    id: "amazon-fresh-product-2",
    title: "Example Amazon Fresh Product 2",
    category: "Amazon Fresh",
    subcategory: "Another Subcategory",
    tags: ["amazon-fresh", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Amazon Fresh category.",
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

// Add Amazon Fresh products to the main products data array
if (typeof productsData !== 'undefined') {
  amazonfreshProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('amazon-fresh')) {
      product.tags.push('amazon-fresh');
    }
    productsData.push(product);
  });
}