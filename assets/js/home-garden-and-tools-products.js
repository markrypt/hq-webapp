// Product data for Home, Garden & Tools category
const homeGardenProducts = [
  {
    id: "dewalt-power-drill",
    title: "DEWALT 20V MAX Cordless Drill / Driver Kit",
    category: "Home & Garden",
    subcategory: "Power Tools",
    tags: ["tools", "power tools", "drill", "dewalt", "home-garden-and-tools"],
    rating: 4.8,
    reviewCount: 42678,
    image: "assets/products/dewalt-drill.jpg",
    badge: "bestseller",
    description: "High-performance drill with brushless motor technology and long-lasting battery for all your DIY and professional projects.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Brushless motor for efficiency and longer runtime",
      "20V MAX lithium-ion battery with long life",
      "2-speed transmission for versatile applications",
      "Built-in LED light for improved visibility",
      "Compact and lightweight design for use in tight spaces"
    ],
    colors: ["yellow", "black"],
    brand: "DEWALT"
  },
  {
    id: "dyson-v11-vacuum",
    title: "Dyson V11 Cordless Vacuum Cleaner",
    category: "Home & Garden",
    subcategory: "Vacuums & Floor Care",
    tags: ["vacuum", "cordless", "dyson", "cleaning", "home-garden-and-tools"],
    rating: 4.7,
    reviewCount: 35879,
    image: "assets/products/dyson-v11.jpg",
    badge: "premium",
    description: "Intelligent cordless vacuum with powerful suction and adaptive cleaning technology for optimal performance on all floor types.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Automatically adapts suction power to different floor types",
      "Up to 60 minutes of run time on a full charge",
      "Advanced filtration system captures 99.99% of particles",
      "LCD screen displays performance and maintenance information",
      "Converts to handheld for cleaning hard-to-reach areas"
    ],
    colors: ["purple", "silver"],
    brand: "Dyson"
  },
  {
    id: "weber-spirit-grill",
    title: "Weber Spirit II E-310 3-Burner Propane Gas Grill",
    category: "Home & Garden",
    subcategory: "Outdoor Living",
    tags: ["grill", "barbecue", "outdoor", "weber", "home-garden-and-tools"],
    rating: 4.6,
    reviewCount: 28954,
    image: "assets/products/weber-grill.jpg",
    description: "Premium gas grill with three burners, ample cooking space, and Weber's renowned durability for perfect backyard cooking.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Three high-performance burners with precise controls",
      "529 square inches of cooking space",
      "Porcelain-enameled cast iron cooking grates",
      "Built-in thermometer for temperature monitoring",
      "10-year warranty on all components"
    ],
    colors: ["black", "red"],
    brand: "Weber"
  }
];

// Add home & garden products to the main products data array
if (typeof productsData !== 'undefined') {
  homeGardenProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('home-garden-and-tools')) {
      product.tags.push('home-garden-and-tools');
    }
    productsData.push(product);
  });
}
