// Product data for Books category
const booksProducts = [
  {
    id: "book-atomic-habits",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    category: "Books",
    subcategory: "Self-Help",
    tags: ["books", "self-help", "personal development", "habits"],
    rating: 4.8,
    reviewCount: 87654,
    image: "assets/products/atomic-habits.jpg",
    badge: "bestseller",
    description: "James Clear's comprehensive guide to making small changes that yield remarkable results in your life.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Practical strategies for forming good habits",
      "Science-based approach to behavioral change",
      "Real-world examples from business, sports, and everyday life",
      "Step-by-step guide to transform your habits",
      "Over 1 million copies sold worldwide"
    ],
    colors: [],
    brand: "Avery"
  },
  {
    id: "book-project-hail-mary",
    title: "Project Hail Mary: A Novel",
    category: "Books",
    subcategory: "Science Fiction",
    tags: ["books", "science fiction", "space", "adventure"],
    rating: 4.7,
    reviewCount: 45678,
    image: "assets/products/project-hail-mary.jpg",
    description: "From the author of The Martian, a lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "Written by Andy Weir, bestselling author of The Martian",
      "Gripping sci-fi adventure with a fascinating protagonist",
      "Rich with scientific detail and problem-solving",
      "Perfect blend of humor, tension, and discovery",
      "Engaging first-person narrative"
    ],
    colors: [],
    brand: "Ballantine Books"
  },
  {
    id: "book-educated-memoir",
    title: "Educated: A Memoir",
    category: "Books",
    subcategory: "Biographies & Memoirs",
    tags: ["books", "memoir", "autobiography", "education"],
    rating: 4.7,
    reviewCount: 68932,
    image: "assets/products/educated-memoir.jpg",
    description: "Tara Westover's unforgettable memoir about growing up in a survivalist family and her journey to education.",
    affiliateLink: 'YOUR_AFFILIATE_LINK_HERE',
    features: [
      "New York Times bestseller",
      "Powerful story of self-discovery and resilience",
      "Named one of the best books of the year by numerous publications",
      "Explores themes of family, education, and identity",
      "Over 4 million copies sold worldwide"
    ],
    colors: [],
    brand: "Random House"
  }
];

// Add books products to the main products data array
// Assign to window object so it can be accessed globally
window.booksProducts = booksProducts;

if (typeof productsData !== 'undefined') {
  booksProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('books')) {
      product.tags.push('books');
    }
    productsData.push(product);
  });
}
