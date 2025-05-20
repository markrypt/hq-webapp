import os
import re

def replace_string_in_file(file_path, old_string, new_string):
    """Replace a string in a file with a new string."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace the string
        if old_string in content:
            content = content.replace(old_string, new_string)
            
            # Write the updated content back to the file
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            
            return True
        else:
            return False
    except Exception as e:
        print(f"Error replacing string in {file_path}: {e}")
        return False

def update_for_components(file_path):
    """Update a file to use components."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Check if the file already has component placeholders
        if 'id="header-placeholder"' in content and 'id="navigation-placeholder"' in content and 'components-loader.js' in content:
            print(f"Skipping {file_path}: Already updated")
            return
        
        # Get the relative path depth
        rel_path = os.path.relpath(file_path, "C:/Users/Zero/Desktop/employee1/hq-webapp")
        depth = len(rel_path.split(os.sep)) - 1
        path_prefix = '../' * depth if depth > 0 else ''
        
        # Prepare the component loader script path
        loader_script = f'<script src="{path_prefix}assets/js/components-loader.js"></script>'
        
        # Replace the header
        header_pattern = r'<header\s+class="header"[\s\S]*?</header>'
        header_match = re.search(header_pattern, content)
        if header_match:
            content = re.sub(header_pattern, '<div id="header-placeholder"></div>', content)
            print(f"Replaced header in {file_path}")
        
        # Replace the navigation
        nav_pattern = r'<nav\s+class="navigation"[\s\S]*?</nav>'
        nav_match = re.search(nav_pattern, content)
        if nav_match:
            content = re.sub(nav_pattern, '<div id="navigation-placeholder"></div>', content)
            print(f"Replaced navigation in {file_path}")
        
        # Add the component loader script before </body>
        if 'components-loader.js' not in content:
            content = re.sub(r'(</body>)', f'{loader_script}\n\\1', content)
            print(f"Added component loader script to {file_path}")
        
        # Remove duplicate menu functions
        menu_func_pattern = r'function toggleMenuDropdown\(\)\s*\{[\s\S]*?closeMenuDropdown\(\)\s*\{[\s\S]*?\}\s*\}'
        if re.search(menu_func_pattern, content):
            content = re.sub(menu_func_pattern, '// Menu functions moved to components-loader.js', content)
            print(f"Removed duplicate menu functions from {file_path}")
        
        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Successfully updated {file_path}")
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

# List of pages to update
pages_to_update = [
    # Root pages
    "C:/Users/Zero/Desktop/employee1/hq-webapp/trending.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/about.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/contact.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/privacy.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/terms.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/cookies.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/404.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/explore.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/search-verify.html",
    
    # Article pages
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/6 Best Budget Wellness Finds Under $25 on Amazon - Markrypt.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/Amazons Elite 5. Top Rated Home and Kitchen Best Sellers You Cannot Ignore. Markrypt.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/Top 5 Amazon Baby Best Sellers.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/Top 5 Amazon Beauty and Personal Care Best Sellers.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/Top 6 Affordable Health and Wellness Must Haves.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/Top 6 Affordable Relaxation & Recovery Gadgets on Amazon.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/article/Top Gifts for Dad 2025.html",
    
    # Category pages
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/amazon-fresh.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/beauty-and-health.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/books.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/clothing-shoes-jewelry-and-watches.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/computers.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/food-and-grocery.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/handmade.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/home-garden-and-tools.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/household-essentials.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/industrial-and-scientific.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/movies-music-and-games.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/pet-supplies.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/smart-home.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/sports-and-outdoors.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/toys-kids-and-baby.html",
    "C:/Users/Zero/Desktop/employee1/hq-webapp/category/whole-foods-market.html"
]

# Update each page
for page in pages_to_update:
    if os.path.exists(page):
        update_for_components(page)
    else:
        print(f"File not found: {page}")

print("Component update process complete")
