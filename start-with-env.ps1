# Set required environment variables for NextAuth
$env:NEXTAUTH_URL = "http://localhost:3000"
$env:NEXTAUTH_SECRET = "development-secret-key-change-in-production"
$env:NEXT_PUBLIC_WEBSOCKET_URL = "http://localhost:3001"

Write-Host "✅ Environment variables set:" -ForegroundColor Green
Write-Host "   NEXTAUTH_URL=$env:NEXTAUTH_URL"
Write-Host "   NEXTAUTH_SECRET=***"
Write-Host "   NEXT_PUBLIC_WEBSOCKET_URL=$env:NEXT_PUBLIC_WEBSOCKET_URL"
Write-Host ""

# Run the dev servers
Write-Host "🚀 Starting UltraPreps..." -ForegroundColor Yellow
npm run dev:all