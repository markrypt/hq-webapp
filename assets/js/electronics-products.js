// Electronics category products
const electronicsProducts = [
  {
    id: "sony-wh1000xm5",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    subcategory: "Headphones",
    tags: ["headphones", "sony", "wireless", "noise-cancelling", "electronics"],
    rating: 4.9,
    reviewCount: 5678,
    image: "assets/products/sony-wh1000xm5.jpg",
    badge: "premium",
    description: "Industry-leading noise cancellation and exceptional sound quality with up to 30 hours of battery life.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Industry-leading noise cancellation with 8 microphones",
      "Up to 30 hours of battery life with quick charging",
      "Crystal clear hands-free calling with 4 beamforming microphones",
      "Multipoint connection allows pairing with two Bluetooth devices at once",
      "Lightweight design with soft-fit leather for all-day comfort"
    ],
    colors: ["black", "silver", "blue"],
    brand: "Sony"
  },
  {
    id: "samsung-galaxy-s23-ultra",
    title: "Samsung Galaxy S23 Ultra Smartphone",
    category: "Electronics",
    subcategory: "Smartphones",
    tags: ["smartphone", "samsung", "android", "galaxy", "electronics"],
    rating: 4.8,
    reviewCount: 12345,
    image: "assets/products/samsung-s23-ultra.jpg",
    badge: "bestseller",
    description: "Samsung's flagship smartphone with a powerful 200MP camera, S Pen, and advanced AI features.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
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
    image: "assets/products/lg-c3-oled.jpg",
    badge: "premium",
    description: "Stunning OLED TV with self-lit pixels, AI-powered processing, and premium gaming features.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
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

// Add the electronics products to the main products array
electronicsProducts.forEach(product => {
  // Check if the product already exists in the array
  if (!productsData.some(p => p.id === product.id)) {
    productsData.push(product);
  }
});

// Make sure Apple AirPods Max has the electronics tag
productsData.forEach(product => {
  if (product.id === "apple-airpods-max" && !product.tags.includes("electronics")) {
    product.tags.push("electronics");
  }
  
  if (product.id === "jbl-go-4" && !product.tags.includes("electronics")) {
    product.tags.push("electronics");
  }
});
