Write-Host "🚀 Starting UltraPreps Services..." -ForegroundColor Cyan
Write-Host ""

# Kill any existing processes on our ports
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
$existingSocket = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($existingSocket) {
    Get-Process -Id $existingSocket.OwningProcess | Stop-Process -Force
    Write-Host "✓ Killed process on port 3001" -ForegroundColor Green
}

$existingNext = Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue  
if ($existingNext) {
    Get-Process -Id $existingNext.OwningProcess | Stop-Process -Force
    Write-Host "✓ Killed process on port 3002" -ForegroundColor Green
}

# Clean Next.js cache
if (Test-Path .next) {
    Remove-Item -Path .next -Recurse -Force
    Write-Host "✓ Cleared Next.js cache" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Yellow
Write-Host ""

# Start both services
Write-Host "📱 Next.js will run on: http://localhost:3002" -ForegroundColor Cyan
Write-Host "🔌 WebSocket will run on: ws://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Please wait 30-60 seconds for initial build..." -ForegroundColor Yellow
Write-Host ""

# Run the concurrent command
npm run dev:all