// Product data for Movies, Music & Games category
const moviesmusicandgamesProducts = [
  {
    id: "movies-music-and-games-product-1",
    title: "Example Movies, Music & Games Product 1",
    category: "Movies, Music & Games",
    subcategory: "Example Subcategory",
    tags: ["movies-music-and-games", "example", "product"],
    rating: 4.5,
    reviewCount: 1234,
    image: "assets/products/placeholder.jpg",
    description: "This is an example product for the Movies, Music & Games category.",
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
    id: "movies-music-and-games-product-2",
    title: "Example Movies, Music & Games Product 2",
    category: "Movies, Music & Games",
    subcategory: "Another Subcategory",
    tags: ["movies-music-and-games", "example", "product"],
    rating: 4.7,
    reviewCount: 5678,
    image: "assets/products/placeholder.jpg",
    description: "Another example product for the Movies, Music & Games category.",
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

// Add Movies, Music & Games products to the main products data array
if (typeof productsData !== 'undefined') {
  moviesmusicandgamesProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('movies-music-and-games')) {
      product.tags.push('movies-music-and-games');
    }
    productsData.push(product);
  });
}