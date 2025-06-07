// Breadcrumbs navigation script for Markrypt
// This helps Google understand the site hierarchy for sitelinks

// Define the breadcrumb structure
const BREADCRUMB_CONFIG = {
    'index.html': { path: '/', title: 'Home', parent: null },
    'surface': { path: '/surface', title: 'Microsoft Surface', parent: '/' },
    'windows11': { path: '/windows11', title: 'Windows 11', parent: '/' },
    'microsoft365': { path: '/microsoft365', title: 'Microsoft 365', parent: '/' },
    'gaming': { path: '/gaming', title: 'Gaming', parent: '/' },
    'deals': { path: '/deals', title: 'Deals', parent: '/' },
    'sitemap': { path: '/sitemap', title: 'Sitemap', parent: '/' },
    '404': { path: '/404', title: 'Page Not Found', parent: '/' },
    'privacy': { path: '/privacy', title: 'Privacy Policy', parent: '/' },
    'terms': { path: '/terms', title: 'Terms of Use', parent: '/' },
    'cookies': { path: '/cookies', title: 'Cookie Policy', parent: '/' },
    'accessibility': { path: '/accessibility', title: 'Accessibility', parent: '/' }
};

// Function to generate breadcrumb HTML and JSON-LD
function generateBreadcrumbs() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const currentPage = pathParts.length > 0 ? pathParts[pathParts.length - 1].replace('.html', '') : 'index.html';
    
    // If this page isn't in our config, exit
    if (!BREADCRUMB_CONFIG[currentPage]) return;
    
    // Build the breadcrumb trail
    const breadcrumbTrail = [];
    let currentItem = BREADCRUMB_CONFIG[currentPage];
    
    // Add the current page
    breadcrumbTrail.unshift({ path: currentItem.path, title: currentItem.title });
    
    // Add all parent pages
    while (currentItem.parent !== null) {
        const parentKey = currentItem.parent === '/' ? 'index.html' : currentItem.parent;
        currentItem = BREADCRUMB_CONFIG[parentKey];
        breadcrumbTrail.unshift({ path: currentItem.path, title: currentItem.title });
    }
    
    // Create the HTML
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.className = 'breadcrumbs';
    
    // Build the HTML string
    let breadcrumbHTML = '';
    breadcrumbTrail.forEach((item, index) => {
        if (index === breadcrumbTrail.length - 1) {
            breadcrumbHTML += `<span class="breadcrumb-current">${item.title}</span>`;
        } else {
            breadcrumbHTML += `<a href="${item.path}" class="breadcrumb-link">${item.title}</a> <span class="breadcrumb-separator">&gt;</span> `;
        }
    });
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
    
    // Add the breadcrumb to the page - right after the header
    const header = document.querySelector('header');
    if (header && header.nextSibling) {
        header.parentNode.insertBefore(breadcrumbContainer, header.nextSibling);
    }
    
    // Create the JSON-LD for structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbTrail.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.title,
            'item': `https://markrypt.com${item.path}`
        }))
    };
    
    // Add the JSON-LD to the head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);
}

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', generateBreadcrumbs);
