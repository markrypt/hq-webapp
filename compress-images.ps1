<#
.SYNOPSIS
  PowerShell script to compress and optimize images in the website assets folder.
.DESCRIPTION
  This script uses ImageMagick to optimize JPEG and PNG images, reducing their file size
  while maintaining acceptable quality. This improves website loading speed.
#>

# Ensure ImageMagick is installed
function Test-ImageMagick {
    $magick = Get-Command magick -ErrorAction SilentlyContinue
    if (-not $magick) {
        Write-Host "ImageMagick is not installed. Installing via Chocolatey..." -ForegroundColor Yellow
        
        # Check if Chocolatey is installed
        $choco = Get-Command choco -ErrorAction SilentlyContinue
        if (-not $choco) {
            Write-Host "Chocolatey is required to install ImageMagick. Installing Chocolatey..." -ForegroundColor Yellow
            
            # Install Chocolatey
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
            
            # Refresh environment variables
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        }
        
        # Install ImageMagick
        choco install imagemagick -y
        
        # Refresh environment variables
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        # Verify installation
        $magick = Get-Command magick -ErrorAction SilentlyContinue
        if (-not $magick) {
            Write-Host "Failed to install ImageMagick. Please install it manually and run this script again." -ForegroundColor Red
            exit 1
        }
    }
    
    Write-Host "ImageMagick is installed and ready." -ForegroundColor Green
}

# Create backup directory
function New-BackupDirectory {
    param (
        [string]$BackupFolder
    )
    
    if (-not (Test-Path $BackupFolder)) {
        New-Item -ItemType Directory -Path $BackupFolder -Force | Out-Null
        Write-Host "Created backup directory: $BackupFolder" -ForegroundColor Green
    }
}

# Optimize images in the specified directory
function Optimize-Images {
    param (
        [string]$Directory,
        [string]$BackupFolder,
        [int]$Quality = 85,
        [switch]$Recursive
    )
    
    # Get all JPEG and PNG images
    $searchOption = if ($Recursive) { "Recurse" } else { "File" }
    $images = Get-ChildItem -Path $Directory -Include "*.jpg","*.jpeg","*.png" -$searchOption
    
    $totalImages = $images.Count
    $processed = 0
    $totalSaved = 0
    
    foreach ($image in $images) {
        $processed++
        $originalSize = $image.Length
        $backupPath = Join-Path $BackupFolder $image.Name
        
        # Create backup
        Copy-Item -Path $image.FullName -Destination $backupPath -Force
        
        Write-Progress -Activity "Optimizing Images" -Status "$processed of $totalImages" -PercentComplete (($processed / $totalImages) * 100)
        
        if ($image.Extension -match "\.(jpg|jpeg)$") {
            # Optimize JPEG
            magick convert $image.FullName -strip -interlace Plane -gaussian-blur 0.05 -quality $Quality $image.FullName
        } else {
            # Optimize PNG
            magick convert $image.FullName -strip -quality $Quality $image.FullName
        }
        
        # Calculate space saved
        $newSize = (Get-Item $image.FullName).Length
        $saved = $originalSize - $newSize
        $totalSaved += $saved
        $percentSaved = [math]::Round(($saved / $originalSize) * 100, 1)
        
        Write-Host "Optimized: $($image.Name) - Reduced by $percentSaved% ($([math]::Round($saved / 1KB, 2)) KB)" -ForegroundColor Cyan
    }
    
    Write-Host "`nOptimization Complete!" -ForegroundColor Green
    Write-Host "Processed $totalImages images" -ForegroundColor Green
    Write-Host "Total space saved: $([math]::Round($totalSaved / 1MB, 2)) MB" -ForegroundColor Green
}

# Main script execution
try {
    Clear-Host
    Write-Host "===== Image Optimization Tool for Markrypt Website =====" -ForegroundColor Cyan
    
    # Check for ImageMagick
    Test-ImageMagick
    
    # Define paths
    $baseDir = $PSScriptRoot
    $heroImagesDir = Join-Path $baseDir "assets\hero"
    $productsImagesDir = Join-Path $baseDir "assets\products"
    $backupFolder = Join-Path $baseDir "assets\image-backups"
    
    # Create backup directory
    New-BackupDirectory -BackupFolder $backupFolder
    
    # Ask user which folders to optimize
    Write-Host "`nWhich image folders would you like to optimize?" -ForegroundColor Yellow
    Write-Host "1. Hero images (blog cards)"
    Write-Host "2. Product images"
    Write-Host "3. All images"
    Write-Host "4. Exit"
    
    $choice = Read-Host "Enter your choice (1-4)"
    
    switch ($choice) {
        "1" {
            Write-Host "`nOptimizing hero images..." -ForegroundColor Cyan
            Optimize-Images -Directory $heroImagesDir -BackupFolder $backupFolder
        }
        "2" {
            Write-Host "`nOptimizing product images..." -ForegroundColor Cyan
            Optimize-Images -Directory $productsImagesDir -BackupFolder $backupFolder
        }
        "3" {
            Write-Host "`nOptimizing all images..." -ForegroundColor Cyan
            Optimize-Images -Directory (Join-Path $baseDir "assets") -BackupFolder $backupFolder -Recursive
        }
        "4" {
            Write-Host "Exiting..." -ForegroundColor Yellow
            exit 0
        }
        default {
            Write-Host "Invalid choice. Exiting." -ForegroundColor Red
            exit 1
        }
    }
    
    Write-Host "`nImages have been optimized. Backups of original images are stored in: $backupFolder" -ForegroundColor Green
    Write-Host "If you notice any issues with the optimized images, you can restore them from the backup." -ForegroundColor Yellow
    
} catch {
    Write-Host "An error occurred: $_" -ForegroundColor Red
}
