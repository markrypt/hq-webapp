# This script requires the WebP executable (libwebp) to be installed
# You can download it from: https://developers.google.com/speed/webp/download

$images = @(
    "assets/mainpage/microsoft365.jpg",
    "assets/mainpage/microsoft365page/Microsoft 365 Personal.jpg",
    "assets/mainpage/microsoft365page/Office Home 2024.jpg",
    "assets/mainpage/microsoft365page/Microsoft 365 Family.jpg",
    "assets/mainpage/microsoft365page/Microsoft 365 Business Standard.jpg",
    "assets/mainpage/logo/logo.png"
)

foreach ($image in $images) {
    $output = $image -replace "\.(jpg|jpeg|png)$", ".webp"
    Write-Host "Converting $image to $output"
    cwebp -q 80 $image -o $output
}
