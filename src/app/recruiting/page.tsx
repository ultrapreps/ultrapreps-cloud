'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, Users, Star, MessageCircle, 
  ArrowLeft, MapPin, Eye, Download, Clock
} from 'lucide-react';
import GageAIChat from '../../components/GageAIChat';
import HypeWidget from '../../components/HypeWidget';


interface StudentTalent {
  id: string;
  name: string;
  school: string;
  graduationYear: number;
  position: string;
  sport: string;
  location: string;
  gpa: number;
  hypeScore: number;
  profileImage?: string;
  stats: {
    height: string;
    weight: string;
    position: string;
    keyStats: Record<string, string | number>;
  };
  achievements: string[];
  videos: number;
  verified: boolean;
  lastActive: Date;
}

interface RecruitingFilter {
  id: string;
  label: string;
  options: string[];
}

const RECRUITING_FILTERS: RecruitingFilter[] = [
  {
    id: 'sport',
    label: 'Sport',
    options: ['Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field', 'Swimming', 'Tennis', 'Golf']
  },
  {
    id: 'position',
    label: 'Position',
    options: ['Quarterback', 'Running Back', 'Wide Receiver', 'Point Guard', 'Center', 'Forward', 'Pitcher', 'Catcher']
  },
  {
    id: 'graduationYear',
    label: 'Graduation Year',
    options: ['2025', '2026', '2027', '2028']
  },
  {
    id: 'location',
    label: 'Location',
    options: ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Ohio', 'Pennsylvania']
  }
];

// Mock talent data
const MOCK_TALENTS: StudentTalent[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    school: 'Central High School',
    graduationYear: 2025,
    position: 'Quarterback',
    sport: 'Football',
    location: 'Dallas, TX',
    gpa: 3.8,
    hypeScore: 1250,
    stats: {
      height: '6\'2"',
      weight: '195 lbs',
      position: 'QB',
      keyStats: {
        'Passing Yards': '3,247',
        'Touchdowns': 28,
        'Completion %': '68.5%',
        'QBR': 94.2
      }
    },
    achievements: ['State Champion', 'All-State QB', 'Team Captain'],
    videos: 12,
    verified: true,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    name: 'Sarah Chen',
    school: 'Lincoln Prep Academy',
    graduationYear: 2026,
    position: 'Point Guard',
    sport: 'Basketball',
    location: 'Los Angeles, CA',
    gpa: 4.0,
    hypeScore: 980,
    stats: {
      height: '5\'6"',
      weight: '130 lbs',
      position: 'PG',
      keyStats: {
        'Points Per Game': 18.5,
        'Assists': 8.2,
        'Steals': 3.1,
        'Field Goal %': '45.8%'
      }
    },
    achievements: ['Academic All-American', 'Regional MVP', 'Honor Roll'],
    videos: 8,
    verified: true,
    lastActive: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: '3',
    name: 'Alex Rivera',
    school: 'Mountain View High',
    graduationYear: 2025,
    position: 'Pitcher',
    sport: 'Baseball',
    location: 'Phoenix, AZ',
    gpa: 3.6,
    hypeScore: 875,
    stats: {
      height: '6\'1"',
      weight: '180 lbs',
      position: 'P',
      keyStats: {
        'ERA': 2.14,
        'Strikeouts': 127,
        'WHIP': 1.08,
        'Fastball': '92 mph'
      }
    },
    achievements: ['All-Conference', 'Perfect Game Showcase', 'Team MVP'],
    videos: 15,
    verified: false,
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '4',
    name: 'Taylor Brown',
    school: 'Riverside Academy',
    graduationYear: 2027,
    position: 'Center',
    sport: 'Basketball',
    location: 'Miami, FL',
    gpa: 3.9,
    hypeScore: 1120,
    stats: {
      height: '6\'8"',
      weight: '215 lbs',
      position: 'C',
      keyStats: {
        'Points Per Game': 14.2,
        'Rebounds': 11.8,
        'Blocks': 3.4,
        'Field Goal %': '62.1%'
      }
    },
    achievements: ['Rising Star Award', 'Defensive Player of Year', 'Honor Society'],
    videos: 6,
    verified: true,
    lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  }
];

