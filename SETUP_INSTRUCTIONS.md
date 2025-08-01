# UltraPreps Setup Instructions

## Environment Variables Required

Create a `.env` or `.env.local` file in the root directory with these required variables:

```env
# NextAuth Configuration (REQUIRED to prevent redirect loops)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-change-in-production

# WebSocket Configuration  
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:3001

# Database URL (optional for now)
DATABASE_URL=postgresql://user:password@localhost:5432/ultrapreps
```

## Running the Application

### Option 1: Use the startup script (Windows PowerShell)
```bash
./start-with-env.ps1
```

### Option 2: Set environment variables manually then run
```bash
# Set environment variables first
$env:NEXTAUTH_URL="http://localhost:3000"
$env:NEXTAUTH_SECRET="development-secret-key-change-in-production"

# Then run both services
npm run dev:all
```

### Option 3: Run services separately
Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
npm run dev:socket
```

## Testing the HUD Engine

Once running, visit: http://localhost:3000/test-hud

This page demonstrates:
- HUD overlay on HeroCards
- Real-time updates (currently mocked due to auth issues)
- Role-based views
- HYPE animations

## Troubleshooting

If you get NextAuth redirect errors:
1. Make sure environment variables are set
2. Clear browser cookies/cache
3. Try incognito/private browsing mode

## Current Status

- ✅ HUD Engine implemented
- ✅ WebSocket server ready
- ✅ HUD API endpoints created
- ⚠️ WebSocket temporarily disabled in test page due to auth configuration
- ⚠️ Need proper .env file with NextAuth secrets

Once environment variables are properly configured, uncomment the WebSocket code in:
- src/app/test-hud/page.tsx
- src/components/HeroCardHUD.tsx