'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, User, Bell, Shield, Palette, 
  Globe, CreditCard, Users, LogOut, ChevronRight, Check,
  Moon, Sun, Zap, Crown, Mail, Phone,
  Lock, Key, Smartphone, Trophy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [notifications, setNotifications] = useState({
    hypeEarned: true,
    newFollowers: true,
    messages: true,
    weeklyDigest: false,
    productUpdates: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showStats: true,
    allowMessages: 'everyone',
    showActivity: true
  });

  const sections: SettingSection[] = [
    { id: 'profile', title: 'Profile', icon: User, description: 'Manage your personal information' },
    { id: 'notifications', title: 'Notifications', icon: Bell, description: 'Control your alerts' },
    { id: 'privacy', title: 'Privacy & Security', icon: Shield, description: 'Manage your privacy settings' },
    { id: 'appearance', title: 'Appearance', icon: Palette, description: 'Customize your experience' },
    { id: 'hype', title: 'HYPE & Billing', icon: CreditCard, description: 'Manage payments and HYPE' },
    { id: 'connections', title: 'Connections', icon: Users, description: 'Family and team links' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue="John Smith"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Username</label>
                <input
                  type="text"
                  defaultValue="@johnsmith_tigers"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    defaultValue="john.smith@example.com"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  />
                  <button className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Phone</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  />
                  <button className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Student athlete at Central High School. Basketball and Track. Future engineer."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="pt-6">
              <button className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-bold hover:from-[#F59E0B]/90 hover:to-[#F97316]/90 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h3 className="font-medium text-white">
                      {key === 'hypeEarned' && 'HYPE Earned'}
                      {key === 'newFollowers' && 'New Followers'}
                      {key === 'messages' && 'Direct Messages'}
                      {key === 'weeklyDigest' && 'Weekly Digest'}
                      {key === 'productUpdates' && 'Product Updates'}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">
                      {key === 'hypeEarned' && 'Get notified when you earn HYPE points'}
                      {key === 'newFollowers' && 'Know when someone follows your stadium'}
                      {key === 'messages' && 'Receive alerts for new messages'}
                      {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                      {key === 'productUpdates' && 'New features and announcements'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !enabled }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      enabled ? 'bg-[#F59E0B]' : 'bg-white/20'
                    }`}
                  >
                    <motion.div
                      animate={{ x: enabled ? 24 : 0 }}
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Profile Visibility</h3>
                <div className="space-y-2">
                  {['public', 'friends', 'private'].map((visibility) => (
                    <button
                      key={visibility}
                      onClick={() => setPrivacy(prev => ({ ...prev, profileVisibility: visibility }))}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        privacy.profileVisibility === visibility
                          ? 'bg-[#F59E0B]/20 border border-[#F59E0B]'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {visibility === 'public' && <Globe className="w-5 h-5" />}
                        {visibility === 'friends' && <Users className="w-5 h-5" />}
                        {visibility === 'private' && <Lock className="w-5 h-5" />}
                        <div className="text-left">
                          <p className="font-medium text-white capitalize">{visibility}</p>
                          <p className="text-sm text-white/60">
                            {visibility === 'public' && 'Anyone can view your profile'}
                            {visibility === 'friends' && 'Only connections can view'}
                            {visibility === 'private' && 'Only you can view'}
                          </p>
                        </div>
                      </div>
                      {privacy.profileVisibility === visibility && (
                        <Check className="w-5 h-5 text-[#F59E0B]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Security</h3>
                
                <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-white/60" />
                    <div className="text-left">
                      <p className="font-medium text-white">Change Password</p>
                      <p className="text-sm text-white/60">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-white/60" />
                    <div className="text-left">
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-green-400">Enabled</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'auto', label: 'Auto', icon: SettingsIcon }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value as 'dark' | 'light' | 'auto')}
                    className={`p-4 rounded-xl transition-all ${
                      theme === value
                        ? 'bg-[#F59E0B]/20 border border-[#F59E0B]'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
              <p className="text-sm text-[#F59E0B]">
                Light theme coming soon! We&apos;re perfecting the ultimate viewing experience.
              </p>
            </div>
          </div>
        );

      case 'hype':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">HYPE & Billing</h2>
            
            <div className="bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/20 rounded-2xl p-6 border border-[#F59E0B]/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-white/60">Current Balance</p>
                  <p className="text-3xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-8 h-8 text-[#F59E0B]" />
                    2,450 HYPE
                  </p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-bold hover:from-[#F59E0B]/90 hover:to-[#F97316]/90 transition-all">
                  Get More
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Free HYPE</p>
                  <p className="font-bold text-white">1,850</p>
                </div>
                <div>
                  <p className="text-white/60">Paid HYPE</p>
                  <p className="font-bold text-white">600</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
              <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-white/60" />
                  <div className="text-left">
                    <p className="font-medium text-white">Add Payment Method</p>
                    <p className="text-sm text-white/60">Credit card, debit card, or PayPal</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-white">UltraPreps Free</p>
                  <span className="text-sm text-green-400">Active</span>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Access to core features and earn free HYPE through activities
                </p>
                <button className="text-[#F59E0B] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Upgrade to Pro
                  <Crown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'connections':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Connections</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Family Members</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Mom</p>
                      <p className="text-sm text-white/60">Parent Account</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-400">Connected</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="font-bold">D</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Dad</p>
                      <p className="text-sm text-white/60">Parent Account</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-400">Connected</span>
                </div>
              </div>

              <button className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-[#F59E0B]/50 transition-all">
                <p className="text-white/60">+ Add Family Member</p>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Teams</h3>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Central High Basketball</p>
                    <p className="text-sm text-white/60">Varsity Team</p>
                  </div>
                </div>
                <span className="text-sm text-green-400">Active</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-[#F59E0B]" />
            Settings
          </h1>
          <p className="text-white/60 mt-2">Manage your account and preferences</p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => {
                  // Handle logout
                  router.push('/');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}