export default function RecruitingDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('hypeScore');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Filter and sort talents
  const filteredTalents = MOCK_TALENTS
    .filter(talent => {
      // Search filter
      if (searchQuery && !talent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !talent.school.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !talent.sport.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Selected filters
      for (const [filterKey, filterValue] of Object.entries(selectedFilters)) {
        if (filterValue && talent[filterKey as keyof StudentTalent] !== filterValue) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'hypeScore': return b.hypeScore - a.hypeScore;
        case 'gpa': return b.gpa - a.gpa;
        case 'name': return a.name.localeCompare(b.name);
        case 'graduationYear': return a.graduationYear - b.graduationYear;
        default: return 0;
      }
    });

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: value === prev[filterId] ? '' : value
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-400';
    if (gpa >= 3.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'scroll',
          backgroundPosition: 'center top',
          backgroundSize: '120% auto',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)',
          WebkitFilter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Navigation */}


      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-white/60">|</div>
                <h1 className="text-white font-bold text-xl">Talent Recruiting</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-white/60 text-sm">
                  {filteredTalents.length} talents found
                </div>
                <HypeWidget userId="recruiter_user" compact />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              Discover <span className="text-[#F59E0B]">ULTRA</span> Talent
            </h2>
            <p className="text-white/70 text-lg">
              Find and recruit the next generation of student-athletes with advanced analytics and insights.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, school, or sport..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {RECRUITING_FILTERS.map((filter) => (
                <div key={filter.id}>
                  <label className="block text-white text-sm font-medium mb-2">{filter.label}</label>
                  <select
                    value={selectedFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F59E0B] transition-colors"
                  >
                    <option value="">All {filter.label}s</option>
                    {filter.options.map((option) => (
                      <option key={option} value={option} className="bg-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F59E0B] transition-colors"
                  >
                    <option value="hypeScore" className="bg-black">HYPE Score</option>
                    <option value="gpa" className="bg-black">GPA</option>
                    <option value="name" className="bg-black">Name</option>
                    <option value="graduationYear" className="bg-black">Graduation Year</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-colors ${
                    viewMode === 'grid' ? 'bg-[#F59E0B] text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-colors ${
                    viewMode === 'list' ? 'bg-[#F59E0B] text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className="bg-current h-0.5 rounded-full"></div>
                    <div className="bg-current h-0.5 rounded-full"></div>
                    <div className="bg-current h-0.5 rounded-full"></div>
                    <div className="bg-current h-0.5 rounded-full"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Talent Grid/List */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
            {filteredTalents.map((talent) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200 group"
              >
                {/* Talent Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      {talent.profileImage ? (
                        <img 
                          src={talent.profileImage} 
                          alt={talent.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Users className="w-6 h-6 text-white/60" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-lg">{talent.name}</h3>
                        {talent.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-white/60 text-sm">{talent.school}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[#F59E0B] text-xl font-black">{talent.hypeScore}</div>
                    <div className="text-white/60 text-xs">HYPE</div>
                  </div>
                </div>

                {/* Talent Details */}
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Sport:</span>
                      <div className="text-white font-medium">{talent.sport}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Position:</span>
                      <div className="text-white font-medium">{talent.position}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Class:</span>
                      <div className="text-white font-medium">{talent.graduationYear}</div>
                    </div>
                    <div>
                      <span className="text-white/60">GPA:</span>
                      <div className={`font-medium ${getGPAColor(talent.gpa)}`}>{talent.gpa}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{talent.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Active {formatTimeAgo(talent.lastActive)}</span>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="bg-white/5 rounded-xl p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(talent.stats.keyStats).slice(0, 4).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-white/60">{key}:</span>
                        <div className="text-white font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {talent.achievements.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {talent.achievements.slice(0, 2).map((achievement) => (
                        <span 
                          key={achievement}
                          className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30"
                        >
                          {achievement}
                        </span>
                      ))}
                      {talent.achievements.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                          +{talent.achievements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/recruiting/talent/${talent.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View Profile</span>
                  </Link>
                  <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTalents.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-24 h-24 text-white/20 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">No talents found</h3>
              <p className="text-white/60 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find the perfect student-athletes for your program.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="recruiter_user"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}