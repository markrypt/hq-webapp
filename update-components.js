#!/usr/bin/env node
/*
 * Script to update all HTML files in the workspace with component placeholders
 * This script will:
 * 1. Replace the header section with a header placeholder
 * 2. Replace the navigation section with a navigation placeholder
 * 3. Add the components-loader.js script
 * 4. Remove duplicate menu functions
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Root directory of the project
const ROOT_DIR = process.cwd();

// Function to find all HTML files recursively
async function findHtmlFiles(dir) {
  const files = [];
  
  async function scan(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

// Function to update a single HTML file
async function updateHtmlFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    let content = await readFileAsync(filePath, 'utf8');
    
    // Skip files that already have the component placeholders
    if (content.includes('id="header-placeholder"') && 
        content.includes('id="navigation-placeholder"') &&
        content.includes('components-loader.js')) {
      console.log(`  - Already updated, skipping`);
      return;
    }
    
    // 1. Replace header
    const headerRegex = /<header\s+class="header"[\s\S]*?<\/header>/;
    if (content.match(headerRegex)) {
      content = content.replace(headerRegex, '<div id="header-placeholder"></div>');
      console.log(`  - Header replaced`);
    } else {
      console.log(`  - Header not found, manual update required`);
    }
    
    // 2. Replace navigation
    const navRegex = /<nav\s+class="navigation"[\s\S]*?<\/nav>/;
    if (content.match(navRegex)) {
      content = content.replace(navRegex, '<div id="navigation-placeholder"></div>');
      console.log(`  - Navigation replaced`);
    } else {
      console.log(`  - Navigation not found, manual update required`);
    }
    
    // 3. Add components-loader.js script before </body>
    if (!content.includes('components-loader.js')) {
      content = content.replace(
        /(<script[\s\S]*?)(<\/body>)/,
        '$1<script src="assets/js/components-loader.js"></script>\n  $2'
      );
      console.log(`  - Component loader script added`);
    }
    
    // 4. Remove duplicate menu functions
    const menuFunctionRegex = /function toggleMenuDropdown\(\)\s*\{[\s\S]*?closeMenuDropdown\(\)\s*\{[\s\S]*?\}\s*\}/;
    if (content.match(menuFunctionRegex)) {
      content = content.replace(menuFunctionRegex, '// Menu functions moved to components-loader.js');
      console.log(`  - Duplicate menu functions removed`);
    }
    
    // 5. Fix relative paths in script tags
    const scriptRegex = /<script\s+src="(?!http|\/\/)([^"]+)"/g;
    let match;
    let scriptUpdated = false;
    let updatedContent = content;
    
    // Check if we need to adjust relative paths based on directory depth
    const depth = filePath.split(path.sep).length - ROOT_DIR.split(path.sep).length;
    if (depth > 1) {
      // The file is in a subdirectory, need to adjust paths
      const prefix = '../'.repeat(depth - 1);
      
      while ((match = scriptRegex.exec(content)) !== null) {
        if (!match[1].startsWith('assets/')) {
          continue;
        }
        
        const oldScriptPath = match[1];
        const newScriptPath = prefix + oldScriptPath;
        updatedContent = updatedContent.replace(
          `<script src="${oldScriptPath}"`,
          `<script src="${newScriptPath}"`
        );
        scriptUpdated = true;
      }
      
      if (scriptUpdated) {
        content = updatedContent;
        console.log(`  - Script paths adjusted for subdirectory`);
      }
    }
    
    // Write the updated content back to the file
    await writeFileAsync(filePath, content, 'utf8');
    console.log(`  - File updated successfully`);
    
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
}

// Main function
async function main() {
  try {
    console.log('Finding all HTML files...');
    const htmlFiles = await findHtmlFiles(ROOT_DIR);
    console.log(`Found ${htmlFiles.length} HTML files`);
    
    for (const file of htmlFiles) {
      await updateHtmlFile(file);
    }
    
    console.log('Update complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
