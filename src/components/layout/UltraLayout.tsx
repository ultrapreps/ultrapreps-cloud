'use client';

import React from 'react';
import SimpleNavigation from '../navigation/SimpleNavigation';

interface UltraLayoutProps {
  children: React.ReactNode;
}

export default function UltraLayout({ children }: UltraLayoutProps) {

  return (
    <>
      <SimpleNavigation />
      
      {/* Main Content with Navigation Offset */}
      <main className="min-h-screen">
        <div className="pt-16">
          {children}
        </div>
      </main>

      {/* Progressive Web App Install Prompt */}
      <div id="pwa-install-container" />
    </>
  );
}