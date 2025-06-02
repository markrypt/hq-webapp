// Product data for Sports & Outdoors category
const sportsAndOutdoorsProducts = [
  {
    id: "yeti-tundra-cooler",
    title: "YETI Tundra 45 Cooler",
    category: "Sports & Outdoors",
    subcategory: "Outdoor Recreation",
    tags: ["cooler", "camping", "outdoor", "yeti", "sports-and-outdoors"],
    rating: 4.8,
    reviewCount: 28675,
    image: "assets/products/yeti-tundra.jpg",
    badge: "premium",
    description: "Premium hard cooler that keeps ice for days, with rugged construction for outdoor adventures.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Rotomolded construction makes it virtually indestructible",
      "Permafrost insulation keeps contents cold for days",
      "T-Rex lid latches ensure a tight seal",
      "NeverFail hinge system prevents lid from breaking",
      "Certified bear-resistant when used with padlocks"
    ],
    colors: ["white", "tan", "blue"],
    brand: "YETI"
  },
  {
    id: "garmin-forerunner-945",
    title: "Garmin Forerunner 945 GPS Running Watch",
    category: "Sports & Outdoors",
    subcategory: "Fitness",
    tags: ["fitness tracker", "running", "gps", "garmin", "sports-and-outdoors"],
    rating: 4.7,
    reviewCount: 15489,
    image: "assets/products/garmin-forerunner.jpg",
    description: "Premium GPS running/triathlon smartwatch with advanced features for serious athletes.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "GPS, GLONASS and Galileo satellite navigation",
      "Training load focus and performance monitoring",
      "Full-color onboard maps for navigation",
      "Music storage for up to 1,000 songs",
      "Up to 2 weeks battery life in smartwatch mode"
    ],
    colors: ["black", "blue"],
    brand: "Garmin"
  },
  {
    id: "hydro-flask-water-bottle",
    title: "Hydro Flask 32oz Wide Mouth Water Bottle",
    category: "Sports & Outdoors",
    subcategory: "Hydration",
    tags: ["water bottle", "hydration", "insulated", "hydro flask", "sports-and-outdoors"],
    rating: 4.8,
    reviewCount: 32678,
    image: "assets/products/hydro-flask.jpg",
    badge: "bestseller",
    description: "Double-wall vacuum insulated stainless steel water bottle that keeps beverages cold for up to 24 hours.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "TempShield double-wall vacuum insulation",
      "Keeps drinks cold for 24 hours, hot for 12 hours",
      "Durable 18/8 pro-grade stainless steel construction",
      "Powder coat finish for slip-free grip",
      "BPA-free and phthalate-free materials"
    ],
    colors: ["black", "white", "green", "blue", "red", "yellow"],
    brand: "Hydro Flask"
  }
];

// Assign to window object so it can be accessed globally
window.sportsAndOutdoorsProducts = sportsAndOutdoorsProducts;

// Add sports & outdoors products to the main products data array
if (typeof productsData !== 'undefined') {
  sportsAndOutdoorsProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('sports-and-outdoors')) {
      product.tags.push('sports-and-outdoors');
    }
    productsData.push(product);
  });
}
