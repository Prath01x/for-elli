@echo off
echo ========================================
echo   PUSHING FOR-ELLI TO GITHUB
echo ========================================
echo.

echo Step 1: Initializing git repository...
call git init

echo.
echo Step 2: Adding all files...
call git add .

echo.
echo Step 3: Committing changes...
call git commit -m "Initial commit - For elli ^✨^💙"

echo.
echo Step 4: Setting main branch...
call git branch -M main

echo.
echo Step 5: Adding GitHub remote...
call git remote add origin https://github.com/Prath01x/for-elli.git

echo.
echo Step 6: Pushing to GitHub...
call git push -u origin main

echo.
echo ========================================
echo   PUSH COMPLETE! ^!
echo ========================================
echo.
echo NEXT: Enable GitHub Pages
echo 1. Go to: https://github.com/Prath01x/for-elli/settings/pages
echo 2. Under "Source", select "main" branch
echo 3. Click "Save"
echo 4. Wait 1-2 minutes
echo 5. Your link will be: https://prath01x.github.io/for-elli
echo.
echo Then share that link with elli ^! ^! ^!
echo ========================================
echo.
pause