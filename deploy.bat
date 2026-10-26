@echo off
echo.
echo ========================================
echo   DEPLOYMENT SCRIPT FOR FOR-ELLI
echo ========================================
echo.

echo Step 1: Installing deployment tools...
call npm install --save-dev gh-pages

echo.
echo Step 2: Building the app for production...
call npm run build

echo.
echo ========================================
echo   BUILD COMPLETE! ✅
echo ========================================
echo.
echo The app is now ready in the "build" folder.
echo.
echo ========================================
echo   NEXT STEPS TO SHARE WITH ELLI:
echo ========================================
echo.
echo   OPTION 1 (EASIEST - Netlify):
echo   1. Go to: https://app.netlify.com/drop
echo   2. Drag the "build" folder onto that page
echo   3. Wait 30 seconds
echo   4. Copy the link and send to elli!
echo.
echo   OPTION 2 (GitHub Pages):
echo   1. Go to: https://github.com/new
echo   2. Create repo named "for-elli"
echo   3. Upload the "build" folder contents
echo   4. Enable Pages in Settings
echo   5. Share the link: yourusername.github.io/for-elli
echo.
echo   elli can open it ANYWHERE - no account needed!
echo ========================================
echo.
pause