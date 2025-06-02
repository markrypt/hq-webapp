// Product data for Automotive category
const automotiveProducts = [
  {
    id: "automotive-product-1",
    title: "Car Engine Oil Filter",
    category: "Automotive",
    subcategory: "Filters",
    tags: ["automotive", "car-accessories", "auto-maintenance", "auto-parts", "filters"],
    rating: 4.5,
    reviewCount: 1234,
    image: "../assets/products/placeholder.jpg",
    description: "High-quality engine oil filter for most car makes and models. Ensures clean oil circulation for better engine performance.",
    affiliateLink: 'https://amazon.com/automotive/oil-filter',
    features: [
      "99% dirt removal efficiency",
      "Compatible with synthetic and conventional oil",
      "Easy installation",
      "Long-lasting performance"
    ],
    colors: ["black"],
    brand: "AutoCare Pro"
  },
  {
    id: "automotive-product-2",
    title: "Premium Microfiber Car Wash Mitt",
    category: "Automotive",
    subcategory: "Car Care",
    tags: ["automotive", "car-care", "cleaning", "accessories"],
    rating: 4.7,
    reviewCount: 5678,
    image: "../assets/products/placeholder.jpg",
    description: "Ultra-soft microfiber wash mitt that's gentle on your car's paint while effectively removing dirt and grime.",
    affiliateLink: 'https://amazon.com/automotive/wash-mitt',
    features: [
      "Premium microfiber material",
      "Extra large size",
      "Machine washable",
      "Scratch-free cleaning"
    ],    colors: ["blue"],
    brand: "CleanDrive"
  }
];

// Assign to window object so it can be accessed globally
window.automotiveProducts = automotiveProducts;