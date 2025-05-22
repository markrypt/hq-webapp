// Product data for Whole Foods Market category
const wholefoodsmarketProducts = [
  {
    id: "whole-foods-market-product-1",
    title: "Example Whole Foods Market Product 1",
    category: "Whole Foods Market",
    subcategory: "Example Subcategory",
    tags: ["whole-foods-market", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Whole Foods Market category.",
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
    id: "whole-foods-market-product-2",
    title: "Example Whole Foods Market Product 2",
    category: "Whole Foods Market",
    subcategory: "Another Subcategory",
    tags: ["whole-foods-market", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Whole Foods Market category.",
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

// Add Whole Foods Market products to the main products data array
if (typeof productsData !== 'undefined') {
  wholefoodsmarketProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('whole-foods-market')) {
      product.tags.push('whole-foods-market');
    }
    productsData.push(product);
  });
}