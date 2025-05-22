$sourceDir = "C:\Users\Zero\Desktop\employee1\hq-webapp\category"
$referenceFile = "$sourceDir\amazon-fresh.html"

# Get the reference content
$referenceContent = Get-Content -Path $referenceFile -Raw

# Extract the style content from reference file
if ($referenceContent -match '(?s)<style>(.*?)</style>') {
    $referenceStyle = $matches[1]
    Write-Host "Reference style extracted successfully."
} else {
    Write-Host "Error: Could not extract style from reference file."
    exit
}

# Get all category files except the reference file
$categoryFiles = Get-ChildItem -Path $sourceDir -Filter "*.html" | Where-Object { $_.Name -ne "amazon-fresh.html" }
Write-Host "Found $($categoryFiles.Count) category files to update."

foreach ($file in $categoryFiles) {
    $filePath = $file.FullName
    $fileName = $file.Name
    
    Write-Host "Processing $fileName..."
    
    # Get the content of the current file
    $content = Get-Content -Path $filePath -Raw
    
    # Update the style section
    $updatedContent = $content -replace '(?s)<style>.*?</style>', "<style>$referenceStyle</style>"
    
    # Save the updated content
    Set-Content -Path $filePath -Value $updatedContent
    
    Write-Host "✓ Updated $fileName"
}

Write-Host "All category files have been updated with the reference style."
