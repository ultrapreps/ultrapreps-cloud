'use client';
export const dynamic = 'force-dynamic';
import './globals.css';
import React from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import UltraLayout from '../components/layout/UltraLayout';
import MobileOptimizations from '../components/MobileOptimizations';
import SessionProvider from '../components/providers/SessionProvider';
import { WebSocketProvider } from '../lib/websocket/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  const roles = session?.user?.roles || [];
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="UltraPreps" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UltraPreps" />
        <meta name="description" content="Friday Night Lights in Your Pocket - Every Student Deserves a Stage" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1E3A8A" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1E3A8A" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* iOS Splash Screens */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Prevent iOS from auto-detecting phone numbers */}
        <meta name="format-detection" content="telephone=no" />
        
        <title>UltraPreps - Every Student Deserves a Stage</title>
      </head>
      <body className="bg-black text-white">
        <nav className="w-full bg-gray-900 py-4 px-8 flex gap-8 items-center shadow-xl z-50">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          {roles.includes('student') && <Link href="/student-dashboard">Student</Link>}
          {roles.includes('coach') && <Link href="/coach-dashboard">Coach</Link>}
          {roles.includes('parent') && <Link href="/parent-dashboard">Parent</Link>}
          {roles.includes('admin') && <Link href="/superintendent-dashboard">Admin</Link>}
          <Link href="/rivalrybot-dashboard" className="font-bold text-yellow-400">RivalryBot</Link>
          <Link href="/signalprime" className="font-bold text-pink-400">SignalPrime</Link>
          <Link href="/lifebook">Lifebook</Link>
          <Link href="/nil-marketplace">NIL</Link>
          <Link href="/media-kit">Media Kit</Link>
          <Link href="/event-mode">Event Mode</Link>
          <Link href="/grandpa-jim-demo">Demo</Link>
          <div className="flex gap-4 items-center ml-8">
            <span className="text-yellow-400 font-bold">Demo/Onboarding:</span>
            <Link href="/test-hud">HUD Demo</Link>
            <Link href="/test-school">School Demo</Link>
            <Link href="/test-mascot">Mascot Demo</Link>
            <Link href="/test-hype">HYPE Demo</Link>
            <Link href="/test-poster">Poster Demo</Link>
          </div>
        </nav>
        <SessionProvider>
          <WebSocketProvider>
            <ThemeProvider>
              <UltraLayout>
                {children}
              </UltraLayout>
              <MobileOptimizations />
            </ThemeProvider>
          </WebSocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
