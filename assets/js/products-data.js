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
  },
  // Smart Home - Smart Lighting Products
  {
    id: "amazon-smart-plug",
    title: "Amazon Smart Plug, Works with Alexa",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["smart plug", "alexa", "smart home", "automation", "voice control"],
    rating: 4.7,
    reviewCount: 456392,
    image: "assets/products/amazon-smart-plug.jpg",
    badge: "bestseller",
    description: "Add voice control to any outlet with this compact smart plug that works with Alexa. Schedule lights, fans, and appliances to turn on and off automatically.",
    affiliateLink: "https://www.amazon.com/Amazon-smart-plug-works-with-Alexa/dp/B089DR29T6?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-1&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=2513f66f1f01a5c5a95700a5043ac8be&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Simple to set up and use - plug in, open the Alexa app, and get started in minutes",
      "Schedule lights, fans, and appliances to turn on and off automatically",
      "Control connected devices by voice through Alexa",
      "No smart home hub required—set up routines and schedules through the Alexa app",
      "Compact design keeps your second outlet free"
    ]
  },
  {
    id: "lutron-pico-remote",
    title: "Lutron Pico 3-Button Wireless Remote Control",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["lutron", "remote control", "smart lighting", "wireless", "dimmer"],
    rating: 4.8,
    reviewCount: 17243,
    image: "assets/products/lutron-pico-remote.jpg",
    description: "Control your Lutron Caséta wireless dimmers and Lutron Serena remote-controlled shades from anywhere in the home with this convenient wireless remote.",
    affiliateLink: "https://www.amazon.com/Lutron-3-Button-Wireless-Lighting-PJ2-3BRL-WH-L01R/dp/B00KLAXFQ0?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-2&srs=21217035011&linkCode=ll1&tag=1914061-20&linkId=acc9a485a1ff334f102ddc291693f668&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Wirelessly control your Lutron Caséta devices from anywhere in the home",
      "Mount to any wall without cutting holes or wiring",
      "Features on/off buttons and a raise/lower rocker",
      "Long-lasting 10-year battery life",
      "Compatible with Caséta wireless dimmers and switches"
    ]
  },
  {
    id: "govee-led-strip-lights",
    title: "Govee RGBIC LED Strip Lights, 16.4ft Smart Wi-Fi LED Lights",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["led strips", "rgb", "govee", "smart lights", "app control"],
    rating: 4.6,
    reviewCount: 59817,
    image: "assets/products/govee-led-strip.jpg",
    badge: "trending",
    description: "Upgrade your space with these WiFi LED strip lights featuring multiple colors and modes, voice control via Alexa and Google Assistant, and app control through your smartphone.",
    affiliateLink: "https://www.amazon.com/Govee-Changing-Dynamic-Bluetooth-Assistant/dp/B09B7NQT2K?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-3&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=5cfdb5664b18c1b09f427f6f5f6f6782&language=en_US&ref_=as_li_ss_tl",
    features: [
      "DIY your favorite lighting effects with millions of colors",
      "Music sync mode that changes lights with the rhythm of your music",
      "Control via app or voice commands with Alexa and Google Assistant",
      "Schedule timers and create scenes for different occasions",
      "Easy installation with strong adhesive backing"
    ]
  },
  {
    id: "govee-floor-lamp",
    title: "Govee Smart LED Floor Lamp, RGBIC Modern Corner Lamp",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["floor lamp", "led", "govee", "corner lamp", "smart light"],
    rating: 4.5,
    reviewCount: 8975,
    image: "assets/products/govee-floor-lamp.jpg",
    description: "Modern corner floor lamp with customizable RGBIC lighting, perfect for living rooms, bedrooms, and gaming setups with intelligent app and voice control.",
    affiliateLink: "https://www.amazon.com/Govee-Modern-Assistant-Million-Bedroom/dp/B099WTN2TR?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-4&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=2c52c47c0789fea4eaa1a097a48d455e&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Vibrant RGBIC technology with 16 million colors and multiple zones",
      "Works with Alexa and Google Assistant for voice control",
      "64+ preset scene modes for different moods and occasions",
      "Music sync function that reacts to sound from your favorite songs",
      "Minimalist design that fits perfectly in corners to save space"
    ]
  },
  {
    id: "lutron-caseta-dimmer",
    title: "Lutron Caseta Smart Start Kit, Dimmer Switch with Smart Bridge",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["dimmer switch", "lutron", "smart bridge", "lighting control", "smart home"],
    rating: 4.9,
    reviewCount: 32689,
    image: "assets/products/lutron-caseta-dimmer.jpg",
    badge: "premium",
    description: "The gold standard for reliable smart lighting control, featuring a smart dimmer switch and the Lutron Smart Bridge that works with Alexa, Apple HomeKit, and Google Assistant.",
    affiliateLink: "https://www.amazon.com/Lutron-Wireless-Lighting-P-PKG1P-WH-Assistant/dp/B00JJY1QG0?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-5&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=c2dffd84bb03e3578aeba99df0fa8a35&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Works with Alexa, Apple HomeKit, and Google Assistant for voice control",
      "Control lights from anywhere using the free Lutron app",
      "Schedule lights to adjust automatically based on time of day",
      "No neutral wire required for installation",
      "Compatible with dimmable LED, halogen, and incandescent bulbs"
    ]
  },
  {
    id: "kasa-smart-bulb",
    title: "Kasa Smart Light Bulb, Color Changing Dimmable WiFi Bulb",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["smart bulb", "kasa", "color changing", "dimmable", "wifi"],
    rating: 4.7,
    reviewCount: 27654,
    image: "assets/products/kasa-smart-bulb.jpg",
    description: "Add a splash of color to any room with these energy-efficient, dimmable smart bulbs featuring multi-color options and voice control compatibility.",
    affiliateLink: "https://www.amazon.com/Kasa-Smart-Changing-Dimmable-Compatible/dp/B08TB8Z5HF?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-6&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=44f3986ed89466a12a1b0de41333cbed&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Dimmable brightness and tunable white (2500K-6500K)",
      "Millions of colors to set the perfect ambiance",
      "No hub required, connects directly to WiFi",
      "Control from anywhere with the Kasa Smart app",
      "Voice control with Alexa and Google Assistant"
    ]
  },
  {
    id: "kasa-smart-switch",
    title: "Kasa Smart Light Switch HS200, Single Pole",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["smart switch", "kasa", "light switch", "wifi", "alexa compatible"],
    rating: 4.8,
    reviewCount: 43219,
    image: "assets/products/kasa-smart-switch.jpg",
    description: "Turn your traditional lighting into smart lighting with this easy-to-install smart switch that offers remote control and scheduling capabilities.",
    affiliateLink: "https://www.amazon.com/Switch-HS200-Neutral-Certified-Required/dp/B01EZV35QU?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-7&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=50fd16ec1b1354d09ebd5311421f9909&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Control from anywhere with the Kasa app",
      "Schedule lights to turn on and off automatically",
      "Voice control with Alexa, Google Assistant, and Microsoft Cortana",
      "ETL certified for safety, FCC certified for wireless use",
      "Neutral wire required for installation"
    ]
  },
  {
    id: "amazon-smart-bulbs",
    title: "Amazon Basics Smart LED Bulbs, Works with Alexa",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["smart bulbs", "alexa", "amazon basics", "led", "wifi"],
    rating: 4.5,
    reviewCount: 15678,
    image: "assets/products/amazon-smart-bulbs.jpg",
    description: "Affordable smart LED bulbs that work directly with Alexa, offering voice control and scheduling without requiring a separate smart home hub.",
    affiliateLink: "https://www.amazon.com/smart-light-bulbs-alexa-wifi/dp/B08TB6VXFL?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-9&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=15b5aa9c7eb8566c2108898b2ddb39d0&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Easy setup with Alexa - no smart home hub required",
      "Customize lighting color with millions of color options",
      "Control lights remotely with the Alexa app",
      "Create routines and schedules to automate your lighting",
      "Energy-efficient alternative to traditional incandescent bulbs"
    ]
  },
  {
    id: "lutron-caseta-kit",
    title: "Lutron Caseta Deluxe Smart Dimmer Switch Kit",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["dimmer kit", "lutron", "smart home", "lighting kit", "smart bridge"],
    rating: 4.9,
    reviewCount: 12587,
    image: "assets/products/lutron-caseta-kit.jpg",
    badge: "premium",
    description: "Comprehensive smart lighting kit featuring the Lutron Smart Bridge, two dimmer switches with remotes for reliable and easy control of your home lighting.",
    affiliateLink: "https://www.amazon.com/Lutron-Wireless-Lighting-P-BDG-PKG2W-Assistant/dp/B01M3XJUAD?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-10&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=94952f993f84ecbc0b082c0f3565f86d&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Control lights, shades, and temperature from anywhere",
      "Compatible with Alexa, Google Assistant, and Apple HomeKit",
      "Set schedules and create scenes for different activities",
      "No neutral wire required for installation",
      "Includes Smart Bridge, 2 in-wall dimmers, and 2 Pico remotes"
    ]
  },
  {
    id: "kasa-dimmer-switch",
    title: "Kasa Smart Dimmer Switch HS220, Single Pole",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["dimmer switch", "kasa", "smart dimmer", "lighting control", "wifi"],
    rating: 4.7,
    reviewCount: 21365,
    image: "assets/products/kasa-dimmer-switch.jpg",
    description: "Smart dimmer switch with adjustable brightness control, scheduling, and away mode to give your home the appearance that someone is there even when you're away.",
    affiliateLink: "https://www.amazon.com/Kasa-Smart-HS220-Certified-Required/dp/B079775ZZQ?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-11&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=55a0c59da160842b2dd63ec62fc0d7ae&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Gentle off feature gradually fades lights for added ambiance",
      "Schedule and group controls for automated lighting",
      "Away mode randomly turns lights on/off to simulate presence",
      "Compatible with Alexa and Google Assistant for voice control",
      "No hub required, connects directly to WiFi"
    ]
  },
  {
    id: "kasa-switch-3pack",
    title: "Kasa Smart Light Switch HS200P3, 3-Pack",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["smart switch", "kasa", "switch bundle", "3-pack", "wifi switch"],
    rating: 4.8,
    reviewCount: 18765,
    image: "assets/products/kasa-switch-3pack.jpg",
    badge: "value",
    description: "Value pack of three smart light switches allowing you to remotely control your lighting via the Kasa app or voice commands.",
    affiliateLink: "https://www.amazon.com/Kasa-Smart-HS200P3-Certified-Required/dp/B07HGW8N7R?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-12&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=589b248e7500a67be562b447ac33f8aa&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Control lights from anywhere using the Kasa app",
      "Create schedules and scenes for automated lighting",
      "Works with Alexa and Google Assistant for voice control",
      "LED indicator helps locate switch in the dark",
      "ETL certified for safety, no hub required"
    ]
  },
  {
    id: "daybetter-led-lights",
    title: "DayBetter Smart LED Strip Lights, 50ft with Bluetooth Control",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["led strip", "bluetooth", "daybetter", "rgb", "smart lights"],
    rating: 4.5,
    reviewCount: 32456,
    image: "assets/products/daybetter-led-lights.jpg",
    description: "50ft of customizable LED strip lighting with Bluetooth control, perfect for room decoration, TV backlighting, and creating ambiance in any space.",
    affiliateLink: "https://www.amazon.com/Bluetooth-SMD5050-Changing-Control-Bedroom/dp/B08NJMGPWH?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-13&srs=21217035011&linkCode=ll1&tag=1914061-20&linkId=201952fa1ff24c34d19abe52c74a5aa3&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Color changing with 16 million color options",
      "Sync to music with built-in mic sensitivity adjustment",
      "Control via smartphone app with Bluetooth connection",
      "Cut-to-length design for custom installation",
      "Strong adhesive backing for easy installation"
    ]
  },
  {
    id: "daybetter-rgb-strips",
    title: "DAYBETTER Smart LED Strip Lights, Works with Alexa",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["led strips", "wifi", "daybetter", "alexa", "smart home"],
    rating: 4.4,
    reviewCount: 26789,
    image: "assets/products/daybetter-rgb-strips.jpg",
    description: "WiFi-enabled RGB LED strips with voice control capabilities, allowing you to change colors, adjust brightness, and set schedules through the app or voice commands.",
    affiliateLink: "https://www.amazon.com/DAYBETTER-Controlled-Assistant-Schedule-Changing/dp/B08NP8WRJ9?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-14&srs=21217035011&linkCode=ll1&tag=1914061-20&linkId=82bdc2b8fd610cb1a80f0995321842b0&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Control via smartphone app or voice through Alexa/Google Assistant",
      "Multiple scene modes for different occasions",
      "Music sync function that reacts to sound",
      "Timer and schedule capabilities",
      "Available in different lengths to fit your space"
    ]
  },
  {
    id: "govee-glide-lights",
    title: "Govee Glide RGBIC Smart Wall Light, Works with Alexa",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["wall light", "govee", "glide", "rgbic", "smart decor"],
    rating: 4.7,
    reviewCount: 14523,
    image: "assets/products/govee-glide-lights.jpg",
    badge: "trending",
    description: "Modern wall-mounted light bars with RGBIC technology, allowing for multiple colors on each bar simultaneously, perfect for home decor and accent lighting.",
    affiliateLink: "https://www.amazon.com/Govee-Assistant-Backlights-Pictures-Decoration/dp/B096WZXKZP?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-15&srs=21217035011&linkCode=ll1&tag=1914061-20&linkId=edb18c9630c46eb5a0b8ed016309adab&language=en_US&ref_=as_li_ss_tl",
    features: [
      "RGBIC technology displays multiple colors per light bar",
      "Customizable layout with modular design and 6 bars",
      "Music mode synchronizes lights with the beat of your music",
      "App and voice control with Alexa and Google Assistant",
      "40+ preset scene modes for any mood or occasion"
    ]
  },
  {
    id: "philips-hue-dimmer",
    title: "Philips Hue Dimmer Switch with Remote",
    category: "Smart Home",
    subcategory: "Smart Lighting",
    tags: ["philips hue", "dimmer switch", "remote", "smart lighting", "bluetooth"],
    rating: 4.8,
    reviewCount: 19876,
    image: "assets/products/philips-hue-dimmer.jpg",
    badge: "premium",
    description: "No-installation-needed wireless dimmer switch and remote for controlling your Philips Hue smart lights, offering convenient control without using an app.",
    affiliateLink: "https://www.amazon.com/Philips-Hue-Installation-Free-Exclusively-562777/dp/B08W8GLPD5?dib=eyJ2IjoiMSJ9.1dT40_VfUoEy8jenMBoTP9RXs6MZHb9l11NULNdFISwMCKZHtjAxnUay75r-GL7efWdxFXxizDmAbMZpBgqcVIVbJ5MsUpN4VD9ATeGIvf0CA3kET58cpDde4s_pU3ragRCEiSQs5xoOz-1m89TV0wB_mFyOZAilTib5NsUwYekvXBL6IJlMfD9y3vf5I7cShbCj0jSuPLma10kBg9xRv5osZIV_gZiKOW8gYE-SZhE.IPt3pgseCeBm_QTufm40bhxXeNUXul6cvC5SQW6chNw&dib_tag=se&qid=1747689077&sr=8-16&srs=21217035011&th=1&linkCode=ll1&tag=1914061-20&linkId=b7f2ce0286f5410462d6e37dcd90cd08&language=en_US&ref_=as_li_ss_tl",
    features: [
      "Easy wireless installation - mount anywhere with included adhesive",
      "Control up to 10 lights in one room",
      "On/off, dimming, and scene selection capabilities",
      "Works with Bluetooth or connect to a Hue Bridge for more features",
      "2-year battery life with standard use"
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
