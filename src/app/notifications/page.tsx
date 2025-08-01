'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Zap, Trophy, Users, MessageCircle, Star,
  Heart, Share2, Calendar, Check, X, Clock,
  Filter, Settings, ChevronRight
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'hype' | 'achievement' | 'social' | 'system' | 'event';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    amount?: number;
    from?: string;
    eventName?: string;
  };
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'hype' | 'social'>('all');
  
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'hype',
      title: 'HYPE Earned!',
      message: 'You earned 50 HYPE for completing your daily login streak',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
      metadata: { amount: 50 }
    },
    {
      id: '2',
      type: 'social',
      title: 'New Follower',
      message: 'Sarah Johnson started following your stadium',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      metadata: { from: 'Sarah Johnson' }
    },
    {
      id: '3',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You&apos;ve reached 1,000 HYPE points total',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true
    },
    {
      id: '4',
      type: 'event',
      title: 'Event Reminder',
      message: 'Basketball game vs Central High starts in 2 hours',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: true,
      metadata: { eventName: 'Basketball vs Central High' }
    },
    {
      id: '5',
      type: 'hype',
      title: 'Gift Received!',
      message: 'Your parent sent you 500 HYPE',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      metadata: { amount: 500, from: 'Mom' }
    },
    {
      id: '6',
      type: 'system',
      title: 'Profile Update',
      message: 'Your stadium profile has been verified',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'hype') return notification.type === 'hype';
    if (filter === 'social') return ['social', 'achievement'].includes(notification.type);
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'hype': return Zap;
      case 'achievement': return Trophy;
      case 'social': return Users;
      case 'event': return Calendar;
      case 'system': return Bell;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'hype': return 'text-[#F59E0B]';
      case 'achievement': return 'text-yellow-400';
      case 'social': return 'text-blue-400';
      case 'event': return 'text-purple-400';
      case 'system': return 'text-gray-400';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-[#F59E0B]" />
              Notifications
            </h1>
            <p className="text-white/60 mt-2">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark all read
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'hype', label: 'HYPE' },
            { id: 'social', label: 'Social' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id as 'all' | 'unread' | 'hype' | 'social')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                filter === id
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No notifications to show</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative bg-white/5 rounded-xl border transition-all ${
                    notification.read 
                      ? 'border-white/10' 
                      : 'border-[#F59E0B]/30 bg-white/10'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg bg-white/10 ${getIconColor(notification.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-white mb-1">
                              {notification.title}
                            </h3>
                            <p className="text-white/60 text-sm">
                              {notification.message}
                            </p>
                            
                            {/* Metadata */}
                            {notification.metadata && (
                              <div className="flex items-center gap-4 mt-2">
                                {notification.metadata.amount && (
                                  <span className="text-[#F59E0B] font-bold flex items-center gap-1">
                                    <Zap className="w-4 h-4" />
                                    +{notification.metadata.amount}
                                  </span>
                                )}
                                {notification.metadata.from && (
                                  <span className="text-white/40 text-sm">
                                    from {notification.metadata.from}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 text-sm whitespace-nowrap">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 hover:bg-white/10 rounded transition-all"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4 text-white/60" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 hover:bg-white/10 rounded transition-all"
                              title="Delete"
                            >
                              <X className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                        </div>

                        {/* Action Button */}
                        {notification.actionUrl && (
                          <button className="mt-3 text-[#F59E0B] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F59E0B] to-[#F97316] rounded-l-xl" />
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}