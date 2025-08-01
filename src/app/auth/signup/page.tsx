'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, Zap, Mail, Lock, School, AlertCircle, Loader2, Users, GraduationCap } from 'lucide-react';
import { UserRole } from '@prisma/client';

export default function SignUpPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: UserRole.STUDENT as UserRole,
    school: '',
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Create user account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          school: formData.school,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Redirect to sign in
      router.push('/auth/signin?message=Account created successfully');
    } catch (error) {
      const err = error as Error;
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { value: UserRole.STUDENT, label: 'Student Athlete', icon: GraduationCap },
    { value: UserRole.PARENT, label: 'Parent/Guardian', icon: Users },
    { value: UserRole.COACH, label: 'Coach', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Crown className="w-12 h-12 text-[#F59E0B]" />
            <span className="text-3xl font-black tracking-tight">ULTRAPREPS</span>
          </Link>
          <p className="text-white/60 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: value })}
                    className={`p-3 rounded-lg border transition-all ${
                      formData.role === value
                        ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-white'
                        : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  placeholder="Smith"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  placeholder="john.smith@example.com"
                  required
                />
              </div>
            </div>

            {/* School */}
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-white/80 mb-2">
                School
              </label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="school"
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  placeholder="Central High School"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-bold hover:from-[#F59E0B]/90 hover:to-[#F97316]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <Zap className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#F59E0B] hover:text-[#F97316] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Background effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F59E0B]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </motion.div>
    </div>
  );
}