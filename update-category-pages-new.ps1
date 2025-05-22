$sourceDirectory = "C:\Users\Zero\Desktop\employee1\hq-webapp\category"
$referenceFile = "$sourceDirectory\amazon-fresh.html"
$referenceContent = Get-Content -Path $referenceFile -Raw

# Get the reference content structure - we'll extract the CSS and body structure
$cssMatch = [regex]::Match($referenceContent, '(?s)<style>(.*?)</style>')
$referenceCSS = $cssMatch.Groups[1].Value

$bodyStructureMatch = [regex]::Match($referenceContent, '(?s)<body>\s*(.*?)\s*<script>')
$referenceBodyStructure = $bodyStructureMatch.Groups[1].Value

# Get all category files excluding the reference file
$files = Get-ChildItem -Path $sourceDirectory -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }

foreach ($file in $files) {
    $filePath = $file.FullName
    $content = Get-Content -Path $filePath -Raw
    
    # Extract the category name from the file name
    $categoryName = $file.BaseName
    
    # Format the display name
    $categoryDisplayName = $categoryName -replace "-", " " 
    $categoryDisplayName = $categoryDisplayName -replace "and", "&"
    
    # Special case for longer category names
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
    
    # Get the products variable name based on category name
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
    
    # Update the style section to match reference
    $content = [regex]::Replace($content, '(?s)<style>(.*?)</style>', "<style>$referenceCSS</style>")
    
    # Update body structure but retain the category-specific heading
    $updatedBodyStructure = $referenceBodyStructure -replace "Amazon Fresh", $categoryDisplayName
    
    # Prepare the correct body structure with the category name
    $content = [regex]::Replace($content, '(?s)<body>.*?<script>', "<body>$updatedBodyStructure`n  <script>")
    
    # Update the script section for product data
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
    
    $content = [regex]::Replace($content, $scriptPattern, $scriptReplacement)
    
    # Write updated content back to the file
    Set-Content -Path $filePath -Value $content
    
    Write-Host "Updated $($file.Name) with standardized layout and proper category name: $categoryDisplayName"
}

Write-Host "All category files have been successfully updated to match the amazon-fresh.html layout."
