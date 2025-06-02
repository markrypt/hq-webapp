// Product data for Movies, Music & Games category
window.moviesMusicAndGamesProducts = [
  {
    id: "movies-music-and-games-product-1",
    title: "PlayStation 5 Digital Edition",
    category: "Movies, Music & Games",
    subcategory: "Gaming Consoles",
    tags: ["movies-music-and-games", "gaming", "playstation", "console"],
    rating: 4.8,
    reviewCount: 12345,
    image: "../assets/products/placeholder.jpg",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.",
    affiliateLink: 'https://example.com/ps5-digital',
    features: [
      "825GB SSD Storage",
      "4K-TV Gaming",
      "Up to 120fps with 120Hz output",
      "HDR Technology",
      "Ray Tracing Support"
    ],
    colors: ["white"],
    brand: "Sony"
  },
  {
    id: "movies-music-and-games-product-2",
    title: "Nintendo Switch OLED Model",
    category: "Movies, Music & Games",
    subcategory: "Gaming Consoles",
    tags: ["movies-music-and-games", "gaming", "nintendo", "console", "portable"],
    rating: 4.7,
    reviewCount: 8765,
    image: "../assets/products/placeholder.jpg",
    description: "7-inch OLED screen, enhanced audio, wide adjustable stand, and 64 GB internal storage.",
    affiliateLink: 'https://example.com/switch-oled',
    features: [
      "7-inch OLED Screen",
      "64GB Storage",
      "Enhanced Audio",
      "Wide Adjustable Stand",
      "TV Mode, Tabletop Mode, Handheld Mode"
    ],
    colors: ["white", "black"],
    brand: "Nintendo"
  },
  {
    id: "movies-music-and-games-product-3",
    title: "Sonos Arc Premium Smart Soundbar",
    category: "Movies, Music & Games",
    subcategory: "Home Audio",
    tags: ["movies-music-and-games", "audio", "soundbar", "home-theater"],
    rating: 4.6,
    reviewCount: 3421,
    image: "../assets/products/placeholder.jpg",
    description: "Premium smart soundbar for TV, movies, music, gaming, and more. Experience Dolby Atmos in 3D sound.",
    affiliateLink: 'https://example.com/sonos-arc',
    features: [
      "Dolby Atmos Support",
      "Voice Control",
      "HDMI eARC",
      "Trueplay Tuning",
      "Apple AirPlay 2"
    ],
    colors: ["black", "white"],
    brand: "Sonos"
  }
];

// Add Movies, Music & Games products to the main products data array
if (typeof window.productsData !== 'undefined') {
  window.moviesMusicAndGamesProducts.forEach(product => {
    // Add the category tag to ensure it shows up on the category page
    if (product.tags && !product.tags.includes('movies-music-and-games')) {
      product.tags.push('movies-music-and-games');
    }
    window.productsData.push(product);
  });
}