// Product data for Pet Supplies category
const petSuppliesProducts = [
  {
    id: "pet-hair-remover-brush",
    title: "ChomChom Pet Hair Remover",
    category: "Pet Supplies",
    subcategory: "Grooming",
    tags: ["pet hair", "grooming", "cleaning", "dog", "cat", "pet-supplies"],
    rating: 4.8,
    reviewCount: 123456,
    image: "assets/products/chomchom-pet-hair-remover.jpg",
    badge: "bestseller",
    description: "Reusable pet hair remover that quickly removes pet hair from furniture, bedding, and clothing without adhesives or refills.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Reusable design with no adhesive or refills needed",
      "Works on furniture, clothing, bedding, and car seats",
      "Simple back-and-forth rolling motion for cleaning",
      "Easy-to-clean hair collection chamber",
      "Eco-friendly alternative to disposable lint rollers"
    ],
    colors: ["green", "white"],
    brand: "ChomChom Roller"
  },
  {
    id: "dog-slow-feeder-bowl",
    title: "Outward Hound Fun Feeder Dog Bowl",
    category: "Pet Supplies",
    subcategory: "Feeding",
    tags: ["dog", "feeder", "slow feeder", "bowl", "pet-supplies"],
    rating: 4.7,
    reviewCount: 45678,
    image: "assets/products/slow-feeder-bowl.jpg",
    description: "Slow feeder bowl designed to help dogs eat slower, improving digestion and preventing bloat.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Maze-like design slows eating pace by up to 10 times",
      "Helps prevent bloating, regurgitation, and obesity",
      "Non-slip base keeps the bowl in place during feeding",
      "Made from food-safe, BPA-free materials",
      "Dishwasher safe for easy cleaning"
    ],
    colors: ["orange", "blue", "purple", "teal"],
    brand: "Outward Hound"
  },
  {
    id: "cat-water-fountain",
    title: "Catit Flower Cat Water Fountain",
    category: "Pet Supplies",
    subcategory: "Watering",
    tags: ["cat", "water", "fountain", "hydration", "pet-supplies"],
    rating: 4.6,
    reviewCount: 34567,
    image: "assets/products/catit-fountain.jpg",
    description: "Flower-shaped water fountain that encourages cats to stay hydrated with circulating, filtered water.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "3L capacity with 3 different water flow settings",
      "Encourages pets to drink more water",
      "Energy-efficient, low-voltage pump",
      "Triple-action filter removes debris, odors, and impurities",
      "Easy to clean and dishwasher safe (excluding pump)"
    ],
    colors: ["green", "white"],
    brand: "Catit"
  }
];

// Add pet supplies products to the main products data array
if (typeof productsData !== 'undefined') {
  petSuppliesProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('pet-supplies')) {
      product.tags.push('pet-supplies');
    }
    productsData.push(product);
  });
}
