@echo off
echo Updating category page styles...

set "category_dir=C:\Users\Zero\Desktop\employee1\hq-webapp\category"

echo Processing files:
for %%f in ("%category_dir%\*.html") do (
    if not "%%~nxf"=="amazon-fresh.html" (
        if not "%%~nxf"=="automotive.html" (
            if not "%%~nxf"=="beauty-and-health.html" (
                if not "%%~nxf"=="books.html" (
                    if not "%%~nxf"=="clothing-shoes-jewelry-and-watches.html" (
                        if not "%%~nxf"=="computers.html" (
                            echo - %%~nxf
                            powershell -Command "$content = Get-Content '%%f' -Raw; $content = $content -replace '\.scrollable-content-area\s*{\s*position:\s*absolute;\s*top:\s*64px;\s*bottom:\s*60px;\s*left:\s*0;\s*right:\s*0;\s*overflow-y:\s*auto;\s*background:\s*var\(--primary-bg\);\s*padding:\s*1\.5rem;[^}]*', '.scrollable-content-area { position: absolute; top: 64px; bottom: 60px; left: 0; right: 0; overflow-y: auto; background: var(--primary-bg); padding: 1.5rem 0; /* Removed horizontal padding */'; $content = $content -replace '\.product-main-content\s*{\s*max-width:[^}]*', '.product-main-content { width: 100%%; /* Use full available width within parent''s padding */'; Set-Content '%%f' -Value $content"
                        )
                    )
                )
            )
        )
    )
)

echo All remaining category pages have been updated.
pause
