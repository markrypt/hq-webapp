// Define Amazon Fresh products in a separate array
const amazonFreshProducts = [
    {
        id: 'organic-bananas',
        title: 'Organic Bananas (5 count)',
        category: 'Fresh Produce',
        subcategory: 'Fruits',
        rating: 4.8,
        reviewCount: 1247,
        brand: 'Fresh Produce',
        image: '../assets/products/organic-bananas.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/organic-bananas',
        tags: ['amazon-fresh', 'produce', 'fruits', 'organic', 'fresh-produce'],
        description: 'Organic, pesticide-free bananas grown with sustainable farming practices. Rich in potassium and fiber, these perfectly ripened bananas are ideal for smoothies, baking, or enjoying as a healthy snack.',
        features: [
            '100% USDA Certified Organic',
            'Pesticide-free and non-GMO',
            'Sustainably grown and harvested',
            'Rich in potassium and dietary fiber',
            'Naturally sweet flavor profile'
        ]
    },
    {
        id: 'whole-milk',
        title: '365 by Whole Foods Market, Organic Whole Milk, 1 Gallon',
        category: 'Dairy & Eggs',
        subcategory: 'Milk',
        rating: 4.7,
        reviewCount: 892,
        brand: '365 Whole Foods',
        image: '../assets/products/organic-milk.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/whole-milk',
        tags: ['amazon-fresh', 'dairy', 'milk', 'organic', 'dairy-eggs'],
        description: 'Premium organic whole milk from pasture-raised cows. Rich, creamy texture with no artificial hormones or antibiotics. Perfect for drinking, cooking, or adding to coffee and tea.',
        features: [
            'USDA Certified Organic',
            'No artificial hormones or antibiotics',
            'From pasture-raised, grass-fed cows',
            'Vitamin D and calcium-rich',
            'Ultra-pasteurized for longer shelf life'
        ]
    },
    {
        id: 'chicken-breast',
        title: 'Fresh Chicken Breast, Value Pack (4-5 lbs)',
        category: 'Meat & Seafood',
        subcategory: 'Poultry',
        rating: 4.6,
        reviewCount: 723,
        brand: 'Fresh Meats',
        image: '../assets/products/chicken-breast.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/chicken-breast',
        tags: ['amazon-fresh', 'meat', 'poultry', 'meat-seafood'],
        description: 'Hormone-free, all-natural chicken breast from responsibly raised chickens. Individually packaged for convenience with approximately 4-5 pounds total weight. Perfect for grilling, baking, or sautéing.',
        features: [
            'No antibiotics or added hormones',
            'Air-chilled for better flavor and texture',
            'Sourced from family farms',
            'Individually vacuum-sealed portions',
            'Naturally high in protein and low in fat'
        ]
    },
    {
        id: 'avocados',
        title: 'Fresh Hass Avocados (4 count)',
        category: 'Fresh Produce',
        subcategory: 'Vegetables',
        rating: 4.5,
        reviewCount: 1532,
        brand: 'Fresh Produce',
        image: '../assets/products/avocados.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/avocados',
        tags: ['amazon-fresh', 'produce', 'vegetables', 'fresh-produce'],
        description: 'Premium Hass avocados, perfectly ripened and ready to eat. Rich, creamy texture with a buttery flavor. Excellent source of healthy fats and nutrients. Perfect for guacamole, sandwiches, or salads.',
        features: [
            'Perfectly ripened Hass variety',
            'Rich in healthy monounsaturated fats',
            'Good source of fiber, potassium, and vitamins',
            'Naturally gluten-free and vegan',
            'No preservatives or additives'
        ]
    },
    {
        id: 'cage-free-eggs',
        title: '365 Cage-Free Large Brown Eggs (12 count)',
        category: 'Dairy & Eggs',
        subcategory: 'Eggs',
        rating: 4.8,
        reviewCount: 2156,
        brand: '365 Whole Foods',
        image: '../assets/products/eggs.jpg',
        badge: 'bestseller',
        colors: [],
        affiliateLink: 'https://amazon.com/cage-free-eggs',
        tags: ['amazon-fresh', 'dairy', 'eggs', 'dairy-eggs'],
        description: 'Farm-fresh, cage-free brown eggs from humanely raised hens. These Grade A large eggs have rich, golden yolks and are perfect for breakfast dishes, baking, or any recipe calling for fresh eggs.',
        features: [
            'Certified cage-free from humanely raised hens',
            'No antibiotics or hormones',
            'Grade A large size',
            'Rich in protein and essential nutrients',
            'Packaged in recyclable cartons'
        ]
    },
    {
        id: 'organic-spinach',
        title: 'Organic Baby Spinach (16 oz)',
        category: 'Fresh Produce',
        subcategory: 'Vegetables',
        rating: 4.6,
        reviewCount: 987,
        brand: 'Fresh Produce',
        image: '../assets/products/spinach.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/organic-spinach',
        tags: ['amazon-fresh', 'produce', 'vegetables', 'organic', 'fresh-produce'],
        description: 'Pre-washed, ready-to-eat organic baby spinach leaves. Tender, delicate texture with a mildly sweet flavor. Packed with iron, vitamins, and antioxidants. Perfect for salads, smoothies, or cooking.',
        features: [
            'USDA Certified Organic',
            'Pre-washed and ready to eat',
            'Rich in iron, vitamins A and C',
            'No pesticides or chemical fertilizers',
            'Sustainably grown in the USA'
        ]
    },
    {
        id: 'salmon-fillet',
        title: 'Fresh Atlantic Salmon Fillet (1 lb)',
        category: 'Meat & Seafood',
        subcategory: 'Seafood',
        rating: 4.7,
        reviewCount: 645,
        brand: 'Fresh Seafood',
        image: '../assets/products/salmon.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/salmon-fillet',
        tags: ['amazon-fresh', 'seafood', 'fish', 'meat-seafood'],
        description: 'Premium Atlantic salmon fillet, sustainably sourced and rich in omega-3 fatty acids. This fresh-cut fillet has a delicate flavor and firm texture, perfect for grilling, baking, or pan-searing.',
        features: [
            'Sustainably sourced Atlantic salmon',
            'Rich in omega-3 fatty acids',
            'No artificial preservatives',
            'Hand-cut by skilled fishmongers',
            'Individually vacuum-sealed for freshness'
        ]
    },
    {
        id: 'sourdough-bread',
        title: 'Fresh Baked Sourdough Bread (24 oz)',
        category: 'Bakery',
        subcategory: 'Bread',
        rating: 4.8,
        reviewCount: 1123,
        brand: 'Fresh Bakery',
        image: '../assets/products/sourdough-bread.jpg',
        badge: 'new',
        colors: [],
        affiliateLink: 'https://amazon.com/sourdough-bread',
        tags: ['amazon-fresh', 'bakery', 'bread'],
        description: 'Artisanal sourdough bread made with a slow-fermented starter for maximum flavor. Crusty exterior with a chewy, tangy interior. Baked fresh daily using traditional methods and simple ingredients.',
        features: [
            'Made with a 24-hour slow-fermented starter',
            'No artificial preservatives or additives',
            'Made with unbleached, unbromated flour',
            'Hand-shaped and stone-baked',
            'Naturally longer shelf life due to sourdough fermentation'
        ]
    },
    {
        id: 'greek-yogurt',
        title: 'Chobani Plain Greek Yogurt (32 oz)',
        category: 'Dairy & Eggs',
        subcategory: 'Yogurt',
        rating: 4.7,
        reviewCount: 892,
        brand: 'Chobani',
        image: '../assets/products/greek-yogurt.jpg',
        badge: 'bestseller',
        colors: [],
        affiliateLink: 'https://amazon.com/greek-yogurt',
        tags: ['amazon-fresh', 'dairy', 'yogurt', 'dairy-eggs'],
        description: 'Thick, creamy Greek yogurt with high protein content and a smooth texture. Made with non-GMO ingredients and triple-strained for extra creaminess. Perfect for breakfast, snacks, or as a cooking ingredient.',
        features: [
            'Triple-strained for extra thickness',
            'High in protein (22g per serving)',
            'No artificial flavors or preservatives',
            'Made with hormone-free milk',
            'Probiotic cultures for digestive health'
        ]
    },
    {
        id: 'organic-strawberries',
        title: 'Organic Strawberries (1 lb)',
        category: 'Fresh Produce',
        subcategory: 'Fruits',
        rating: 4.5,
        reviewCount: 756,
        brand: 'Fresh Produce',
        image: '../assets/products/strawberries.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/organic-strawberries',
        tags: ['amazon-fresh', 'produce', 'fruits', 'organic', 'fresh-produce'],
        description: 'Sweet, juicy organic strawberries grown without synthetic pesticides or fertilizers. These vibrant red berries are packed with vitamin C and antioxidants. Perfect for snacking, desserts, or adding to smoothies.',
        features: [
            'USDA Certified Organic',
            'Grown without synthetic pesticides',
            'Harvested at peak ripeness',
            'Rich in vitamin C and antioxidants',
            'Sustainably grown in California'
        ]
    },
    {
        id: 'ground-beef',
        title: '85% Lean Ground Beef (1 lb)',
        category: 'Meat & Seafood',
        subcategory: 'Beef',
        rating: 4.6,
        reviewCount: 1432,
        brand: 'Fresh Meats',
        image: '../assets/products/ground-beef.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/ground-beef',
        tags: ['amazon-fresh', 'meat', 'beef', 'meat-seafood'],
        description: 'Premium 85% lean ground beef from pasture-raised cattle. This versatile meat is perfect for burgers, meatballs, tacos, and more. Vacuum-sealed for freshness with no artificial ingredients or preservatives.',
        features: [
            '85% lean, 15% fat ratio for optimal flavor',
            'No antibiotics or added hormones',
            'From cattle raised on vegetarian diet',
            'Vacuum-sealed for maximum freshness',
            'Ground fresh daily'
        ]
    },
    {
        id: 'orange-juice',
        title: 'Simply Orange Juice, Pulp Free (52 fl oz)',
        category: 'Beverages',
        subcategory: 'Juice',
        rating: 4.8,
        reviewCount: 2341,
        brand: 'Simply Orange',
        image: '../assets/products/orange-juice.jpg',
        badge: 'bestseller',
        colors: [],
        affiliateLink: 'https://amazon.com/orange-juice',
        tags: ['amazon-fresh', 'beverages', 'juice'],
        description: '100% pure-squeezed, pasteurized orange juice, not from concentrate. This pulp-free juice delivers a refreshing, bright citrus taste with no added sugars, preservatives, or artificial flavors.',
        features: [
            '100% pure-squeezed orange juice',
            'Not from concentrate',
            'No added sugars, colors, or preservatives',
            'Rich in vitamin C and potassium',
            'Refrigerated for maximum freshness'
        ]
    },
    {
        id: 'organic-carrots',
        title: 'Organic Rainbow Carrots (2 lb)',
        category: 'Fresh Produce',
        subcategory: 'Vegetables',
        rating: 4.7,
        reviewCount: 543,
        brand: 'Fresh Produce',
        image: '../assets/products/carrots.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/organic-carrots',
        tags: ['amazon-fresh', 'produce', 'vegetables', 'organic', 'fresh-produce'],
        description: 'Colorful organic rainbow carrots, perfect for snacking, roasting, or adding to salads. These carrots are grown without synthetic pesticides or fertilizers and are packed with vitamins and antioxidants.',
        features: [
            'USDA Certified Organic',
            'Grown without synthetic pesticides',
            'Rich in vitamins and antioxidants',
            'Perfect for snacking or cooking',
            'Sustainably grown in the USA'
        ]
    },
    {
        id: 'fresh-mozzarella',
        title: 'Fresh Mozzarella Ball (16 oz)',
        category: 'Dairy & Eggs',
        subcategory: 'Cheese',
        rating: 4.7,
        reviewCount: 678,
        brand: 'Fresh Dairy',
        image: '../assets/products/fresh-mozzarella.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/fresh-mozzarella',
        tags: ['amazon-fresh', 'dairy', 'cheese', 'dairy-eggs'],
        description: 'Creamy, fresh mozzarella cheese ball, perfect for salads, pizzas, or snacking. Made from high-quality milk and crafted using traditional methods for a rich, authentic flavor.',
        features: [
            'Made from high-quality milk',
            'Creamy and smooth texture',
            'Perfect for salads, pizzas, or snacking',
            'Crafted using traditional methods',
            'No artificial preservatives or additives'
        ]
    },
    {
        id: 'organic-tomatoes',
        title: 'Organic Roma Tomatoes (2 lb)',
        category: 'Fresh Produce',
        subcategory: 'Vegetables',
        rating: 4.5,
        reviewCount: 897,
        brand: 'Fresh Produce',
        image: '../assets/products/organic-tomatoes.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/organic-tomatoes',
        tags: ['amazon-fresh', 'produce', 'vegetables', 'organic', 'fresh-produce'],
        description: 'Juicy, organic Roma tomatoes, perfect for salads, sauces, or snacking. These tomatoes are grown without synthetic pesticides or fertilizers and are packed with flavor and nutrients.',
        features: [
            'USDA Certified Organic',
            'Grown without synthetic pesticides',
            'Rich in flavor and nutrients',
            'Perfect for salads, sauces, or snacking',
            'Sustainably grown in the USA'
        ]
    },
    {
        id: 'fresh-herbs-bundle',
        title: 'Fresh Herbs Bundle (Basil, Thyme, Rosemary)',
        category: 'Fresh Produce',
        subcategory: 'Herbs',
        rating: 4.6,
        reviewCount: 342,
        brand: 'Fresh Produce',
        image: '../assets/products/fresh-herbs-bundle.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/fresh-herbs-bundle',
        tags: ['amazon-fresh', 'produce', 'herbs', 'fresh-produce'],
        description: 'A bundle of fresh herbs including basil, thyme, and rosemary. Perfect for adding flavor to your favorite dishes. These herbs are grown without synthetic pesticides or fertilizers.',
        features: [
            'Includes basil, thyme, and rosemary',
            'Grown without synthetic pesticides',
            'Perfect for adding flavor to dishes',
            'Fresh and aromatic',
            'Sustainably grown in the USA'
        ]
    },
    {
        id: 'organic-quinoa',
        title: '365 Organic White Quinoa (16 oz)',
        category: 'Pantry',
        subcategory: 'Grains',
        rating: 4.7,
        reviewCount: 892,
        brand: '365 Whole Foods',
        image: '../assets/products/organic-quinoa.jpg',
        badge: 'organic',
        colors: [],
        affiliateLink: 'https://amazon.com/organic-quinoa',
        tags: ['amazon-fresh', 'pantry', 'grains', 'organic'],
        description: 'Organic white quinoa, a versatile and nutritious grain. Perfect for salads, side dishes, or as a base for your favorite recipes. Grown without synthetic pesticides or fertilizers.',
        features: [
            'USDA Certified Organic',
            'Grown without synthetic pesticides',
            'Rich in protein and fiber',
            'Versatile and easy to cook',
            'Sustainably grown in the USA'
        ]
    },
    {
        id: 'fresh-guacamole',
        title: 'Fresh Guacamole Dip (16 oz)',
        category: 'Prepared Foods',
        subcategory: 'Dips & Spreads',
        rating: 4.5,
        reviewCount: 456,
        brand: 'Fresh Kitchen',
        image: '../assets/products/fresh-guacamole.jpg',
        badge: 'new',
        colors: [],
        affiliateLink: 'https://amazon.com/fresh-guacamole',
        tags: ['amazon-fresh', 'prepared', 'dips'],
        description: 'Fresh, creamy guacamole dip made with ripe avocados, tomatoes, onions, and cilantro. Perfect for dipping, spreading, or adding to your favorite dishes.',
        features: [
            'Made with ripe avocados',
            'Fresh and creamy texture',
            'Perfect for dipping or spreading',
            'No artificial preservatives or additives',
            'Refrigerated for maximum freshness'
        ]
    },
    {
        id: 'cold-brew-coffee',
        title: 'Starbucks Cold Brew Coffee (48 fl oz)',
        category: 'Beverages',
        subcategory: 'Coffee',
        rating: 4.8,
        reviewCount: 1245,
        brand: 'Starbucks',
        image: '../assets/products/cold-brew-coffee.jpg',
        badge: 'bestseller',
        colors: [],
        affiliateLink: 'https://amazon.com/starbucks-cold-brew',
        tags: ['amazon-fresh', 'beverages', 'coffee'],
        description: 'Smooth, rich cold brew coffee from Starbucks. Perfect for a refreshing, caffeinated beverage. Made with high-quality Arabica beans and brewed slowly for a bold flavor.',
        features: [
            'Made with high-quality Arabica beans',
            'Smooth and rich flavor',
            'Perfect for a refreshing beverage',
            'No artificial preservatives or additives',
            'Refrigerated for maximum freshness'
        ]
    },
    {
        id: 'fresh-bagels',
        title: 'Fresh New York Style Bagels (6 count)',
        category: 'Bakery',
        subcategory: 'Bagels',
        rating: 4.6,
        reviewCount: 678,
        brand: 'Fresh Bakery',
        image: '../assets/products/fresh-bagels.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/fresh-bagels',
        tags: ['amazon-fresh', 'bakery', 'bagels'],
        description: 'Authentic New York style bagels, freshly baked and perfect for breakfast or snacking. These bagels have a chewy texture and a delicious flavor, made with high-quality ingredients.',
        features: [
            'Authentic New York style',
            'Freshly baked',
            'Chewy texture and delicious flavor',
            'Perfect for breakfast or snacking',
            'Made with high-quality ingredients'
        ]
    },
    {
        id: 'kombucha-variety',
        title: 'GT\'s Kombucha Variety Pack (6 x 16 fl oz)',
        category: 'Beverages',
        subcategory: 'Kombucha',
        rating: 4.7,
        reviewCount: 892,
        brand: 'GT\'s Living Foods',
        image: '../assets/products/kombucha-variety.jpg',
        badge: 'trending',
        colors: [],
        affiliateLink: 'https://amazon.com/kombucha-variety',
        tags: ['amazon-fresh', 'beverages', 'kombucha'],
        description: 'A variety pack of GT\'s Kombucha, featuring different flavors of this refreshing, probiotic beverage. Perfect for a healthy, fizzy drink that supports digestive health.',
        features: [
            'Includes different flavors',
            'Probiotic beverage',
            'Supports digestive health',
            'Refreshing and fizzy',
            'No artificial preservatives or additives'
        ]
    },
    {
        id: 'premium-sushi',
        title: 'Fresh Premium Sushi Roll Combo (12 pcs)',
        category: 'Prepared Foods',
        subcategory: 'Sushi',
        rating: 4.4,
        reviewCount: 342,
        brand: 'Fresh Kitchen',
        image: '../assets/products/premium-sushi.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/premium-sushi',
        tags: ['amazon-fresh', 'prepared', 'sushi'],
        description: 'A premium sushi roll combo, freshly prepared with high-quality ingredients. Perfect for a delicious and convenient meal or snack.',
        features: [
            'Freshly prepared',
            'High-quality ingredients',
            'Delicious and convenient',
            'Perfect for a meal or snack',
            'No artificial preservatives or additives'
        ]
    },
    {
        id: 'fresh-pesto',
        title: 'Fresh Basil Pesto (8 oz)',
        category: 'Prepared Foods',
        subcategory: 'Sauces',
        rating: 4.7,
        reviewCount: 567,
        brand: 'Fresh Kitchen',
        image: '../assets/products/fresh-pesto.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/fresh-pesto',
        tags: ['amazon-fresh', 'prepared', 'sauces'],
        description: 'Fresh basil pesto made with high-quality ingredients. Perfect for adding flavor to pasta, sandwiches, or as a dip.',
        features: [
            'Made with high-quality ingredients',
            'Fresh and flavorful',
            'Perfect for pasta, sandwiches, or as a dip',
            'No artificial preservatives or additives',
            'Refrigerated for maximum freshness'
        ]
    },
    {
        id: 'hummus-variety',
        title: 'Sabra Hummus Variety Pack (4 x 10 oz)',
        category: 'Prepared Foods',
        subcategory: 'Dips & Spreads',
        rating: 4.6,
        reviewCount: 789,
        brand: 'Sabra',
        image: '../assets/products/hummus-variety.jpg',
        badge: 'bestseller',
        colors: [],
        affiliateLink: 'https://amazon.com/hummus-variety',
        tags: ['amazon-fresh', 'prepared', 'dips'],
        description: 'A variety pack of Sabra hummus, featuring different flavors of this creamy, delicious dip. Perfect for snacking, spreading, or adding to your favorite dishes.',
        features: [
            'Includes different flavors',
            'Creamy and delicious',
            'Perfect for snacking or spreading',
            'No artificial preservatives or additives',
            'Refrigerated for maximum freshness'
        ]
    },
    {
        id: 'fresh-pasta',
        title: 'Fresh Fettuccine Pasta (16 oz)',
        category: 'Prepared Foods',
        subcategory: 'Pasta',
        rating: 4.8,
        reviewCount: 432,
        brand: 'Fresh Kitchen',
        image: '../assets/products/fresh-pasta.jpg',
        badge: 'fresh',
        colors: [],
        affiliateLink: 'https://amazon.com/fresh-pasta',
        tags: ['amazon-fresh', 'prepared', 'pasta'],
        description: 'Fresh fettuccine pasta, made with high-quality ingredients and perfect for a delicious meal. This pasta has a tender texture and cooks quickly, making it ideal for busy weeknights.',
        features: [
            'Made with high-quality ingredients',
            'Tender texture',
            'Cooks quickly',
            'Perfect for a delicious meal',
            'No artificial preservatives or additives'
        ]
    }
];

// Make Amazon Fresh products globally available in multiple ways to ensure they're accessible
window.amazonFreshProducts = amazonFreshProducts;

// For the product detail page, ensure these products are included in the lookup
if (typeof window.globalAmazonFreshProducts === 'undefined') {
    window.globalAmazonFreshProducts = amazonFreshProducts;
}

// For category pages, set productsData if it's not already defined
if (typeof productsData === 'undefined') {
    console.log('Setting global productsData to Amazon Fresh products');
    window.productsData = amazonFreshProducts;
}