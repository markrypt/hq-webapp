// Script.js for Marketing Grid Website

// Navigation Configuration - Update this to change navigation across all pages
const NAVIGATION_CONFIG = {
    pages: [
        { name: 'Home', url: 'index.html', hasDropdown: false },
        { 
            name: 'Surface', 
            url: 'surface.html', 
            hasDropdown: true,
            dropdownItems: [
                { name: 'Surface Family', url: '#surface-family' },
                { name: 'Surface Pro Family', url: '#surface-pro-family' },
                { name: 'Surface Laptop Family', url: '#surface-laptop-family' },
                { name: 'Surface Studio', url: '#surface-studio' },
                { name: 'Surface Accessories', url: '#surface-accessories' }
            ]
        },
        { 
            name: 'Windows 11', 
            url: 'windows11.html', 
            hasDropdown: true,
            dropdownItems: [
                { name: 'Discover Windows 11', url: '#discover-windows11' },
                { name: 'Windows Copilot+ PCs', url: '#copilot-pcs' },
                { name: 'Compatibility on ARM', url: '#arm-compatibility' },
                { name: 'Windows Features', url: '#windows-features' }
            ]
        },
        { name: 'Microsoft 365', url: 'microsoft365.html', hasDropdown: false },
        { 
            name: 'Deals', 
            url: 'deals.html', 
            hasDropdown: true,
            dropdownItems: [
                { name: 'Windows Deals', url: '#windows-deals' },
                { name: 'Gaming Deals', url: '#gaming-deals' },
                { name: 'Surface Deals', url: '#surface-deals' },
                { name: 'Microsoft 365 Deals', url: '#office-deals' }
            ]
        },
        { name: 'Gaming', url: 'gaming.html', hasDropdown: false }
    ]
};

// Function to generate logo with responsive behavior
function generateLogo() {
    const logoContainer = document.querySelector('.logo');
    if (logoContainer) {
        logoContainer.innerHTML = `
            <a href="index.html">
                <img src="assets/mainpage/logo/logo.png" alt="Markrypt Logo" class="logo-image">
                <h1 class="company-name">Mar<span class="k-blue">k</span><span>rypt</span></h1>
            </a>
        `;
    }
}

// Function to generate navigation HTML
function generateNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      // Generate Mobile Navigation
    const mobileNavContainer = document.getElementById('mobileNav');
    if (mobileNavContainer) {
        const mobileNavHTML = `
            <ul>
                ${NAVIGATION_CONFIG.pages.map(page => {
                    const isActive = page.url === currentPage ? ' class="active"' : '';
                    
                    if (page.hasDropdown) {
                        const dropdownHTML = `
                            <li class="dropdown">
                                <a href="${page.url}" class="dropdown-toggle"${isActive}>${page.name} <i class="fas fa-chevron-right"></i></a>
                                <ul class="dropdown-menu">
                                    ${page.dropdownItems.map(item => `<li><a href="${item.url}">${item.name}</a></li>`).join('')}
                                </ul>
                            </li>
                        `;
                        return dropdownHTML;
                    } else {
                        const chevron = page.name !== 'Home' ? ' <i class="fas fa-chevron-right"></i>' : '';
                        return `<li><a href="${page.url}"${isActive}>${page.name}${chevron}</a></li>`;
                    }
                }).join('')}
            </ul>
        `;
        mobileNavContainer.innerHTML = mobileNavHTML;
    }
    
    // Generate Desktop Navigation
    const desktopNavContainer = document.getElementById('desktopNav');
    if (desktopNavContainer) {
        const desktopNavHTML = `
            <ul>
                ${NAVIGATION_CONFIG.pages.map(page => {
                    const isActive = page.url === currentPage ? ' class="active"' : '';
                    
                    if (page.hasDropdown) {
                        const dropdownHTML = `
                            <li class="dropdown">
                                <a href="${page.url}" class="dropdown-toggle"${isActive}>${page.name} <i class="fas fa-chevron-down"></i></a>
                                <ul class="dropdown-menu">
                                    ${page.dropdownItems.map(item => `<li><a href="${item.url}">${item.name}</a></li>`).join('')}
                                </ul>
                            </li>
                        `;
                        return dropdownHTML;
                    } else {
                        return `<li><a href="${page.url}"${isActive}>${page.name}</a></li>`;
                    }
                }).join('')}
            </ul>
        `;
        desktopNavContainer.innerHTML = desktopNavHTML;
    }
}

