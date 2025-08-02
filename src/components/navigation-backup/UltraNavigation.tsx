'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Trophy, Users, User, Crown, Compass
} from 'lucide-react';

export default function UltraNavigation() {
  const pathname = usePathname();

  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Stadium', href: '/stadium/create', icon: Trophy },
    { name: 'Social', href: '/feed', icon: Users },
    { name: 'Profile', href: '/dashboard', icon: User }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <div className="bg-black border-b border-[#F59E0B]/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-[#F59E0B]" />
                <span className="text-xl font-black tracking-tight text-white">ULTRAPREPS</span>
              </Link>

              {/* Main Navigation */}
              <div className="flex items-center gap-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg
                        transition-all duration-200
                        ${isActive 
                          ? 'text-white bg-white/10' 
                          : 'text-white/90 hover:text-white hover:bg-[#F59E0B]/20'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

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
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        {/* Mobile Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#F59E0B]/30">
          <div className="flex items-center justify-between h-14 px-4">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#F59E0B]" />
              <span className="font-black text-white">ULTRAPREPS</span>
            </Link>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-[#F59E0B]/30">
          <div className="grid grid-cols-5 h-16">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex flex-col items-center justify-center gap-1
                    transition-colors
                    ${isActive ? 'text-[#F59E0B]' : 'text-white/90'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>


    </>
  );
}