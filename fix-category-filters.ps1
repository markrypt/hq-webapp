# Script to update all category pages to include filter functionality
$sourceDir = "C:\Users\Zero\Desktop\employee1\hq-webapp\category"

# Get the essential structure from amazon-fresh.html
$referenceFile = "$sourceDir\amazon-fresh.html"
$referenceContent = Get-Content -Path $referenceFile -Raw

# Get all category files except amazon-fresh.html
$categoryFiles = Get-ChildItem -Path $sourceDir -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }

foreach ($file in $categoryFiles) {
    $filePath = $file.FullName
    $fileName = $file.BaseName
    Write-Host "Processing $($file.Name)..."
    
    # Read the current file content
    $content = Get-Content -Path $filePath -Raw
    
    # Format the category name for display
    $categoryDisplayName = $fileName -replace "-", " "
    $categoryDisplayName = $categoryDisplayName -replace "and", "&"
    
    # Special cases for formatting
    switch ($categoryDisplayName) {
        "clothing shoes jewelry & watches" { $categoryDisplayName = "Clothing, Shoes, Jewelry & Watches" }
        "home garden & tools" { $categoryDisplayName = "Home, Garden & Tools" }
        "movies music & games" { $categoryDisplayName = "Movies, Music & Games" }
        "toys kids & baby" { $categoryDisplayName = "Toys, Kids & Baby" }
        "industrial & scientific" { $categoryDisplayName = "Industrial & Scientific" }
        "sports & outdoors" { $categoryDisplayName = "Sports & Outdoors" }
        default { $categoryDisplayName = (Get-Culture).TextInfo.ToTitleCase($categoryDisplayName) }
    }
    
    # Get the correct variable name for products data
    $productsVarName = if ($fileName -match "-") {
        $parts = $fileName -split "-"
        $result = $parts[0]
        for ($i = 1; $i -lt $parts.Count; $i++) {
            $result += $parts[$i].Substring(0,1).ToUpper() + $parts[$i].Substring(1)
        }
        $result + "Products"
    } else {
        $fileName + "Products"
    }
    
    # Ensure required scripts are present
    $requiredScripts = @(
        '<link rel="stylesheet" href="../assets/css/category-filter.css">',
        '<script src="../assets/js/common.js"></script>',
        '<script src="../assets/js/category-filter.js"></script>',
        '<script src="../assets/js/search.js"></script>',
        '<script src="../assets/js/components-loader.js"></script>'
    )
    
    # Check and add required scripts if missing
    foreach ($script in $requiredScripts) {
        if (-not ($content -match [regex]::Escape($script))) {
            if ($script.Contains('.css')) {
                # Add CSS link in head
                $content = $content -replace '</head>', "    $script`n</head>"
            } else {
                # Add JS before closing body
                $content = $content -replace '</body>', "    $script`n</body>"
            }
            Write-Host "  - Added missing script/stylesheet: $script"
        }
    }
    
    # Update the category layout structure if needed
    $categoryLayout = @"
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
    
    # Update the main structure if needed
    if (-not ($content -match 'class="category-layout"')) {
        $content = $content -replace '<main class="product-main-content">[^<]*', "<main class="product-main-content">`n$categoryLayout"
        Write-Host "  - Updated category layout structure"
    }
    
    # Update products data script if needed
    $productsScript = @"
  <script>
    // For the category page, explicitly set productsData to $productsVarName
    window.productsData = window.$productsVarName;
  </script>
"@
    
    if (-not ($content -match 'window\.productsData =')) {
        $content = $content -replace '<script src="../assets/js/category-filter.js">', "$productsScript`n  <script src="../assets/js/category-filter.js">"
        Write-Host "  - Added products data initialization"
    }
    
    # Save the updated content
    Set-Content -Path $filePath -Value $content -NoNewline
    Write-Host "✓ Successfully updated $($file.Name)"
    Write-Host ""
}

Write-Host "All category pages have been updated with filter functionality."
