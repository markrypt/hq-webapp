// Product data for Toys, Kids & Baby category
const toysKidsBabyProducts = [
  {
    id: "melissa-doug-wooden-puzzle",
    title: "Melissa & Doug Wooden Farm Puzzles Set",
    category: "Toys, Kids & Baby",
    subcategory: "Puzzles & Games",
    tags: ["toys", "puzzles", "educational", "melissa & doug", "toys-kids-and-baby"],
    rating: 4.9,
    reviewCount: 12567,
    image: "assets/products/melissa-doug-puzzle.jpg",
    badge: "educational",
    description: "Set of wooden puzzles with farm themes that help develop fine motor skills and problem-solving abilities.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Set of 3 wooden puzzles with farm animal themes",
      "8-10 pieces per puzzle for ages 3+",
      "Sturdy wooden construction with easy-grasp knobs",
      "Full-color, matching pictures under pieces",
      "Helps develop hand-eye coordination and cognitive skills"
    ],
    colors: ["multicolor"],
    brand: "Melissa & Doug"
  },
  {
    id: "baby-einstein-take-along-tunes",
    title: "Baby Einstein Take Along Tunes Musical Toy",
    category: "Toys, Kids & Baby",
    subcategory: "Baby Toys",
    tags: ["baby", "musical", "developmental", "toy", "toys-kids-and-baby"],
    rating: 4.8,
    reviewCount: 45678,
    image: "assets/products/baby-einstein-music.jpg",
    badge: "bestseller",
    description: "Portable musical toy that introduces babies to classical melodies with colorful lights and easy-grip design.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Features 7 high-quality classical melodies",
      "Volume control for parent-friendly play",
      "Colorful lights dance to the music",
      "Easy-grip handle perfect for little hands",
      "Recommended for ages 3 months+"
    ],
    colors: ["green", "blue"],
    brand: "Baby Einstein"
  },
  {
    id: "lego-classic-creative-box",
    title: "LEGO Classic Large Creative Brick Box",
    category: "Toys, Kids & Baby",
    subcategory: "Building Toys",
    tags: ["lego", "building", "creative", "construction", "toys-kids-and-baby"],
    rating: 4.9,
    reviewCount: 78456,
    image: "assets/products/lego-classic-box.jpg",
    description: "Large set of classic LEGO bricks in 33 different colors for unlimited creative building possibilities.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "790 pieces in 33 different colors",
      "Includes windows, doors, wheels, and eyes",
      "Storage box with sorting trays included",
      "Idea booklet with building suggestions",
      "Compatible with all LEGO construction sets"
    ],
    colors: ["multicolor"],
    brand: "LEGO"
  }
];

// Add toys, kids & baby products to the main products data array
if (typeof productsData !== 'undefined') {
  toysKidsBabyProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('toys-kids-and-baby')) {
      product.tags.push('toys-kids-and-baby');
    }
    productsData.push(product);
  });
  
  // Some baby products should also show up in the baby category
  toysKidsBabyProducts.forEach(product => {
    if (product.subcategory === "Baby Toys" && product.tags && !product.tags.includes('baby')) {
      product.tags.push('baby');
    }
  });
}
