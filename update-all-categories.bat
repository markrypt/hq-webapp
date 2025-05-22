@echo off
echo Updating all category pages to match amazon-fresh.html layout...
echo.

set "category_dir=C:\Users\Zero\Desktop\employee1\hq-webapp\category"
set "reference_file=%category_dir%\amazon-fresh.html"

for %%f in ("%category_dir%\*.html") do (
    if not "%%~nxf"=="amazon-fresh.html" (
        echo Processing %%~nxf...
        powershell -Command "(Get-Content '%reference_file%' -Raw) -match '(?s)<style>(.*?)</style>' | Out-Null; $style = $matches[1]; (Get-Content '%%f' -Raw) -replace '(?s)<style>.*?</style>', \"<style>$style</style>\" | Set-Content '%%f'"
        echo - Updated CSS styles
        
        powershell -Command "(Get-Content '%%f' -Raw) -replace '(\.scrollable-content-area\s*{[^}]*padding:)[^;]*;', '$1 1.5rem 0; /* Removed horizontal padding */' | Set-Content '%%f'"
        echo - Updated scrollable-content-area padding
        
        powershell -Command "(Get-Content '%%f' -Raw) -replace '(\.product-main-content\s*{[^}]*)max-width:[^;]*;', '$1width: 100%%; /* Use full available width within parent''s padding */' | Set-Content '%%f'"
        echo - Updated product-main-content width
        
        echo ✓ Successfully updated %%~nxf
        echo.
    )
)

echo All category pages have been updated to match the amazon-fresh.html layout.
pause
