$sourceDirectory = "C:\Users\Zero\Desktop\employee1\hq-webapp\category"
$files = Get-ChildItem -Path $sourceDirectory -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }

$categoryNameMap = @{
    "automotive" = "Automotive"
    "beauty-and-health" = "Beauty & Health"
    "books" = "Books"
    "clothing-shoes-jewelry-and-watches" = "Clothing, Shoes, Jewelry & Watches"
    "computers" = "Computers"
    "electronics" = "Electronics"
    "food-and-grocery" = "Food & Grocery"
    "handmade" = "Handmade"
    "home-garden-and-tools" = "Home, Garden & Tools"
    "household-essentials" = "Household Essentials"
    "industrial-and-scientific" = "Industrial & Scientific"
    "movies-music-and-games" = "Movies, Music & Games"
    "pet-supplies" = "Pet Supplies"
    "smart-home" = "Smart Home"
    "sports-and-outdoors" = "Sports & Outdoors"
    "toys-kids-and-baby" = "Toys, Kids & Baby"
    "whole-foods-market" = "Whole Foods Market"
}

foreach ($file in $files) {
    $filePath = $file.FullName
    $content = Get-Content -Path $filePath -Raw
    
    # Extract the category name from the file name
    $categoryName = $file.BaseName
    
    # Get the displayname from the map
    $categoryDisplayName = $categoryNameMap[$categoryName]
    if (-not $categoryDisplayName) {
        $categoryDisplayName = $categoryName -replace "-", " " | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) }
    }
    
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
    
    # Update the category header
    $content = $content -replace '(?s)<div class="category-header">.*?</div>', @"
<div class="category-header">
          <h1>$categoryDisplayName</h1>
          <p>Explore products in $categoryDisplayName. Filter by category, subcategory, seller, or color to find exactly what you're looking for.</p>
        </div>
"@
    
    # Write updated content back to the file
    Set-Content -Path $filePath -Value $content
    
    Write-Host "Updated title for $($file.Name) to '$categoryDisplayName'"
}

Write-Host "All category titles have been updated with proper formatting."
