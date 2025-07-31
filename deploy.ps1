# UltraPreps Fresh Clean Deployment Script
Write-Host "🚀 DEPLOYING BILLION-DOLLAR HOMEPAGE - CLEAN SLATE" -ForegroundColor Cyan

# Build the application
Write-Host "Building application..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Deploy to Vercel
    Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
        Write-Host "🏟️ THE BILLION-DOLLAR STADIUM IS LIVE!" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Deployment failed" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
}