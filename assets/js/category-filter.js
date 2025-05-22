/**
 * Enhanced Category Filter System for Products
 * Provides functionality to filter products by categories, subcategories, sellers, and colors
 */

class ProductFilterSystem {
    constructor() {
        this.filters = {
            category: 'all',
            subcategory: 'all',
            seller: 'all',
            color: 'all'
        };
        
        this.products = [];
        this.filteredProducts = [];
        
        // Collection of unique filter values
        this.filterOptions = {
            categories: new Set(),
            subcategories: new Set(),
            sellers: new Set(),
            colors: new Set()
        };
        
        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
      /**
     * Initialize the filter system
     */
    initialize() {
        console.log('Initializing Product Filter System');
        
        // Load products data
        if (typeof productsData !== 'undefined' && productsData.length > 0) {
            // Get current page category from URL path
            const currentCategory = this.getCurrentPageCategory();
            console.log('Current page category:', currentCategory);
            
            // Filter products to only show those with matching tags or category
            if (currentCategory) {
                this.products = productsData.filter(product => 
                    (product.tags && product.tags.includes(currentCategory)) ||
                    (product.category && this.normalizeCategoryName(product.category) === currentCategory)
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
     */
    extractFilterOptions() {
        this.products.forEach(product => {
            // Extract categories
            if (product.category) {
                this.filterOptions.categories.add(product.category);
            }
            
            // Extract subcategories
            if (product.subcategory) {
                this.filterOptions.subcategories.add(product.subcategory);
            }
            
            // Extract seller information (using brand/manufacturer as seller)
            if (product.brand) {
                this.filterOptions.sellers.add(product.brand);
            } else if (product.manufacturer) {
                this.filterOptions.sellers.add(product.manufacturer);
            }
            
            // Extract colors (if present)
            if (product.colors && Array.isArray(product.colors)) {
                product.colors.forEach(color => {
                    this.filterOptions.colors.add(color);
                });
            }
        });
        
        // Convert sets to sorted arrays for UI creation
        for (const key in this.filterOptions) {
            this.filterOptions[key] = Array.from(this.filterOptions[key]).sort();
        }
    }
    
    /**
     * Create the filter UI with sections for categories, subcategories, sellers, and colors
     */
    createFilterUI() {
        // Create main filter container
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        
        // Add category filter section
        filterContainer.appendChild(this.createFilterSection(
            'Categories', 
            'tag', 
            'category', 
            this.filterOptions.categories
        ));
        
        // Add subcategory filter section if available
        if (this.filterOptions.subcategories.length > 0) {
            filterContainer.appendChild(this.createFilterSection(
                'Subcategories', 
                'layer-group', 
                'subcategory', 
                this.filterOptions.subcategories
            ));
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
        
        // Add color filter section if available
        if (this.filterOptions.colors.length > 0) {
            filterContainer.appendChild(this.createColorFilterSection(
                'Colors', 
                'palette', 
                this.filterOptions.colors
            ));
        }
        
        // Add reset button
        const resetButton = document.createElement('button');
        resetButton.className = 'filter-reset';
        resetButton.innerHTML = '<i class="fas fa-undo-alt"></i> Reset Filters';
        resetButton.addEventListener('click', () => this.resetFilters());
        filterContainer.appendChild(resetButton);
        
        // Add filter container to the page
        const mainContent = document.querySelector('.product-main-content');
        if (mainContent) {
            const existingTitle = mainContent.querySelector('h1');
            if (existingTitle && existingTitle.nextElementSibling) {
                mainContent.insertBefore(filterContainer, existingTitle.nextElementSibling.nextElementSibling);
            } else {
                mainContent.appendChild(filterContainer);
            }
        }
        
        // Create product grid container
        const productGrid = document.createElement('div');
        productGrid.className = 'product-grid';
        productGrid.id = 'productGrid';
        
        // Add product grid after filter container
        if (mainContent) {
            mainContent.appendChild(productGrid);
        }
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
            button.setAttribute('data-filter-value', option);
            
            // Count products for this option
            const count = this.products.filter(product => {
                if (filterType === 'category') {
                    return product.category === option;
                } else if (filterType === 'subcategory') {
                    return product.subcategory === option;
                } else if (filterType === 'seller') {
                    return product.brand === option || product.manufacturer === option;
                }
                return false;
            }).length;
            
            button.innerHTML = `${option} <span class="filter-badge">${count}</span>`;
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
            
            // Handle color option clicks
            if (event.target.classList.contains('color-option')) {
                const filterType = event.target.getAttribute('data-filter-type');
                const filterValue = event.target.getAttribute('data-filter-value');
                
                // Toggle active class on clicked color
                if (event.target.classList.contains('active')) {
                    event.target.classList.remove('active');
                    this.filters[filterType] = 'all';
                } else {
                    // Remove active class from all color options
                    const colorOptions = document.querySelectorAll('.color-option');
                    colorOptions.forEach(option => option.classList.remove('active'));
                    
                    // Add active class to clicked option
                    event.target.classList.add('active');
                    this.filters[filterType] = filterValue;
                }
                
                this.applyFilters();
            }
        });
    }
    
    /**
     * Apply current filters to products and update display
     */
    applyFilters() {
        // Start with all products
        this.filteredProducts = [...this.products];
        
        // Apply category filter
        if (this.filters.category !== 'all') {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.category === this.filters.category ||
                (product.tags && product.tags.includes(this.filters.category))
            );
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
        
        // Apply color filter
        if (this.filters.color !== 'all') {
            this.filteredProducts = this.filteredProducts.filter(product => 
                product.colors && product.colors.includes(this.filters.color)
            );
        }
        
        // Update product display
        this.displayProducts();
    }
    
    /**
     * Reset all filters to default state
     */
    resetFilters() {
        // Reset filter values
        this.filters = {
            category: 'all',
            subcategory: 'all',
            seller: 'all',
            color: 'all'
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
        
        // Reset color options
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => option.classList.remove('active'));
        
        // Reset filtered products and update display
        this.filteredProducts = [...this.products];
        this.displayProducts();
    }
    
    /**
     * Display filtered products in the grid
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
            return;
        }
        
        // Create product cards
        this.filteredProducts.forEach(product => {
            // Create product card element
            const card = this.createProductCard(product);
            
            // Add animation class
            card.classList.add('fade-in');
            
            // Add to grid
            productGrid.appendChild(card);
        });
    }
    
    /**
     * Create a product card element
     * @param {Object} product - Product data
     * @returns {HTMLElement} Product card element
     */
    createProductCard(product) {
        const card = document.createElement('a');
        card.className = 'product-card';
        card.href = `../product.html?id=${product.id}`;
        
        // Generate star rating HTML
        const starsHtml = this.generateStarRating(product.rating);
        
        // Generate badge HTML if product has a badge
        const badgeHtml = product.badge 
            ? `<span class="product-badge ${product.badge}">${product.badge}</span>` 
            : '';
        
        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image" style="background-image: url('${product.image}');"></div>
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
