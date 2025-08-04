'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ClientNavigation() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];

  return (
    <nav className="w-full bg-gray-900 py-4 px-8 flex gap-8 items-center shadow-xl z-50">
      <Link href="/" className="font-bold text-white hover:text-[#F59E0B] transition-colors">
        UltraPreps
      </Link>
      <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">
        Dashboard
      </Link>
      {roles.includes('student') && (
        <Link href="/student-dashboard" className="text-white/80 hover:text-white transition-colors">
          Student
        </Link>
      )}
      {roles.includes('coach') && (
        <Link href="/coach-dashboard" className="text-white/80 hover:text-white transition-colors">
          Coach
        </Link>
      )}
      {roles.includes('parent') && (
        <Link href="/parent-dashboard" className="text-white/80 hover:text-white transition-colors">
          Family
        </Link>
      )}
      {roles.includes('admin') && (
        <Link href="/superintendent-dashboard" className="text-white/80 hover:text-white transition-colors">
          District
        </Link>
      )}
      <Link href="/rivalrybot-dashboard" className="font-bold text-yellow-400">
        RivalryBot
      </Link>
      <Link href="/signalprime" className="font-bold text-pink-400">
        SignalPrime
      </Link>
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
  );
}