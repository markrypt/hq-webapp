// Product data for Automotive category
const automotiveProducts = [
  {
    id: "automotive-product-1",
    title: "Example Automotive Product 1",
    category: "Automotive",
    subcategory: "Example Subcategory",
    tags: ["automotive", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Automotive category.",
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
    id: "automotive-product-2",
    title: "Example Automotive Product 2",
    category: "Automotive",
    subcategory: "Another Subcategory",
    tags: ["automotive", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Automotive category.",
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

// Add Automotive products to the main products data array
if (typeof productsData !== 'undefined') {
  automotiveProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('automotive')) {
      product.tags.push('automotive');
    }
    productsData.push(product);
  });
}