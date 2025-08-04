'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Book, Video, MessageCircle, Trophy,
  User, Camera, Zap, Crown, Target, Heart,
  ArrowRight, ChevronDown, ChevronRight, Star
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'getting-started', name: 'Getting Started', icon: Star },
    { id: 'herocard', name: 'HeroCards', icon: Trophy },
    { id: 'stadium', name: 'Digital Stadium', icon: Crown },
    { id: 'account', name: 'Account', icon: User },
    { id: 'features', name: 'Features', icon: Zap },
    { id: 'billing', name: 'Billing', icon: Target }
  ];

  const faqs: FAQItem[] = [
    {
      question: "How do I create my first HeroCard?",
      answer: "Creating your first HeroCard is easy! Go to the HeroCard Creator, upload your photo, enter your stats and achievements, choose a template, and our AI will generate a professional-grade card in seconds.",
      category: "getting-started"
    },
    {
      question: "What is a Digital Stadium?",
      answer: "Your Digital Stadium is your personal sports universe. It's where you showcase your HeroCards, connect with fans, share highlights, and track your athletic journey. Think of it as your professional sports homepage.",
      category: "stadium"
    },
    {
      question: "How does the AI analysis work?",
      answer: "Our AI analyzes your performance data, social media presence, and athletic achievements to provide personalized insights, recruiting recommendations, and performance predictions. All data is processed securely and privately.",
      category: "features"
    },
    {
      question: "Can I edit my HeroCard after it's created?",
      answer: "Yes! You can update your stats, achievements, and information anytime. Your HeroCard will automatically regenerate with the new information while maintaining your chosen design style.",
      category: "herocard"
    },
    {
      question: "Is UltraPreps free to use?",
      answer: "UltraPreps offers both free and premium tiers. Basic HeroCard creation and Digital Stadium features are free. Premium features include advanced AI analytics, unlimited HeroCards, and priority support.",
      category: "billing"
    },
    {
      question: "How do I reset my password?",
      answer: "Go to the sign-in page and click 'Forgot Password'. Enter your email address, and we'll send you a secure link to reset your password. Make sure to check your spam folder if you don't see the email.",
      category: "account"
    },
    {
      question: "Can coaches and schools use UltraPreps?",
      answer: "Absolutely! We offer special coach and school dashboards with team management tools, bulk HeroCard creation, recruiting analytics, and communication features. Contact us for institutional pricing.",
      category: "getting-started"
    },
    {
      question: "What sports are supported?",
      answer: "UltraPreps supports all major high school and college sports including football, basketball, soccer, baseball, softball, track & field, swimming, tennis, golf, wrestling, and many more.",
      category: "features"
    },
    {
      question: "How do I share my HeroCard on social media?",
      answer: "Every HeroCard comes with built-in sharing options. Click the share button to post directly to Instagram, Twitter, Facebook, or download the image to share anywhere. We provide optimized formats for each platform.",
      category: "herocard"
    },
    {
      question: "What if I'm having technical issues?",
      answer: "Our support team is available 24/7. You can contact us through the chat widget, email hello@ultrapreps.com, or submit a ticket through your dashboard. We typically respond within 2 hours.",
      category: "account"
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickActions = [
    {
      title: "Create HeroCard",
      description: "Generate your first professional athlete card",
      href: "/herocard/create",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Build Stadium",
      description: "Set up your digital sports universe",
      href: "/stadium/create", 
      icon: Crown,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Contact Support",
      description: "Get help from our expert team",
      href: "/contact",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Watch Tutorials",
      description: "Learn with step-by-step video guides",
      href: "/tutorials",
      icon: Video,
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600/20 via-black/90 to-blue-600/20 border-b border-green-500/30 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            HELP
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              CENTER
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Get the answers you need to maximize your UltraPreps experience
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/40" />
            <input
              type="text"
              placeholder="Search for help articles, features, tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{action.title}</h3>
                <p className="text-white/70 text-center text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8">
                Frequently Asked Questions
                {filteredFAQs.length > 0 && (
                  <span className="text-lg font-normal text-white/60 ml-4">
                    ({filteredFAQs.length} results)
                  </span>
                )}
              </h2>
              
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white/60 mb-2">No results found</h3>
                  <p className="text-white/40">
                    Try adjusting your search terms or browse all categories
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full text-left p-6 hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span className="text-white font-semibold pr-4">{faq.question}</span>
                        {expandedFAQ === index ? (
                          <ChevronDown className="w-5 h-5 text-white/60" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-white/60" />
                        )}
                      </button>
                      
                      {expandedFAQ === index && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-white/10 pt-4">
                            <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Video className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Video Tutorials</h3>
                <p className="text-white/70 mb-4">
                  Watch step-by-step guides to master every UltraPreps feature.
                </p>
                <Link
                  href="/tutorials"
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2"
                >
                  Browse Tutorials
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <MessageCircle className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Live Support</h3>
                <p className="text-white/70 mb-4">
                  Chat with our support team for personalized assistance.
                </p>
                <Link
                  href="/contact"
                  className="text-green-400 hover:text-green-300 font-semibold flex items-center gap-2"
                >
                  Start Chat
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}