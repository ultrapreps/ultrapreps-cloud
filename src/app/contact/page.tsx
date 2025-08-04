'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Clock, Send, User,
  Building, MessageCircle, Globe, Twitter,
  Instagram, Linkedin, Youtube, Star
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600/20 via-black/90 to-purple-600/20 border-b border-blue-500/30 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            GET IN
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              TOUCH
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Have questions? Need support? Want to partner with us? 
            We're here to help you succeed on your athletic journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Message Sent Successfully!</h3>
                  <p className="text-white/70 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="media">Media/Press</option>
                      <option value="feedback">Feedback</option>
                      <option value="billing">Billing Question</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-white/70">hello@ultrapreps.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-white/70">1-800-ULTRAPREPS</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-red-400" />
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-white/70">Austin, Texas</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-white font-semibold">Support Hours</div>
                    <div className="text-white/70">24/7 Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Categories */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">How Can We Help?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Account Support</div>
                    <div className="text-white/70 text-sm">Login issues, profile management, settings</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Building className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">School Partnerships</div>
                    <div className="text-white/70 text-sm">Institutional accounts, bulk licensing</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Technical Issues</div>
                    <div className="text-white/70 text-sm">Bugs, feature requests, platform issues</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-orange-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Media Inquiries</div>
                    <div className="text-white/70 text-sm">Press, interviews, partnerships</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://twitter.com/ultrapreps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-semibold">Twitter</span>
                </a>
                
                <a
                  href="https://instagram.com/ultrapreps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-pink-500/20 border border-pink-500/30 rounded-lg hover:bg-pink-500/30 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-pink-400" />
                  <span className="text-white font-semibold">Instagram</span>
                </a>
                
                <a
                  href="https://linkedin.com/company/ultrapreps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-600/20 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-blue-300" />
                  <span className="text-white font-semibold">LinkedIn</span>
                </a>
                
                <a
                  href="https://youtube.com/@ultrapreps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Youtube className="w-6 h-6 text-red-400" />
                  <span className="text-white font-semibold">YouTube</span>
                </a>
              </div>
              
              <p className="text-white/70 text-sm mt-4">
                Stay updated with the latest features, athlete spotlights, and platform news.
              </p>
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
              
              <div className="space-y-3">
                <Link href="/help" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Help Center
                </Link>
                <Link href="/beta" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Join Beta Program
                </Link>
                <Link href="/stadium/create" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  Create Your Stadium
                </Link>
                <Link href="/about" className="block text-blue-400 hover:text-blue-300 transition-colors">
                  About UltraPreps
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}