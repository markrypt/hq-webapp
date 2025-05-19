// Products database
const productsData = [
  {
    id: "jbl-go-4",
    title: "JBL Go 4 Portable Bluetooth Speaker",
    category: "Electronics",
    subcategory: "Audio",
    tags: ["speaker", "bluetooth", "portable", "audio", "jbl"],
    rating: 4.5,
    reviewCount: 2342,
    image: "assets/products/jbl-go-4-squad.jpg",
    badge: "trending",
    description: "Compact and powerful portable Bluetooth speaker with rich sound and up to 7 hours of battery life.",
    features: [
      "IP67 waterproof and dustproof design",
      "5 hours of playtime",
      "Bluetooth 5.1 connectivity",
      "Built-in noise-cancelling speakerphone",
      "Available in multiple colors"
    ]
  },
  {
    id: "beskar-foot-massager",
    title: "Beskar Foot Massager",
    category: "Health & Wellness",
    subcategory: "Massage",
    tags: ["massage", "foot", "relaxation", "wellness"],
    rating: 5.0,
    reviewCount: 1876,
    image: "assets/products/beskar-foot-massager.jpg",
    badge: "new",
    description: "Deep-kneading foot massager with heat function and multiple massage modes for ultimate relaxation.",
    features: [
      "3 massage intensities and 3 modes",
      "Heat function for improved circulation",
      "Auto-shutoff after 15 minutes",
      "Easy to clean removable cover",
      "Fits up to men's size 12"
    ]
  },
  {
    id: "hooga-grounding-mat",
    title: "Hooga Grounding Mat",
    category: "Health & Wellness",
    subcategory: "Sleep",
    tags: ["sleep", "wellness", "grounding", "earthing"],
    rating: 4.0,
    reviewCount: 942,
    image: "assets/products/hooga-grounding-mat.jpg",
    description: "Sleep better with this grounding mat that helps reduce inflammation and improve overall wellbeing.",
    features: [
      "Universal grounding connection",
      "Conductive silver threads throughout",
      "Machine washable fabric",
      "Includes 15ft grounding cord",
      "Lab tested for conductivity"
    ]
  },
  {
    id: "kukka-tea-tree-oil",
    title: "Kukka Tea Tree Oil",
    category: "Beauty & Health",
    subcategory: "Essential Oils",
    tags: ["essential oil", "tea tree", "skincare", "natural"],
    rating: 4.5,
    reviewCount: 3129,
    image: "assets/products/kukka-tea-tree-oil.jpg",
    badge: "sale",
    description: "100% pure Australian tea tree oil for skin care, hair care, and aromatherapy uses.",
    features: [
      "100% pure and natural",
      "Therapeutic grade",
      "Multipurpose essential oil",
      "Cruelty-free and vegan",
      "Comes with glass dropper"
    ]
  },
  {
    id: "apple-airpods-max",
    title: "Apple AirPods Max - Coral",
    category: "Electronics",
    subcategory: "Headphones",
    tags: ["headphones", "apple", "wireless", "noise-cancelling"],
    rating: 5.0,
    reviewCount: 4217,
    image: "assets/products/apple-airpods-max-orange.jpg",
    description: "High-fidelity audio, active noise cancellation, and an exceptional fit make these premium headphones worth every penny.",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio with dynamic head tracking",
      "Up to 20 hours of listening time",
      "Memory foam ear cushions"
    ]
  },
  {
    id: "etekcity-smart-scale",
    title: "Etekcity Smart Fitness Scale",
    category: "Health & Wellness",
    subcategory: "Fitness",
    tags: ["fitness", "scale", "smart", "weight", "health"],
    rating: 4.5,
    reviewCount: 1832,
    image: "assets/products/etekcity-smart-scale.jpg",
    description: "Track 13 body composition metrics with this smart scale that syncs with your favorite fitness apps.",
    features: [
      "Measures weight, BMI, body fat, muscle mass and more",
      "Syncs with Fitbit, Apple Health, Google Fit",
      "Supports unlimited users",
      "High-precision sensors",
      "Step-on technology for instant readings"
    ]
  },
  {
    id: "mobil-1-motor-oil",
    title: "Mobil 1 Extended Performance Motor Oil",
    category: "Automotive",
    subcategory: "Engine Care",
    tags: ["automotive", "motor oil", "engine", "car maintenance"],
    rating: 5.0,
    reviewCount: 8954,
    image: "assets/products/mobil-1-motor-oil.jpg",
    description: "Advanced full synthetic motor oil that keeps your engine running like new by providing exceptional wear protection.",
    features: [
      "15,000 miles between oil changes",
      "Excellent high-temperature protection",
      "Superior engine cleanliness",
      "Exceptional low-temperature capabilities",
      "Meets ILSAC GF-6 standards"
    ]
  },
  {
    id: "eos-body-lotion",
    title: "EOS Shea Better Body Lotion - Vanilla Cashmere",
    category: "Beauty & Health",
    subcategory: "Skincare",
    tags: ["skincare", "lotion", "moisturizer", "body care"],
    rating: 4.0,
    reviewCount: 762,
    image: "assets/products/eos-shea-better-body-lotion-vanilla-cashmere.jpg",
    description: "Silky smooth body lotion with shea butter and natural moisturizers for 24-hour hydration.",
    features: [
      "24-hour moisture",
      "Made with sustainably-sourced shea butter",
      "Free from parabens and phthalates",
      "Dermatologist-tested formula",
      "Comes in multiple scents"
    ]
  },
  {
    id: "amazon-basics-sheets",
    title: "Amazon Basics Microfiber Sheet Set",
    category: "Home & Garden",
    subcategory: "Bedding",
    tags: ["bedding", "sheets", "microfiber", "home"],
    rating: 4.5,
    reviewCount: 12467,
    image: "assets/products/amazon-basics-sheets.jpg",
    description: "Soft, breathable microfiber sheets that are wrinkle-resistant and easy to care for.",
    features: [
      "Ultra-soft microfiber material",
      "Wrinkle-resistant fabric",
      "Deep pockets fit mattresses up to 16 inches",
      "Available in multiple colors and sizes",
      "Easy machine wash and dry"
    ]
  }
];

// Export the data for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productsData };
} else {
  // For browser use
  window.productsData = productsData;
}
