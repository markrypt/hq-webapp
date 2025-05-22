$sourceDirectory = "C:\Users\Zero\Desktop\employee1\hq-webapp\category"
$files = Get-ChildItem -Path $sourceDirectory -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }

foreach ($file in $files) {
    $filePath = $file.FullName
    $content = Get-Content -Path $filePath -Raw
    
    # Extract the category name from the file name
    $categoryName = $file.BaseName
    $categoryDisplayName = $categoryName -replace "-", " " | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) }
    
    # Get the products variable name based on category
    $categoryVarName = if ($categoryName -match "-") {
        $parts = $categoryName -split "-"
        $result = $parts[0]
        for ($i = 1; $i -lt $parts.Count; $i++) {
            $result += $parts[$i].Substring(0, 1).ToUpper() + $parts[$i].Substring(1)
        }
        $result + "Products"
    } else {
        $categoryName + "Products"
    }
    
    # Update the main content structure
    $content = $content -replace '(?s)<div class="app-container">.*?<div id="navigation-placeholder"></div>\s*</div>\s*\n\s*<script>', @"
<div class="app-container">
    <div id="header-placeholder"></div>
    <div class="scrollable-content-area">
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
      </main>
    </div>
    <div id="navigation-placeholder"></div>
  </div>

  <script>
"@
    
    # Update the script section at the end
    $scriptPattern = '(?s)</script>\s*<script src="../assets/js/common\.js"></script>.*?</body>\s*</html>'
    $scriptReplacement = @"
</script>  <script src="../assets/js/common.js"></script>
  <!-- Load $categoryName-products.js which defines $categoryVarName -->
  <script src="../assets/js/$categoryName-products.js"></script>
  <script>
    // For the category page, explicitly set productsData to $categoryVarName
    window.productsData = window.$categoryVarName;
  </script>
  <script src="../assets/js/category-filter.js"></script>
  <script src="../assets/js/search.js"></script>
  <script src="../assets/js/components-loader.js"></script>
</body>
</html>
"@
    
    $content = $content -replace $scriptPattern, $scriptReplacement
    
    # Write updated content back to the file
    Set-Content -Path $filePath -Value $content
    
    Write-Host "Updated $($file.Name)"
}

Write-Host "All category files have been updated to match the amazon-fresh.html layout."
