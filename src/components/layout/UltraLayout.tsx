'use client';

import React from 'react';
import UltraNavigation from '../navigation/UltraNavigation';

interface UltraLayoutProps {
  children: React.ReactNode;
}

export default function UltraLayout({ children }: UltraLayoutProps) {

  return (
    <>
      <UltraNavigation />
      
      {/* Main Content with Navigation Offset */}
      <main className="min-h-screen">
        <div className="lg:pt-16 pt-14 pb-16 lg:pb-0">
          {children}
        </div>
      </main>

      {/* Progressive Web App Install Prompt */}
      <div id="pwa-install-container" />
    </>
  );
}