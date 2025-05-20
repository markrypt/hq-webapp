# Component Update Script for PowerShell
# This script updates all HTML files in the workspace to use the component system

Write-Host "Component Update Script - Starting" -ForegroundColor Cyan

# Root directory
$rootDir = "C:\Users\Zero\Desktop\employee1\hq-webapp"

# Function to update a single HTML file
function Update-HtmlFile {
    param (
        [string]$filePath
    )
    
    Write-Host "Processing: $filePath" -ForegroundColor Yellow
    
    # Read file content
    $content = Get-Content -Path $filePath -Raw -Encoding UTF8
    
    # Skip files that already have the component placeholders
    if ($content -match 'id="header-placeholder"' -and 
        $content -match 'id="navigation-placeholder"' -and
        $content -match 'components-loader.js') {
        Write-Host "  - Already updated, skipping" -ForegroundColor Gray
        return
    }
    
    # Get directory depth for relative paths
    $relativePath = $filePath.Replace($rootDir, "").Trim("\")
    $depth = ($relativePath.Split("\")).Count - 1
    $pathPrefix = if ($depth -gt 0) { "../" * $depth } else { "" }
    
    Write-Host "  - Directory depth: $depth, Path prefix: $pathPrefix" -ForegroundColor Gray
    
    # 1. Replace header
    if ($content -match '<header\s+class="header"[\s\S]*?<\/header>') {
        $content = $content -replace '<header\s+class="header"[\s\S]*?<\/header>', '<div id="header-placeholder"></div>'
        Write-Host "  - Header replaced" -ForegroundColor Green
    } else {
        Write-Host "  - Header not found, skipping header replacement" -ForegroundColor Red
    }
    
    # 2. Replace navigation
    if ($content -match '<nav\s+class="navigation"[\s\S]*?<\/nav>') {
        $content = $content -replace '<nav\s+class="navigation"[\s\S]*?<\/nav>', '<div id="navigation-placeholder"></div>'
        Write-Host "  - Navigation replaced" -ForegroundColor Green
    } else {
        Write-Host "  - Navigation not found, skipping navigation replacement" -ForegroundColor Red
    }
    
    # 3. Add components-loader.js script before </body>
    if (-not ($content -match 'components-loader\.js')) {
        $loaderPath = $pathPrefix + "assets/js/components-loader.js"
        $content = $content -replace '(<script[\s\S]*?)(<\/body>)', "`$1<script src=""$loaderPath""></script>`r`n`$2"
        Write-Host "  - Component loader script added" -ForegroundColor Green
    }
    
    # 4. Remove duplicate menu functions
    if ($content -match 'function toggleMenuDropdown\(\)\s*\{[\s\S]*?closeMenuDropdown\(\)\s*\{[\s\S]*?\}\s*\}') {
        $content = $content -replace 'function toggleMenuDropdown\(\)\s*\{[\s\S]*?closeMenuDropdown\(\)\s*\{[\s\S]*?\}\s*\}', '// Menu functions moved to components-loader.js'
        Write-Host "  - Duplicate menu functions removed" -ForegroundColor Green
    }
    
    # Write the updated content back to the file
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Host "  - File updated successfully" -ForegroundColor Green
}

# Get all HTML files in the workspace
Write-Host "Finding all HTML files..." -ForegroundColor Cyan
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse

Write-Host "Found $($htmlFiles.Count) HTML files" -ForegroundColor Cyan

# Update each file
foreach ($file in $htmlFiles) {
    Update-HtmlFile -filePath $file.FullName
}

Write-Host "Component Update Script - Complete" -ForegroundColor Cyan
