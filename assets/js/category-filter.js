/**
 * Enhanced Category Filter System for Products
 * Provides functionality to filter products by categories, subcategories, sellers, and colors
 */

class ProductFilterSystem {
    constructor() {
        this.filters = {
            category: 'all',
            subcategory: 'all',
            seller: 'all'
        };
        
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 10; // Show more products per page        // Collection of unique filter values
        this.filterOptions = {
            categories: new Set(),
            subcategories: new Set(),
            sellers: new Set()
        };
        
        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
      /**
     * Initialize the filter system
     */    initialize() {
        console.log('Initializing Product Filter System');
        
        // Load products data
        if (typeof productsData !== 'undefined' && productsData.length > 0) {
            console.log(`Found ${productsData.length} products in productsData`);
            
            // Get current page category from URL path
            const currentCategory = this.getCurrentPageCategory();
            console.log('Current page category:', currentCategory);
              // Filter products to only show those with exactly matching tags
            if (currentCategory) {
                this.products = productsData.filter(product => 
                    product.tags && product.tags.includes(currentCategory)
                );
                console.log(`Filtered ${this.products.length} products matching category: ${currentCategory}`);
            } else {
                this.products = productsData;
            }
            
            this.filteredProducts = [...this.products];
            
            // Extract all unique filter options
            this.extractFilterOptions();
            
            // Create filter UI
            this.createFilterUI();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initial display of products
            this.displayProducts();
        } else {
            console.error('Products data not available');
        }
    }
    
    /**
     * Get the current page's category from the URL path
     * @returns {string|null} The category slug or null if not on a category page
     */
    getCurrentPageCategory() {
        const path = window.location.pathname;
        const categoryMatch = path.match(/\/category\/([^\/]+)\.html$/);
        
        if (categoryMatch && categoryMatch[1]) {
            return categoryMatch[1];
        }
        
        return null;
    }
    
    /**
     * Normalize a category name to match URL slug format
     * @param {string} category - The category name
     * @returns {string} Normalized category name
     */
    normalizeCategoryName(category) {
        return category.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/&/g, '-and-')         // Replace & with 'and'
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    
    /**
     * Extract all unique filter options from products data
     */    extractFilterOptions() {
        // Clear existing options
        this.filterOptions.categories.clear();
        this.filterOptions.subcategories.clear();
        this.filterOptions.sellers.clear();
        
        // Track related subcategories for each category
        const categorySubcategories = new Map();
        
        this.products.forEach(product => {
            // Extract categories
            if (product.category) {
                this.filterOptions.categories.add(product.category);
                
                // Initialize subcategories array for this category if not exists
                if (!categorySubcategories.has(product.category)) {
                    categorySubcategories.set(product.category, new Set());
                }
            }
            
            // Extract subcategories and map to categories
            if (product.subcategory && product.category) {
                this.filterOptions.subcategories.add(product.subcategory);
                categorySubcategories.get(product.category).add(product.subcategory);
            }
            
            // Extract seller information
            if (product.brand) {
                this.filterOptions.sellers.add(product.brand);
            } else if (product.manufacturer) {
                this.filterOptions.sellers.add(product.manufacturer);
            }
        });
        
        // Store the category-subcategory mapping
        this.categorySubcategories = categorySubcategories;
        
        // Convert sets to sorted arrays for UI creation
        for (const key of ['categories', 'subcategories', 'sellers']) {
            this.filterOptions[key] = Array.from(this.filterOptions[key]).sort();
        }
    }
    
    /**
     * Create the filter UI with sections for categories, subcategories, sellers, and colors
     */    createFilterUI() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container fade-in';
        
        const filterSummary = document.createElement('div');
        filterSummary.className = 'filter-summary';
        filterSummary.innerHTML = `
            <div class="filter-count">
                <i class="fas fa-filter"></i>
                <span>${this.products.length} Products</span>
            </div>
        `;
        filterContainer.appendChild(filterSummary);
        
        // Add category filter section
        const categorySection = this.createFilterSection(
            'Categories', 
            'tag', 
            'category', 
            this.filterOptions.categories
        );
        categorySection.setAttribute('data-filter-type', 'category');
        filterContainer.appendChild(categorySection);
        
        // Add subcategory filter section if available
        if (this.filterOptions.subcategories.length > 0) {
            const subcategorySection = this.createFilterSection(
                'Subcategories', 
                'layer-group', 
                'subcategory', 
                this.filterOptions.subcategories
            );
            subcategorySection.setAttribute('data-filter-type', 'subcategory');
            filterContainer.appendChild(subcategorySection);
        }
        
        // Add seller filter section if available
        if (this.filterOptions.sellers.length > 0) {
            filterContainer.appendChild(this.createFilterSection(
                'Sellers', 
                'store', 
                'seller', 
                this.filterOptions.sellers
            ));
        }
        
        // Add reset button
        const resetButton = document.createElement('button');
        resetButton.className = 'filter-reset';
        resetButton.innerHTML = '<i class="fas fa-undo-alt"></i> Reset Filters';
        resetButton.addEventListener('click', () => this.resetFilters());
        filterContainer.appendChild(resetButton);
        
        // Add filter container to the page
        const sidebar = document.querySelector('.category-sidebar');
        if (sidebar) {
            sidebar.appendChild(filterContainer);
        }
        
        // Create product grid container with header
        const gridContainer = document.createElement('div');
        gridContainer.className = 'category-content-inner fade-in';
        
        const gridHeader = document.createElement('div');
        gridHeader.className = 'grid-header';
        gridHeader.innerHTML = `
            <div class="grid-actions">
                <div class="sort-dropdown">
                    <select id="sortSelect" class="sort-select">
                        <option value="popular">Most Popular</option>
                        <option value="newest">Newest First</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>
                <div class="view-options">
                    <button class="view-btn grid active" data-view="grid">
                        <i class="fas fa-th-large"></i>
                    </button>
                    <button class="view-btn list" data-view="list">
                        <i class="fas fa-th-list"></i>
                    </button>
                </div>
            </div>
        `;
        
        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';
        productGrid.id = 'productGrid';
        
        gridContainer.appendChild(gridHeader);
        gridContainer.appendChild(productGrid);
        
        const content = document.querySelector('.category-content');
        if (content) {
            content.appendChild(gridContainer);
        }
        
        // Set up event listeners for sort and view options
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
        
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                productGrid.className = `product-grid ${btn.dataset.view}-view`;
            });
        });
    }
    
    /**
     * Create a filter section for a specific filter type
     * @param {string} title - Section title
     * @param {string} icon - FontAwesome icon name
     * @param {string} filterType - Type of filter (category, subcategory, seller)
     * @param {Array} options - Array of filter options
     * @returns {HTMLElement} Filter section element
     */
    createFilterSection(title, icon, filterType, options) {
        const section = document.createElement('div');
        section.className = 'filter-section';
        
        // Create section title
        const titleElement = document.createElement('div');
        titleElement.className = 'filter-title';
        titleElement.innerHTML = `<i class="fas fa-${icon}"></i> ${title}`;
        section.appendChild(titleElement);
        
        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'filter-options';
        
        // Create "All" button
        const allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.setAttribute('data-filter-type', filterType);
        allButton.setAttribute('data-filter-value', 'all');
        allButton.innerHTML = 'All';
        optionsContainer.appendChild(allButton);
          // Create button for each option
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.setAttribute('data-filter-type', filterType);
            button.setAttribute('data-filter-value', typeof option === 'object' ? option.value : option);
            
            // Count products for this option (skipped for price and rating)
            let count = 0;
            if (filterType !== 'price' && filterType !== 'rating') {
                count = this.products.filter(product => {
                    if (filterType === 'category') {
                        return product.category === option;
                    } else if (filterType === 'subcategory') {
                        return product.subcategory === option;
                    } else if (filterType === 'seller') {
                        return product.brand === option || product.manufacturer === option;
                    }
                    return false;
                }).length;
            }
            
            // Use the label property if the option is an object
            const displayText = typeof option === 'object' ? option.label : option;
            
            if (filterType === 'rating') {
                button.innerHTML = `${displayText}`;
            } else if (count > 0) {
                button.innerHTML = `${displayText} <span class="filter-badge">${count}</span>`;
            } else {
                button.innerHTML = displayText;
            }
            
            optionsContainer.appendChild(button);
        });
        
        section.appendChild(optionsContainer);
        return section;
    }
    
    /**
     * Create a color filter section
     * @param {string} title - Section title
     * @param {string} icon - FontAwesome icon name
     * @param {Array} colors - Array of color options
     * @returns {HTMLElement} Color filter section element
     */
    createColorFilterSection(title, icon, colors) {
        const section = document.createElement('div');
        section.className = 'filter-section';
        
        // Create section title
        const titleElement = document.createElement('div');
        titleElement.className = 'filter-title';
        titleElement.innerHTML = `<i class="fas fa-${icon}"></i> ${title}`;
        section.appendChild(titleElement);
        
        // Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'filter-options';
        
        // Create color option for each color
        colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = this.getColorCode(color);
            colorOption.setAttribute('data-filter-type', 'color');
            colorOption.setAttribute('data-filter-value', color);
            colorOption.setAttribute('title', color);
            
            optionsContainer.appendChild(colorOption);
        });
        
        section.appendChild(optionsContainer);
        return section;
    }
    
    /**
     * Set up event listeners for filter buttons and options
     */
    setupEventListeners() {
        document.addEventListener('click', event => {
            // Handle filter button clicks
            if (event.target.classList.contains('filter-btn')) {
                const filterType = event.target.getAttribute('data-filter-type');
                const filterValue = event.target.getAttribute('data-filter-value');
                
                // Remove active class from all buttons in this section
                const buttons = document.querySelectorAll(`.filter-btn[data-filter-type="${filterType}"]`);
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                event.target.classList.add('active');
                
                // Update filters and refresh display
                this.filters[filterType] = filterValue;
                this.applyFilters();
            }
        });
    }
      /**
     * Apply current filters to products and update display
     */    applyFilters() {
        // Start with all products
        this.filteredProducts = [...this.products];
        
        // Apply category filter
        if (this.filters.category !== 'all') {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.category === this.filters.category ||
                (product.tags && product.tags.includes(this.filters.category))
            );
            
            // Update available subcategories for this category
            if (this.categorySubcategories) {
                const availableSubcategories = this.categorySubcategories.get(this.filters.category);
                this.updateSubcategoryOptions(Array.from(availableSubcategories || []));
            }
        } else {
            // Reset subcategory options when no category is selected
            this.updateSubcategoryOptions(Array.from(this.filterOptions.subcategories));
        }
        
        // Apply subcategory filter
        if (this.filters.subcategory !== 'all') {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.subcategory === this.filters.subcategory ||
                (product.tags && product.tags.includes(this.filters.subcategory))
            );
        }
        
        // Apply seller filter
        if (this.filters.seller !== 'all') {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.brand === this.filters.seller || 
                product.manufacturer === this.filters.seller
            );
        }
        
        this.currentPage = 1;
        this.displayProducts();
    }
    
    /**
     * Update the subcategory options in the UI based on the selected category
     * @param {Array} subcategories - Array of available subcategories
     */
    updateSubcategoryOptions(subcategories) {
        const subcategorySection = document.querySelector('.filter-section[data-filter-type="subcategory"]');
        if (!subcategorySection) return;
        
        const optionsContainer = subcategorySection.querySelector('.filter-options');
        if (!optionsContainer) return;
        
        // Clear existing options except "All"
        const allButton = optionsContainer.querySelector('[data-filter-value="all"]');
        optionsContainer.innerHTML = '';
        if (allButton) optionsContainer.appendChild(allButton);
        
        // Add buttons for available subcategories
        subcategories.forEach(subcategory => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.setAttribute('data-filter-type', 'subcategory');
            button.setAttribute('data-filter-value', subcategory);
            
            // Count products for this subcategory
            const count = this.products.filter(product => product.subcategory === subcategory).length;
            button.innerHTML = `${subcategory} <span class="filter-badge">${count}</span>`;
            
            // Add active class if this subcategory is currently selected
            if (this.filters.subcategory === subcategory) {
                button.classList.add('active');
            }
            
            optionsContainer.appendChild(button);
        });
    }
      /**
     * Reset all filters to default state
     */    resetFilters() {
        // Reset filter values
        this.filters = {
            category: 'all',
            subcategory: 'all',
            seller: 'all'
        };
        
        // Reset UI active states
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-filter-value') === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Reset filtered products and update display
        this.filteredProducts = [...this.products];
        this.displayProducts();
    }
    
    /**
     * Display filtered products in the grid with pagination
     */
    displayProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;
        
        // Clear current grid
        productGrid.innerHTML = '';
        
        if (this.filteredProducts.length === 0) {
            // Show no results message
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or browse all products.</p>
            `;
            productGrid.appendChild(noResults);
            this.updatePagination();
            return;
        }
        
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = Math.min(startIndex + this.productsPerPage, this.filteredProducts.length);
        
        const pageProducts = this.filteredProducts.slice(startIndex, endIndex);
        
        // Create product cards
        pageProducts.forEach(product => {
            // Create product card element
            const card = this.createProductCard(product);
            
            // Add animation class
            card.classList.add('fade-in');
            
            // Add to grid
            productGrid.appendChild(card);
        });
        
        this.updatePagination();
    }
    
    /**
     * Create pagination controls
     */
    updatePagination() {
        let existingPagination = document.querySelector('.pagination');
        if (existingPagination) {
            existingPagination.remove();
        }
        
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        if (totalPages <= 1) return;
        
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        
        // Previous button
        if (this.currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'page-btn';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.addEventListener('click', () => {
                this.currentPage--;
                this.displayProducts();
            });
            pagination.appendChild(prevBtn);
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn' + (i === this.currentPage ? ' active' : '');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.displayProducts();
            });
            pagination.appendChild(pageBtn);
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'page-btn';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', () => {
                this.currentPage++;
                this.displayProducts();
            });
            pagination.appendChild(nextBtn);
        }
        
        const content = document.querySelector('.category-content');
        if (content) {
            content.appendChild(pagination);
        }
    }
      /**
     * Get a properly formatted image path from a product's image property
     * @param {string} imagePath - The image path from the product object
     * @returns {string} A properly formatted image path
     */
    getFormattedImagePath(imagePath) {
        // If path is already a full URL (http:// or https://) return as is
        if (imagePath && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
            return imagePath;
        }
        
        // If path already starts with '../assets', return as is
        if (imagePath && imagePath.startsWith('../assets')) {
            return imagePath;
        }
        
        // If path starts with 'assets/', add '../' prefix
        if (imagePath && imagePath.startsWith('assets/')) {
            return '../' + imagePath;
        }
        
        // For other cases, ensure it points to products directory
        const filename = imagePath.split('/').pop();
        return `../assets/products/${filename}`;
    }
    
    /**
     * Create a product card element
     * @param {Object} product - Product data
     * @returns {HTMLElement} Product card element
     */    createProductCard(product) {
        const card = document.createElement('a');
        card.className = 'product-card';
        card.href = `../product.html?id=${product.id}`;
        
        // Generate star rating HTML
        const starsHtml = this.generateStarRating(product.rating);
        
        // Generate badge HTML if product has a badge
        const badgeHtml = product.badge 
            ? `<span class="product-badge ${product.badge}">${product.badge}</span>` 
            : '';
        
        // Format image path
        const imagePath = this.getFormattedImagePath(product.image);          card.innerHTML = `
            ${badgeHtml}
            <div class="product-image-container">
                <img src="${imagePath}" alt="${product.title}" class="product-img" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    ${product.subcategory ? `<span class="product-subcategory">${product.subcategory}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${starsHtml}
                    </div>
                    <div class="count">(${product.reviewCount.toLocaleString()})</div>
                </div>
                <div class="product-actions">
                    <button class="product-btn primary"><i class="fas fa-shopping-cart"></i> View Details</button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Generate HTML for star ratings
     * @param {number} rating - Product rating (0-5)
     * @returns {string} HTML for star rating display
     */
    generateStarRating(rating = 0) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Add half star if needed
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    }
    
    /**
     * Get CSS color code from color name
     * @param {string} colorName - Name of the color
     * @returns {string} CSS color code
     */
    getColorCode(colorName) {
        const colorMap = {
            'black': '#000000',
            'white': '#FFFFFF',
            'red': '#FF0000',
            'blue': '#0000FF',
            'green': '#008000',
            'yellow': '#FFFF00',
            'purple': '#800080',
            'orange': '#FFA500',
            'pink': '#FFC0CB',
            'gray': '#808080',
            'brown': '#A52A2A',
            'gold': '#FFD700',
            'silver': '#C0C0C0',
            'coral': '#FF7F50',
            'navy': '#000080',
            'teal': '#008080',
            'olive': '#808000',
            'maroon': '#800000'
        };
        
        // Return the color code if it exists in the map, or return the color name
        return colorMap[colorName.toLowerCase()] || colorName;
    }
}

// Initialize the product filter system
const productFilterSystem = new ProductFilterSystem();

// Add an event listener to ensure images are loaded properly
document.addEventListener('DOMContentLoaded', function() {
    // Force reload images after a short delay to ensure they're displayed correctly
    setTimeout(() => {
        document.querySelectorAll('.product-img').forEach(img => {
            const currentSrc = img.src;
            img.src = '';
            img.src = currentSrc;
        });
    }, 500);
});

function displayProducts(productsToDisplay, categoryTitle) {
    const products = productsToDisplay || productsData; // Default to productsData if no specific list provided
    // ...existing code...
}

function initCategoryPage() {
    // ...existing code...
    let categoryKey = getCategoryKeyFromPath();
    let productsToDisplay = productsData; // Default to all products
    let categoryTitle = "All Products";

    if (categoryKey === 'amazon-fresh' && window.amazonFreshProducts) {
        productsToDisplay = window.amazonFreshProducts;
        categoryTitle = "Amazon Fresh";
    } else if (categoryKey === 'smart-home' && window.smartHomeProducts) { // Example for another category
        productsToDisplay = window.smartHomeProducts;
        categoryTitle = "Smart Home";
    }
    // Add more else if blocks for other specific categories if needed

    displayProducts(productsToDisplay, categoryTitle);
    // ...existing code...
}

document.addEventListener('DOMContentLoaded', initCategoryPage);
