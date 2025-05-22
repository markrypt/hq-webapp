# Update all category pages to match amazon-fresh.html
$sourceDir = "c:\Users\Zero\Desktop\employee1\hq-webapp\category"
$referenceFile = "$sourceDir\amazon-fresh.html"

# Read the reference file
$referenceContent = Get-Content -Path $referenceFile -Raw

# Extract the important style properties from the reference
$referenceScrollableContentArea = ".scrollable-content-area {
      position: absolute;
      top: 64px; /* Height of header */
      bottom: 60px; /* Height of navbar */
      left: 0;
      right: 0;
      overflow-y: auto;
      background: var(--primary-bg);
      padding: 1.5rem 0; /* Removed horizontal padding */
    }"

$referenceProductMainContent = ".product-main-content {
        width: 100%; /* Use full available width within parent's padding */
        margin: 0 auto;
    }"

# Get all HTML files in the category directory except amazon-fresh.html
$categoryFiles = Get-ChildItem -Path $sourceDir -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }

# Process each file
foreach ($file in $categoryFiles) {
    $filePath = $file.FullName
    $fileName = $file.Name
    $content = Get-Content -Path $filePath -Raw
    $categoryName = $file.BaseName
    
    Write-Host "Processing $fileName..."
    
    # Format category name for display
    $categoryDisplayName = $categoryName -replace "-", " "
    $categoryDisplayName = $categoryDisplayName -replace "and", "&"
    
    # Special cases for formatting
    if ($categoryDisplayName -eq "clothing shoes jewelry & watches") {
        $categoryDisplayName = "Clothing, Shoes, Jewelry & Watches"
    } elseif ($categoryDisplayName -eq "home garden & tools") {
        $categoryDisplayName = "Home, Garden & Tools"
    } elseif ($categoryDisplayName -eq "movies music & games") {
        $categoryDisplayName = "Movies, Music & Games"
    } elseif ($categoryDisplayName -eq "toys kids & baby") {
        $categoryDisplayName = "Toys, Kids & Baby"
    } elseif ($categoryDisplayName -eq "industrial & scientific") {
        $categoryDisplayName = "Industrial & Scientific"
    } elseif ($categoryDisplayName -eq "sports & outdoors") {
        $categoryDisplayName = "Sports & Outdoors"
    } else {
        # Format title case for other categories
        $categoryDisplayName = (Get-Culture).TextInfo.ToTitleCase($categoryDisplayName)
    }
    
    # Update the scrollable-content-area CSS
    $scrollablePattern = '\.scrollable-content-area\s*{[^}]*}'
    if ($content -match $scrollablePattern) {
        $content = $content -replace $scrollablePattern, $referenceScrollableContentArea
        Write-Host "  - Updated scrollable-content-area CSS"
    }
    
    # Update the product-main-content CSS
    $productMainPattern = '\.product-main-content\s*{[^}]*}'
    if ($content -match $productMainPattern) {
        $content = $content -replace $productMainPattern, $referenceProductMainContent
        Write-Host "  - Updated product-main-content CSS"
    }
    
    # Update the category title in the header
    $headerPattern = '<div class="category-header">\s*<h1>[^<]*</h1>\s*<p>[^<]*</p>\s*</div>'
    $headerReplacement = @"
<div class="category-header">
          <h1>$categoryDisplayName</h1>
          <p>Explore products in $categoryDisplayName. Filter by category, subcategory, seller, or color to find exactly what you're looking for.</p>
        </div>
"@
    
    if ($content -match $headerPattern) {
        $content = $content -replace $headerPattern, $headerReplacement
        Write-Host "  - Updated category header title and description"
    }
    
    # Get the correct product variable name
    $varName = if ($categoryName -match "-") {
        $parts = $categoryName -split "-"
        $result = $parts[0]
        for ($i = 1; $i -lt $parts.Count; $i++) {
            $result += $parts[$i].Substring(0, 1).ToUpper() + $parts[$i].Substring(1)
        }
        $result + "Products"
    } else {
        $categoryName + "Products"
    }
    
    # Update the product data script
    $scriptPattern = '<!-- Load.*?which defines.*?-->\s*<script src="../assets/js/.*?-products\.js"></script>\s*<script>\s*//.*?\s*window\.productsData = window\..*?;\s*</script>'
    $scriptReplacement = @"
<!-- Load $categoryName-products.js which defines $varName -->
  <script src="../assets/js/$categoryName-products.js"></script>
  <script>
    // For the category page, explicitly set productsData to $varName
    window.productsData = window.$varName;
  </script>
"@
    
    if ($content -match $scriptPattern) {
        $content = $content -replace $scriptPattern, $scriptReplacement
        Write-Host "  - Updated product data script"
    }
    
    # Ensure the category sidebar and content area exist
    $layoutPattern = '<div class="category-layout">\s*<aside class="category-sidebar">\s*<!--.*?-->\s*</aside>\s*<div class="category-content">\s*<!--.*?-->\s*</div>\s*</div>'
    $layoutReplacement = @"
<div class="category-layout">
          <aside class="category-sidebar">
            <!-- Filter container will be inserted here -->
          </aside>
          <div class="category-content">
            <!-- Product grid will be inserted here -->
          </div>
        </div>
"@
    
    if (-not ($content -match $layoutPattern)) {
        # If category layout doesn't exist properly, update it
        $mainPattern = '<main class="product-main-content">\s*<div class="category-header">.*?</div>'
        $mainReplacement = @"
<main class="product-main-content">
        <div class="category-header">
          <h1>$categoryDisplayName</h1>
          <p>Explore products in $categoryDisplayName. Filter by category, subcategory, seller, or color to find exactly what you're looking for.</p>
        </div>
        <div class="category-layout">
          <aside class="category-sidebar">
            <!-- Filter container will be inserted here -->
          </aside>
          <div class="category-content">
            <!-- Product grid will be inserted here -->
          </div>
        </div>
"@
        
        $content = $content -replace $mainPattern, $mainReplacement
        Write-Host "  - Added missing category layout structure"
    }
    
    # Ensure required scripts are present
    $requiredScripts = @(
        '<script src="../assets/js/common.js"></script>',
        '<script src="../assets/js/category-filter.js"></script>',
        '<script src="../assets/js/search.js"></script>',
        '<script src="../assets/js/components-loader.js"></script>'
    )
    
    foreach ($script in $requiredScripts) {
        if (-not ($content -match [regex]::Escape($script))) {
            # Add missing script before the closing body tag
            $content = $content -replace '</body>', "$script`n</body>"
            Write-Host "  - Added missing script: $script"
        }
    }
    
    # Save the updated content
    Set-Content -Path $filePath -Value $content
    Write-Host "✓ Updated $fileName successfully"
    Write-Host ""
}

Write-Host "All category pages have been updated to match the amazon-fresh.html layout."
