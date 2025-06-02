// Script to update all category pages with consistent search scripts
const fs = require('fs');
const path = require('path');

// Path to category directory
const categoryDir = path.join(__dirname, '../../category');

// Get all category HTML files
const categoryFiles = fs.readdirSync(categoryDir).filter(file => file.endsWith('.html'));

console.log(`Found ${categoryFiles.length} category files to process`);

// Process each file
categoryFiles.forEach(file => {
  const filePath = path.join(categoryDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file already has search-manager.js
  if (content.includes('search-manager.js')) {
    console.log(`${file} already has search-manager.js, skipping`);
    return;
  }
  
  // Find and replace the script block 
  const oldPattern1 = /<script src="\.\.\/assets\/js\/category-filter\.js"><\/script>\s*<script src="\.\.\/assets\/js\/search\.js"><\/script>\s*<script src="\.\.\/assets\/js\/components-loader\.js"><\/script>/;
  const oldPattern2 = /<script src="\.\.\/assets\/js\/category-filter\.js"><\/script>\s*<script src="\.\.\/assets\/js\/components-loader\.js"><\/script>/;
  
  const replacement = `<script src="../assets/js/category-filter.js"></script>
  <script src="../assets/js/search-manager.js"></script>
  <script src="../assets/js/search-init.js"></script>
  <script src="../assets/js/components-loader.js"></script>`;
  
  // Apply replacement
  let updated = false;
  if (oldPattern1.test(content)) {
    content = content.replace(oldPattern1, replacement);
    updated = true;
  } else if (oldPattern2.test(content)) {
    content = content.replace(oldPattern2, replacement);
    updated = true;
  }
  
  // Also ensure the product data is correctly set for the MARKRYPT namespace
  // This might require manual inspection as patterns vary between files
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not find replacement pattern in ${file}`);
  }
});

console.log('Category page update process complete');
