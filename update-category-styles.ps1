Write-Host "Starting category page updates..."

$sourceDirectory = "C:\Users\Zero\Desktop\employee1\hq-webapp\category"
$amazonFreshFile = "$sourceDirectory\amazon-fresh.html"
$amazonFreshContent = Get-Content -Path $amazonFreshFile -Raw

# Extract the reference CSS from amazon-fresh.html
if ($amazonFreshContent -match '(?s)<style>(.*?)</style>') {
    $referenceCSS = $matches[1]
    Write-Host "Successfully extracted reference CSS"
} else {
    Write-Host "Error: Could not extract reference CSS"
    exit
}

# Get all category pages except amazon-fresh.html
$categoryFiles = Get-ChildItem -Path $sourceDirectory -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }
Write-Host "Found $($categoryFiles.Count) category pages to update"

# Process each file
foreach ($file in $categoryFiles) {
    $filePath = $file.FullName
    $fileName = $file.Name
    Write-Host "Processing $fileName..."
    
    # Read file content
    $content = Get-Content -Path $filePath -Raw
    
    # Replace the style section
    if ($content -match '(?s)<style>(.*?)</style>') {
        $content = $content -replace '(?s)<style>.*?</style>', "<style>$referenceCSS</style>"
        Write-Host "- Updated CSS styles"
    } else {
        Write-Host "- Warning: Could not find style section in $fileName"
    }
    
    # Update scrollable-content-area padding
    if ($content -match '\.scrollable-content-area\s*{[^}]*padding:[^;]*;') {
        $content = $content -replace '(\.scrollable-content-area\s*{[^}]*padding:)[^;]*;', '$1 1.5rem 0; /* Removed horizontal padding */'
        Write-Host "- Updated scrollable-content-area padding"
    } else {
        Write-Host "- Warning: Could not find scrollable-content-area in $fileName"
    }
    
    # Update product-main-content width
    if ($content -match '\.product-main-content\s*{[^}]*') {
        $content = $content -replace '(\.product-main-content\s*{[^}]*)max-width:[^;]*;', '$1width: 100%; /* Use full available width within parent\'s padding */'
        Write-Host "- Updated product-main-content width"
    } else {
        Write-Host "- Warning: Could not find product-main-content in $fileName"
    }
    
    # Save updated content
    Set-Content -Path $filePath -Value $content
    Write-Host "✓ Successfully updated $fileName"
}

Write-Host "All category pages have been updated to match the amazon-fresh.html layout."
