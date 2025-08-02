'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Crown, 
  Menu, 
  X,
  Home,
  Trophy,
  Users,
  User,
  Settings,
  ChevronDown
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isButton?: boolean;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const mainNavItems: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Stadium', href: '/stadium/create', icon: Trophy, isButton: true },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Dashboard', href: '/dashboard', icon: User },
];

const dropdownSections: NavigationSection[] = [
  {
    title: 'Core Features',
    items: [
      { name: 'Create Stadium', href: '/stadium/create' },
      { name: 'Hero Cards', href: '/herocard/create' },
      { name: 'Poster Creator', href: '/poster/create' },
      { name: 'Beta Access', href: '/beta' },
    ]
  },
  {
    title: 'Test Systems',
    items: [
      { name: 'Test HUD', href: '/test-hud' },
      { name: 'Test HYPE', href: '/test-hype' },
      { name: 'Test Poster', href: '/test-poster' },
      { name: 'Test Mascot', href: '/test-mascot' },
      { name: 'Test Vision', href: '/test-vision' },
      { name: 'Test School', href: '/test-school' },
    ]
  },
  {
    title: 'Dashboards',
    items: [
      { name: 'Student Dashboard', href: '/dashboard' },
      { name: 'Coach Dashboard', href: '/coach-dashboard' },
      { name: 'Teacher Dashboard', href: '/teacher-dashboard' },
      { name: 'Parent Dashboard', href: '/parent-dashboard' },
    ]
  }
];

export default function UltraNavigationHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navigation Header */}
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-[#F59E0B]/20' 
          : 'bg-black border-b border-[#F59E0B]/30'
        }
      `}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Logo and Brand */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Crown className="w-8 h-8 text-[#F59E0B]" />
                <span className="text-xl font-black tracking-tight text-white">
                  ULTRAPREPS
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isActiveRoute(item.href);
                
                if (item.isButton) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                        bg-gradient-to-r from-[#F59E0B] to-[#F97316]
                        hover:from-[#F59E0B]/90 hover:to-[#F97316]/90
                        transition-all duration-200 font-bold text-black
                        hover:scale-105"
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? 'text-[#F59E0B] bg-[#F59E0B]/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium
                    text-white/80 hover:text-white hover:bg-white/5
                    transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 
                    bg-black/95 backdrop-blur-md rounded-xl border border-[#F59E0B]/20
                    shadow-xl overflow-hidden">
                    <div className="p-4">
                      {dropdownSections.map((section, sectionIndex) => (
                        <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                          <h3 className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-3">
                            {section.title}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-sm text-white/80
                                  hover:text-white hover:bg-white/5 transition-all duration-200"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/5
                  transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#F59E0B]/20 bg-black/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-6">
              
              {/* Mobile Main Navigation */}
              <div className="space-y-2">
                {mainNavItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isActiveRoute(item.href);
                  
                  if (item.isButton) {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg
                          bg-gradient-to-r from-[#F59E0B] to-[#F97316]
                          font-bold text-black text-center justify-center"
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium
                        transition-all duration-200
                        ${isActive
                          ? 'text-[#F59E0B] bg-[#F59E0B]/10'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Dropdown Sections */}
              {dropdownSections.map((section, sectionIndex) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider px-4">
                    {section.title}
                  </h3>
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 rounded-lg text-white/80
                        hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Overlay for dropdown/mobile menu */}
      {(isDropdownOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => {
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}