'use client';

import React from 'react';
import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function SimpleNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#F59E0B]/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Icon */}
          <Link href="/" className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-xl font-black tracking-tight text-white">ULTRAPREPS</span>
          </Link>

          {/* Simple Create Button */}
          <Link
            href="/stadium/create"
            className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-[#F59E0B] to-[#F97316]
              hover:from-[#F59E0B]/90 hover:to-[#F97316]/90
              transition-all duration-200 font-bold text-black"
          >
            <span>Create Stadium</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}