# Component System for Markrypt Website

This system has been implemented to reduce duplication of header and navigation code across the website. It uses a components loader to dynamically inject these elements into each page.

## How It Works

1. Components are stored as HTML fragments in `assets/components/`
2. The `components-loader.js` script loads these fragments and injects them into placeholder elements on each page
3. Styling and functionality remain consistent across all pages

## Files Created

- `assets/components/header.html`: Contains the site header HTML
- `assets/components/navigation.html`: Contains the bottom navigation HTML
- `assets/js/components-loader.js`: JavaScript to load and inject components
- `assets/components/template-for-existing-pages.html`: Template for updating other pages

## How to Update an Existing Page

To update any page to use the component system:

1. Replace the header code with `<div id="header-placeholder"></div>`
2. Replace the navigation code with `<div id="navigation-placeholder"></div>`
3. Add `<script src="assets/js/components-loader.js"></script>` before the closing `</body>` tag
4. Remove any duplicate dropdown menu functions (`toggleMenuDropdown()` and `closeMenuDropdown()`)
5. Remove any navigation active state code as it's now handled by the component loader

## Benefits

- Single source of truth for header and navigation
- Easier maintenance - change components in one place
- Consistent experience across all pages
- Reduced file size and duplication
- Same mobile responsiveness as before

## Testing

Open the site in a web browser to test. The components should load dynamically and maintain all existing functionality.

## Troubleshooting

If components don't load:
- Ensure your server supports fetching local files (use a local web server like http-server)
- Check browser console for errors
- Verify paths are correct relative to each page
