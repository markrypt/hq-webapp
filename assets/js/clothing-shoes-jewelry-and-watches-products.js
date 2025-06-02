// Initialize window.MARKRYPT if not exists
window.MARKRYPT = window.MARKRYPT || {};

// Product data for Clothing, Shoes, Jewelry & Watches category
const clothingShoesJewelryAndWatchesProducts = [
  {
    id: "nike-running-shoes",
    title: "Nike Air Zoom Pegasus 38 Running Shoes",
    category: "Clothing",
    subcategory: "Shoes",
    tags: ["clothing-shoes-jewelry-and-watches", "shoes", "running", "athletic", "nike"],
    rating: 4.7,
    reviewCount: 8923,
    image: "assets/products/nike-pegasus-38.jpg",
    badge: "bestseller",
    description: "Nike's iconic running shoe with responsive cushioning and breathable mesh upper for comfort during your runs.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Nike React foam for responsive cushioning",
      "Breathable mesh upper adapts to your foot",
      "Midfoot band provides a snug, supportive fit",
      "Zoom Air unit in the forefoot for added responsiveness",
      "Durable rubber outsole for traction"
    ],
    colors: ["black", "white", "blue", "red", "gray"],
    brand: "Nike"
  },
  {
    id: "adidas-ultraboost",
    title: "Adidas Ultraboost 22 Running Shoes",
    category: "Clothing",
    subcategory: "Shoes",
    tags: ["shoes", "running", "athletic", "adidas", "clothing-shoes-jewelry-and-watches"],
    rating: 4.8,
    reviewCount: 7654,
    image: "assets/products/adidas-ultraboost.jpg",
    description: "Experience extraordinary comfort and energy return with these premium running shoes featuring Boost technology.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Responsive Boost midsole returns energy with every step",
      "Primeknit upper adapts to the changing shape of your foot",
      "Linear Energy Push system increases stability",
      "Continental™ Rubber outsole for extraordinary grip",
      "Made with Primeblue, a high-performance recycled material"
    ],
    colors: ["black", "white", "gray", "blue"],
    brand: "Adidas"
  },
  {
    id: "fossil-gen6-smartwatch",
    title: "Fossil Gen 6 Touchscreen Smartwatch",
    category: "Watches",
    subcategory: "Smart Watches",
    tags: ["watch", "smartwatch", "fossil", "wearable", "clothing-shoes-jewelry-and-watches"],
    rating: 4.4,
    reviewCount: 3421,
    image: "assets/products/fossil-gen6-smartwatch.jpg",
    badge: "new",
    description: "The Fossil Gen 6 smartwatch combines classic design with advanced technology, featuring a faster processor and improved health tracking.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Qualcomm Snapdragon Wear 4100+ processor",
      "Heart rate tracking, SpO2 monitoring, and sleep tracking",
      "Fast charging - 80% in 30 minutes",
      "Customizable dials and interchangeable straps",
      "Swimproof design with 3 ATM water resistance"
    ],
    colors: ["black", "brown", "silver", "rose gold"],
    brand: "Fossil"
  }
];

// Assign products to global scope
window.MARKRYPT.clothingShoesJewelryAndWatchesProducts = clothingShoesJewelryAndWatchesProducts;

// Log product loading status
console.log('[Clothing, Shoes, Jewelry & Watches] Products loaded:', clothingShoesJewelryAndWatchesProducts.length);

// Add Clothing products to the main products data array
if (typeof productsData !== 'undefined') {
  clothingShoesJewelryAndWatchesProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('clothing-shoes-jewelry-and-watches')) {
      product.tags.push('clothing-shoes-jewelry-and-watches');
    }
    productsData.push(product);
  });
}
