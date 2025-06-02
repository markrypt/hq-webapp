#!/usr/bin/env python3
"""
Script to update all category pages with global-products-loader.js
"""
import os
import re

# Path to the category directory
category_dir = r"c:\Users\Zero\Desktop\employee3\hq-webapp\category"

# List of all category HTML files
category_files = [
    "amazon-fresh.html",
    "automotive.html", 
    "beauty-and-health.html",
    "books.html",
    "clothing-shoes-jewelry-and-watches.html",
    "computers.html",
    "electronics.html",
    "food-and-grocery.html",
    "handmade.html",
    "home-garden-and-tools.html",
    "household-essentials.html",
    "industrial-and-scientific.html",
    "movies-music-and-games.html",
    "pet-supplies.html",
    "smart-home.html",
    "sports-and-outdoors.html",
    "toys-kids-and-baby.html",
    "whole-foods-market.html"
]

def update_category_page(file_path):
    """Update a single category page with global products loader"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if global-products-loader.js is already included
        if 'global-products-loader.js' in content:
            print(f"✅ {os.path.basename(file_path)} already has global-products-loader.js")
            return True
        
        # Pattern to find where to insert the script
        # Look for: <script src="../assets/js/common.js"></script>
        # And add global-products-loader.js after it
        pattern = r'(<script src="\.\./assets/js/common\.js"></script>)'
        replacement = r'\1\n  <script src="../assets/js/global-products-loader.js"></script>'
        
        if re.search(pattern, content):
            updated_content = re.sub(pattern, replacement, content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print(f"✅ Updated {os.path.basename(file_path)} with global-products-loader.js")
            return True
        else:
            print(f"⚠️ Could not find insertion point in {os.path.basename(file_path)}")
            return False
            
    except Exception as e:
        print(f"❌ Error updating {os.path.basename(file_path)}: {e}")
        return False

def main():
    print("🔄 Updating all category pages with global-products-loader.js...")
    
    updated_count = 0
    for filename in category_files:
        file_path = os.path.join(category_dir, filename)
        if os.path.exists(file_path):
            if update_category_page(file_path):
                updated_count += 1
        else:
            print(f"⚠️ File not found: {filename}")
    
    print(f"\n✅ Updated {updated_count} out of {len(category_files)} category pages")

if __name__ == "__main__":
    main()
