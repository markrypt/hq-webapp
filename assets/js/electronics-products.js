// Initialize window.MARKRYPT if not exists
window.MARKRYPT = window.MARKRYPT || {};

// Electronics category products data
const electronicsProducts = [
  {
    id: "sony-wh1000xm5",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    subcategory: "Headphones",
    rating: 4.9,
    reviewCount: 5678,
    brand: "Sony",
    image: "../assets/products/sony-wh1000xm5.jpg",
    badge: "premium",
    colors: ["black", "silver"],
    affiliateLink: "https://amazon.com/sony-wh1000xm5",
    tags: ["electronics", "headphones", "sony", "wireless", "noise-cancelling"],
    description: "Industry-leading noise cancellation and exceptional sound quality with up to 30 hours of battery life.",
    features: [
      "Industry-leading noise cancellation with 8 microphones",
      "Up to 30 hours of battery life with quick charging",
      "Crystal clear hands-free calling with 4 beamforming microphones",
      "Multipoint connection allows pairing with two Bluetooth devices at once",
      "Lightweight design with soft-fit leather for all-day comfort"
    ]
  },
  {
    id: "samsung-galaxy-s23-ultra",
    title: "Samsung Galaxy S23 Ultra Smartphone",
    category: "Electronics",
    subcategory: "Smartphones",
    tags: ["smartphone", "samsung", "android", "galaxy", "electronics"],
    rating: 4.8,
    reviewCount: 12345,
    image: "../assets/products/samsung-s23-ultra.jpg",
    badge: "bestseller",    description: "Samsung's flagship smartphone with a powerful 200MP camera, S Pen, and advanced AI features.",
    affiliateLink: "https://amazon.com/samsung-galaxy-s23-ultra",
    features: [
      "200MP main camera with advanced nightography capabilities",
      "Built-in S Pen for note-taking and creative tasks",
      "Snapdragon 8 Gen 2 processor optimized for Galaxy",
      "5000mAh battery with fast charging",
      "Dynamic AMOLED 2X display with adaptive refresh rate"
    ],
    colors: ["phantom black", "cream", "green", "lavender"],
    brand: "Samsung"
  },
  {
    id: "lg-oled-c3",
    title: "LG C3 Series OLED TV 65-inch",
    category: "Electronics",
    subcategory: "Televisions",
    tags: ["tv", "oled", "lg", "smart tv", "electronics"],
    rating: 4.9,
    reviewCount: 8765,
    image: "../assets/products/lg-c3-oled.jpg",
    badge: "premium",    description: "Stunning OLED TV with self-lit pixels, AI-powered processing, and premium gaming features.",
    affiliateLink: "https://amazon.com/lg-c3-oled-65-inch",
    features: [
      "OLED evo technology for superior brightness and color accuracy",
      "α9 Gen6 AI Processor 4K for enhanced picture and sound",
      "Dolby Vision IQ and Dolby Atmos for immersive entertainment",
      "4 HDMI 2.1 ports with NVIDIA G-SYNC, AMD FreeSync, and VRR",
      "webOS 23 smart platform with voice control"
    ],
    colors: ["black"],
    brand: "LG"
  }
];

// Assign products to global scope
window.MARKRYPT.electronicsProducts = electronicsProducts;

// Log product loading status
console.log('[Electronics] Products loaded:', electronicsProducts.length);

// Add Electronics products to the main products data array
if (typeof window.productsData !== 'undefined') {
  electronicsProducts.forEach(product => {
    // Add the category tag if not already present
    if (product.tags && !product.tags.includes('electronics')) {
      product.tags.push('electronics');
    }
    window.productsData.push(product);
  });
}
