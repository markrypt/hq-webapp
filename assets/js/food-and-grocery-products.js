// Product data for Food & Grocery category
const foodAndGroceryProducts = [
  {
    id: "food-and-grocery-product-1",
    title: "Example Food & Grocery Product 1",
    category: "Food & Grocery",
    subcategory: "Example Subcategory",
    tags: ["food-and-grocery", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Food & Grocery category.",
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
    id: "food-and-grocery-product-2",
    title: "Example Food & Grocery Product 2",
    category: "Food & Grocery",
    subcategory: "Another Subcategory",
    tags: ["food-and-grocery", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Food & Grocery category.",
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
window.foodAndGroceryProducts = foodAndGroceryProducts;

// Add Food & Grocery products to the main products data array
if (typeof productsData !== 'undefined') {
  foodAndGroceryProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('food-and-grocery')) {
      product.tags.push('food-and-grocery');
    }
    productsData.push(product);
  });
}