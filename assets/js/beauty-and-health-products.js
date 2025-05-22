// Product data for Beauty & Health category
const beautyHealthProducts = [
  {
    id: "cerave-moisturizing-cream",
    title: "CeraVe Moisturizing Cream with Hyaluronic Acid",
    category: "Beauty & Health",
    subcategory: "Skincare",
    tags: ["skincare", "moisturizer", "hyaluronic acid", "cerave", "beauty-and-health"],
    rating: 4.8,
    reviewCount: 75234,
    image: "assets/products/cerave-cream.jpg",
    badge: "bestseller",
    description: "Developed with dermatologists, this rich, non-greasy moisturizer with 3 essential ceramides and hyaluronic acid provides 24-hour hydration.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Contains 3 essential ceramides to help restore the skin barrier",
      "Formulated with hyaluronic acid to retain skin's natural moisture",
      "Patented MVE technology for long-lasting hydration",
      "Fragrance-free, non-comedogenic, and suitable for sensitive skin",
      "Accepted by the National Eczema Association"
    ],
    colors: [],
    brand: "CeraVe"
  },
  {
    id: "dyson-airwrap-styler",
    title: "Dyson Airwrap Complete Styler",
    category: "Beauty & Health",
    subcategory: "Hair Care",
    tags: ["hair styling", "hair dryer", "dyson", "beauty tool", "beauty-and-health"],
    rating: 4.5,
    reviewCount: 32150,
    image: "assets/products/dyson-airwrap.jpg",
    badge: "premium",
    description: "Revolutionary hair styling tool that curls, waves, smooths and dries without extreme heat, helping prevent heat damage.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Uses Coanda effect to attract and wrap hair around the barrel",
      "Intelligent heat control prevents extreme heat damage",
      "Multiple styling attachments for versatile styling options",
      "Engineered for different hair types",
      "Creates styles that last with less damage"
    ],
    colors: ["nickel/copper", "black/purple"],
    brand: "Dyson"
  },
  {
    id: "theragun-prime",
    title: "Theragun Prime Massage Gun",
    category: "Beauty & Health",
    subcategory: "Wellness",
    tags: ["massage", "recovery", "muscle therapy", "theragun", "beauty-and-health"],
    rating: 4.7,
    reviewCount: 18765,
    image: "assets/products/theragun-prime.jpg",
    description: "Professional-grade percussive therapy device that deeply massages muscles to help reduce tension and soreness.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Quiet QX65 motor with QuietForce Technology",
      "5 built-in speeds for customized treatment",
      "120-minute battery life for extended use",
      "4 attachment heads for different body areas",
      "Ergonomic multi-grip design for comfort"
    ],
    colors: ["black"],
    brand: "Therabody"
  }
];

// Add beauty & health products to the main products data array
if (typeof productsData !== 'undefined') {
  beautyHealthProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('beauty-and-health')) {
      product.tags.push('beauty-and-health');
    }
    productsData.push(product);
  });
}

// Also add these products to the beauty category
if (typeof productsData !== 'undefined') {
  beautyHealthProducts.forEach(product => {
    // Add the beauty tag for those products that should also appear in beauty category
    if (product.tags && product.subcategory === "Skincare" || product.subcategory === "Hair Care") {
      if (!product.tags.includes('beauty')) {
        product.tags.push('beauty');
      }
    }
  });
}