// Function to set up mobile navigation after generation
function setupMobileNavigation() {
    // Simple and reliable mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        const navLinks = mobileNav.querySelectorAll('a:not(.dropdown-toggle)');
        const dropdownToggles = mobileNav.querySelectorAll('.dropdown-toggle');
        let isMenuOpen = false;

        // Function to close menu
        function closeMenu() {
            mobileNav.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
            isMenuOpen = false;
            // Close all dropdowns when menu closes
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }

        // Function to open menu
        function openMenu() {
            mobileNav.classList.add('show');
            mobileMenuBtn.classList.add('active');
            isMenuOpen = true;
        }

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Handle dropdown toggles
        dropdownToggles.forEach(toggle => {
            // Add click handler to the chevron icon specifically
            const chevronIcon = toggle.querySelector('i');
            if (chevronIcon) {
                chevronIcon.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdown = toggle.closest('.dropdown');
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isActive) {
                        dropdown.classList.remove('active');
                    } else {
                        dropdown.classList.add('active');
                    }
                });
            }
            
            // Handle clicks on the dropdown toggle text (allow navigation)
            toggle.addEventListener('click', function(e) {
                // If the click was on the chevron icon, don't navigate
                if (e.target.tagName === 'I' || e.target.closest('i')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // For text clicks, close the menu and allow navigation
                closeMenu();
                // Don't prevent default here to allow navigation
            });
        });

        // Close mobile menu when clicking on navigation links (but not dropdown toggles)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Handle window resize - close menu when switching to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Generate logo first
    generateLogo();
    
    // Generate navigation
    generateNavigation();
    
    // Set up mobile navigation after generation
    setupMobileNavigation();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.squared-image, .wide-image');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();
    
    // Add staggered animation for category items
    const categoryItems = document.querySelectorAll('.categories-grid .squared-image-container');
    categoryItems.forEach((item, index) => {
        const img = item.querySelector('.squared-image');
        if (img) {
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        }
    });
    
    // Add staggered animation for showcase images
    const animateShowcaseImages = function() {
        const squaredImages = document.querySelectorAll('.squared-image');
        const wideImage = document.querySelector('.wide-image');
        
        squaredImages.forEach((img, index) => {
            setTimeout(() => {
                img.style.transform = 'translateY(-7px)';
                setTimeout(() => {
                    img.style.transform = 'translateY(0)';
                }, 300);
            }, index * 300);
        });
        
        if (wideImage) {
            setTimeout(() => {
                wideImage.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    wideImage.style.transform = 'translateY(0)';
                }, 300);
            }, 600);
        }
    };
    
    setTimeout(animateShowcaseImages, 500);    // Mobile menu toggle with side menu
    const createMobileMenu = function() {
        const header = document.querySelector('.modern-header');
        const nav = document.querySelector('nav');
        const body = document.body;
        
        // Remove existing menu button if present
        const existingBtn = document.querySelector('.mobile-menu-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        // Create overlay for side menu if it doesn't exist
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            body.appendChild(overlay);
            
            // Close menu when clicking overlay
            overlay.addEventListener('click', function() {
                nav.classList.remove('show');
                overlay.classList.remove('show');
                const btn = document.querySelector('.mobile-menu-btn');
                if (btn) {
                    btn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
        
        // Only create menu button on smaller screens
        if (window.innerWidth < 768) {
            // Create menu button
            const menuBtn = document.createElement('button');
            menuBtn.classList.add('mobile-menu-btn');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            header.insertBefore(menuBtn, nav);
            
            // Close menu when clicking nav links
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('show');
                    overlay.classList.remove('show');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
            
            // Event listener for menu button
            menuBtn.addEventListener('click', function() {
                nav.classList.toggle('show');
                overlay.classList.toggle('show');
                menuBtn.innerHTML = nav.classList.contains('show') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });        }
    };
});
