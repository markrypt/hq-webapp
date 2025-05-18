async function loadHeaderFooter() {
    try {
        const headerResponse = await fetch('/header.html');
        const footerResponse = await fetch('/footer.html');

        if (!headerResponse.ok || !footerResponse.ok) {
            throw new Error(`Failed to load header or footer: ${headerResponse.status}, ${footerResponse.status}`);
        }

        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();

        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        document.body.insertAdjacentHTML('beforeend', footerHtml);

        // Add event listeners for menu icon and close menu after the header is loaded
        const menuIcon = document.querySelector('.menu-icon');
        const closeMenu = document.querySelector('.close-menu');
        const sideNav = document.querySelector('.side-nav');
        const overlay = document.querySelector('.overlay');

        menuIcon.addEventListener('click', () => {
            sideNav.classList.add('active');
            overlay.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
        });

    } catch (error) {
        console.error('Error loading header and footer:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeaderFooter);
