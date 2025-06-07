// Script.js for Marketing Grid Website - SEO Optimized

// Add JSON-LD structured data for SEO
function addStructuredDataNavigation() {
    const navData = {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": NAVIGATION_CONFIG.pages.map(page => page.name),
        "url": NAVIGATION_CONFIG.pages.map(page => `https://markrypt.com${page.url === '/' ? '' : '/'}${page.url}`)
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(navData);
    document.head.appendChild(script);
}

// Navigation Configuration - Update this to change navigation across all pages
const NAVIGATION_CONFIG = {
    pages: [
        { name: 'Home', url: '/', hasDropdown: false },        { 
            name: 'Surface', 
            url: 'surface', 
            hasDropdown: true,
            dropdownItems: [
                { name: 'Surface Pro (13")', url: 'https://www.amazon.com/Microsoft-Surface-Touchscreen-Snapdragon-Platinum/dp/B0DZ5DBD83?th=1&linkCode=ll1&tag=1914061-20&linkId=599cff4e706175470ade009a76c8ea2e&language=en_US&ref_=as_li_ss_tl' },
                { name: 'Surface Pro LTE', url: 'https://www.amazon.com/Microsoft-Surface-Touchscreen-Snapdragon-Exclusive/dp/B0CXKXNNPX?&linkCode=ll1&tag=1914061-20&linkId=439d5db5bf28e06a7dff13ae57a9a108&language=en_US&ref_=as_li_ss_tl' },
                { name: 'Surface Pro OLED (13")', url: 'https://www.amazon.com/Microsoft-Touchscreen-Snapdragon-Connectivity-Platinum/dp/B0CXL11ZFD?th=1&linkCode=ll1&tag=1914061-20&linkId=043a184679692d6da4711eed6a3cc16c&language=en_US&ref_=as_li_ss_tl' },
                { name: 'Surface Laptop (13.8")', url: 'https://www.amazon.com/Microsoft-Surface-Touchscreen-Snapdragon-Platinum/dp/B0DZBMVVLT?th=1&linkCode=ll1&tag=1914061-20&linkId=e7819f44b3390eb3e54d14d1d4579740&language=en_US&ref_=as_li_ss_tl' },
                { name: 'Surface Laptop (15")', url: 'https://www.amazon.com/Microsoft-Surface-Touchscreen-Snapdragon-Platinum/dp/B0CXL1GV9Z?&linkCode=ll1&tag=1914061-20&linkId=cf3cdbd1839c9e470c46930d5949703b&language=en_US&ref_=as_li_ss_tl' }
            ]
        },
        { 
            name: 'Windows 11', 
            url: 'windows11', 
            hasDropdown: true,
            dropdownItems: [                { name: 'Discover Windows 11', url: 'windows11#discover-windows11' },
                { name: 'Windows Copilot+ PCs', url: 'windows11#copilot-pcs' },
                { name: 'Compatibility on ARM', url: 'windows11#arm-compatibility' },
                { name: 'Windows Features', url: 'windows11#windows-features' }
            ]
        },        { 
            name: 'Microsoft 365', 
            url: 'microsoft365', 
            hasDropdown: true,dropdownItems: [                { name: 'Microsoft 365 Personal', url: 'https://www.amazon.com/Microsoft-Personal-12-month-subscription-Auto-renewal/dp/B07F3TQ6DQ?dib=eyJ2IjoiMSJ9.2odV9HvJ3U7EuRhxuAiX_lcOl39k0f_RrxRDjuGIH1nziAwSyNDwAk1yvwVzMin0Q3tAdx91XJpgczvl5wBXEiEj3MFe-2dlGvKW4JLeSyJ4ZCtnjj2q4GQe-RG3hU1jZQKCeSmLJz8ZiQWcEtTeHnSprPWCSZh9B-77cmXLjSg3u_Pt_66J-J7zLbLGUMdUR2OHEX1ftjpLqZW3Mtcbcj-gFHHINmyCQxrWkVeXXDc.pm7EtCRfWyEDn9B_26FEGUzEiOD17OgPsQ5ayGc3kXI&dib_tag=se&keywords=microsoft%2B365&qid=1749247839&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=1914061-20&linkId=76ed3c9ab7c7dc05badd162e30ed0639&language=en_US&ref_=as_li_ss_tl' },
                { name: 'Office Home 2024', url: 'https://www.amazon.com/Microsoft-Personal-12-month-subscription-Auto-renewal/dp/B0DGVQMGBB?dib=eyJ2IjoiMSJ9.2odV9HvJ3U7EuRhxuAiX_lcOl39k0f_RrxRDjuGIH1nziAwSyNDwAk1yvwVzMin0Q3tAdx91XJpgczvl5wBXEiEj3MFe-2dlGvKW4JLeSyJ4ZCtnjj2q4GQe-RG3hU1jZQKCeSmLJz8ZiQWcEtTeHnSprPWCSZh9B-77cmXLjSg3u_Pt_66J-J7zLbLGUMdUR2OHEX1ftjpLqZW3Mtcbcj-gFHHINmyCQxrWkVeXXDc.pm7EtCRfWyEDn9B_26FEGUzEiOD17OgPsQ5ayGc3kXI&dib_tag=se&keywords=microsoft%2B365&qid=1749247839&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=1914061-20&linkId=196a53b9503e00e32a42cd2d64bed160&language=en_US&ref_=as_li_ss_tl' },                { name: 'Microsoft 365 Family', url: 'https://www.amazon.com/dp/B07F3SNQT5?th=1&linkCode=ll1&tag=1914061-20&linkId=06be7ec93dc67268fb43e0e72dfad4cd&language=en_US&ref_=as_li_ss_tl' },
                { name: 'Microsoft 365 Business', url: 'https://www.amazon.com/Microsoft-Business-12-month-subscription-Download/dp/B07H5C1X31?crid=1YPNE46XYRBEV&dib=eyJ2IjoiMSJ9.bHXY403Zu5_fpPWrUPFzaPdjK3ciccS8a3iFLHrIsiVOPF7udv4PE_nkKwJGk05MAMAmzPKxsUFInd18O_RP_B9eAKQ9A5aZkZtWrqBhKIArx8xXl1I0wt3NE1lclGOUQR5FN_RrXl65tRsrCWN1eaW73Qmykg8UKJiTSouKFPZvo0GVQiHmXNuhY4AsMmSs-Cw0p4sNdoU_x2Edm6WeWB4u5lcTDfjnvLO1Yq0TpXY.Y-ZJHUaADTST8qjL81TC9x4SH1BX6iOSFeJlGdzC6D8&dib_tag=se&keywords=microsoft+365+business+standard&qid=1749248553&sprefix=microsoft+365+business%2Caps%2C181&sr=8-3&linkCode=ll1&tag=1914061-20&linkId=b9de40c7005dcf4d76e7780c288d9a1d&language=en_US&ref_=as_li_ss_tl' }
            ]        },
        { 
            name: 'Deals', 
            url: 'deals', 
            hasDropdown: true,
            dropdownItems: [                { name: 'Windows Deals', url: 'deals#windows-deals' },
                { name: 'Gaming Deals', url: 'deals#gaming-deals' },
                { name: 'Surface Deals', url: 'deals#surface-deals' },
                { name: 'Microsoft 365 Deals', url: 'deals#office-deals' }
            ]
        },
        { name: 'Gaming', url: 'gaming', hasDropdown: false },
        { name: 'Sitemap', url: 'sitemap', hasDropdown: false }
    ]
};

// Function to generate logo with responsive behavior
function generateLogo() {
    const logoContainer = document.querySelector('.logo');
    if (logoContainer) {
        logoContainer.innerHTML = `
            <a href="/">
                <img src="assets/mainpage/logo/logo.png" alt="Markrypt Logo" class="logo-image">
                <h1 class="company-name">Mar<span class="k-blue">k</span><span>rypt</span></h1>
            </a>
        `;
    }
}

// Function to generate navigation HTML
function generateNavigation() {
    // Get current path and transform for clean URL comparison
    let currentPath = window.location.pathname.split('/').pop();
    // Handle root path specially
    const currentPage = currentPath ? (currentPath.includes('.html') ? currentPath : currentPath) : '/';
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
    
    // Add structured data for SEO
    addStructuredDataNavigation();
    
    // Add alt text to images for SEO
    document.querySelectorAll('img:not([alt])').forEach(img => {
        const pathParts = img.src.split('/');
        const fileName = pathParts[pathParts.length - 1].split('.')[0];
        img.alt = fileName.replace(/-/g, ' ').replace(/_/g, ' ');
    });
    
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
