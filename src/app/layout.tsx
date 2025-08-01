'use client';
import './globals.css';
import React from 'react';
// Placeholder for DNA theme engine
import { ThemeProvider } from '../components/ThemeProvider';
import UltraLayout from '../components/layout/UltraLayout';
import MobileOptimizations from '../components/MobileOptimizations';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000000' }}>
        <ThemeProvider>
          <UltraLayout>
            {children}
          </UltraLayout>
          <MobileOptimizations />
        </ThemeProvider>
      </body>
    </html>
  );
}
