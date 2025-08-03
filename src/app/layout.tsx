export const dynamic = 'force-dynamic';

import './globals.css';
import React from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import UltraLayout from '../components/layout/UltraLayout';
import MobileOptimizations from '../components/MobileOptimizations';
import SessionProvider from '../components/providers/SessionProvider';
import { WebSocketProvider } from '../lib/websocket/client';
// Removed unused useSession import
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Move useSession inside SessionProvider - can't call it here
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="UltraPreps - Complete High School Athletic Experience Platform" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        
        <title>UltraPreps - Every Student Deserves a Stage</title>
      </head>
      <body className="bg-black text-white">
        <nav className="w-full bg-gray-900 py-4 px-8 flex gap-8 items-center shadow-xl z-50">
          <Link href="/" className="font-bold text-white hover:text-[#F59E0B] transition-colors">
            UltraPreps
          </Link>
          <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/student-dashboard" className="text-white/80 hover:text-white transition-colors">
            Student
          </Link>
          <Link href="/coach-dashboard" className="text-white/80 hover:text-white transition-colors">
            Coach
          </Link>
          <Link href="/parent-dashboard" className="text-white/80 hover:text-white transition-colors">
            Family
          </Link>
          <Link href="/superintendent-dashboard" className="text-white/80 hover:text-white transition-colors">
            District
          </Link>
          <Link href="/community" className="text-white/80 hover:text-white transition-colors">
            Community
          </Link>
          <Link href="/nil-marketplace" className="text-white/80 hover:text-white transition-colors">
            NIL
          </Link>
          <Link href="/recruiting" className="text-white/80 hover:text-white transition-colors">
            Recruiting
          </Link>
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