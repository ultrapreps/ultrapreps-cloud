'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  MessageSquare, 
  Calendar, 
  Target,
  ChevronRight,
  Bell,
  Settings,
  GraduationCap,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Flame,
  Crown,
  Trophy,
  Brain,
  Heart,
  Zap,
  Video,
  Image as ImageIcon,
  Download,
  Share2,
  Pencil,
  Plus
} from 'lucide-react';

import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface Student {
  id: string;
  name: string;
  grade: string;
  subjects: string[];
  gpa: number;
  attendance: number;
  behaviorScore: number;
  recentActivity: string;
  profileImage: string;
  achievements: string[];
  parentContact: {
    name: string;
    email: string;
    phone: string;
  };
  academicProgress: {
    assignments: number;
    completed: number;
    avgScore: number;
  };
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submittedCount: number;
  totalStudents: number;
  avgScore: number;
  status: 'active' | 'graded' | 'overdue';
}

interface TeacherTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
}

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const teacherData = {
    name: 'Ms. Sarah Johnson',
    subject: 'English Literature & Writing',
    school: 'UltraPreps High School',
    experience: '8 years',
    certification: 'Master of Education',
    classroom: 'Room 214',
    totalStudents: 127,
    classes: [
      { name: 'AP English Literature', students: 28, period: '1st Period' },
      { name: 'Creative Writing', students: 24, period: '3rd Period' },
      { name: 'English 11', students: 31, period: '5th Period' },
      { name: 'Journalism', students: 22, period: '6th Period' },
      { name: 'Reading Intervention', students: 18, period: '7th Period' }
    ]
  };

  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Marcus Thompson',
      grade: '11th',
      subjects: ['English 11', 'Creative Writing'],
      gpa: 3.8,
      attendance: 94,
      behaviorScore: 95,
      recentActivity: 'Submitted essay early with exceptional quality',
      profileImage: '/herocard-1.png',
      achievements: ['Honor Roll', 'Writing Contest Winner', 'Perfect Attendance'],
      parentContact: {
        name: 'David Thompson',
        email: 'dthompson@email.com',
        phone: '(555) 123-4567'
      },
      academicProgress: {
        assignments: 15,
        completed: 14,
        avgScore: 92
      }
    },
    {
      id: '2', 
      name: 'Sophia Rodriguez',
      grade: '12th',
      subjects: ['AP English Literature', 'Journalism'],
      gpa: 4.0,
      attendance: 98,
      behaviorScore: 98,
      recentActivity: 'Led class discussion on literary themes',
      profileImage: '/herocard-2.png',
      achievements: ['Valedictorian Track', 'Student Newspaper Editor', 'National Merit Scholar'],
      parentContact: {
        name: 'Maria Rodriguez',
        email: 'mrodriguez@email.com', 
        phone: '(555) 987-6543'
      },
      academicProgress: {
        assignments: 18,
        completed: 18,
        avgScore: 97
      }
    },
    {
      id: '3',
      name: 'James Wilson',
      grade: '10th', 
      subjects: ['Reading Intervention'],
      gpa: 2.4,
      attendance: 87,
      behaviorScore: 78,
      recentActivity: 'Improved reading level by 2 grades this semester',
      profileImage: '/herocard-3.png',
      achievements: ['Most Improved', 'Reading Growth Champion'],
      parentContact: {
        name: 'Lisa Wilson',
        email: 'lwilson@email.com',
        phone: '(555) 456-7890'
      },
      academicProgress: {
        assignments: 12,
        completed: 10,
        avgScore: 75
      }
    }
  ];

  const mockAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Romeo and Juliet Character Analysis',
      subject: 'AP English Literature',
      dueDate: '2025-02-05',
      submittedCount: 24,
      totalStudents: 28,
      avgScore: 87,
      status: 'active'
    },
    {
      id: '2',
      title: 'Personal Narrative Essay',
      subject: 'Creative Writing',
      dueDate: '2025-01-30',
      submittedCount: 24,
      totalStudents: 24,
      avgScore: 91,
      status: 'graded'
    },
    {
      id: '3',
      title: 'News Article Analysis',
      subject: 'Journalism',
      dueDate: '2025-01-28',
      submittedCount: 18,
      totalStudents: 22,
      avgScore: 0,
      status: 'overdue'
    }
  ];

  const tabs: TeacherTab[] = [
    { id: 'overview', label: 'Command Center', icon: BarChart3 },
    { id: 'ai_lesson_planner', label: 'AI Lesson Planner', icon: Brain },
    { id: 'students', label: 'Smart Roster', icon: Users },
          { id: 'gradebook_killer', label: 'Smart Gradebook', icon: Award },
          { id: 'parent_communication', label: 'Parent Communication Hub', icon: MessageSquare },
    { id: 'academic_intervention', label: 'Academic Intervention AI', icon: Target },
    { id: 'classroom_management', label: 'Classroom Command', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.2) brightness(0.2) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/85 via-[#111827]/80 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#1E3A8A]/20" />
      </div>

      {/* Dynamic Light Effects */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#F59E0B]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#F97316]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Mega Navigation */}
      

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">
                    Welcome back, {teacherData.name}!
                  </h1>
                  <p className="text-white/70 text-sm">{teacherData.subject} • {teacherData.classroom}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <HypeWidget userId="teacher_demo" compact />
                <button className="p-2 text-white/70 hover:text-white transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <button className="p-2 text-white/70 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Enhanced Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 relative z-10">
                <span className="text-[#F59E0B] drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">ULTRA</span> 
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> EDUCATOR</span>
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-2xl blur-2xl opacity-50" />
            </div>
            <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 backdrop-blur-sm rounded-2xl border border-[#F59E0B]/30 p-6 max-w-4xl mx-auto">
              <p className="text-white/90 text-xl font-medium leading-relaxed">
                🎓 <span className="text-[#F59E0B] font-bold">Academic Excellence Engine</span> - AI lesson planning, smart gradebook, parent communication, and student insights
              </p>
              <p className="text-white/70 text-lg mt-2">
                The complete teaching ecosystem to inspire learning and drive student success
              </p>
            </div>
          </motion.div>

          {/* Enhanced Tab Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-[#F59E0B]/30 mb-8 shadow-[0_0_50px_rgba(245,158,11,0.1)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="text-xl font-black text-white">Teaching Command Center</h3>
            </div>
            <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-bold border-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-2xl border-white/50 shadow-[#F59E0B]/25'
                      : 'bg-white/5 text-white/70 hover:bg-white/15 border-white/20 hover:border-[#F59E0B]/50 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-black">{tab.label}</span>
                </motion.button>
              );
            })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { label: 'Total Students', value: teacherData.totalStudents, icon: Users, color: 'from-blue-500 to-blue-600' },
                      { label: 'Classes Teaching', value: teacherData.classes.length, icon: BookOpen, color: 'from-green-500 to-green-600' },
                      { label: 'Avg Class Performance', value: '89%', icon: TrendingUp, color: 'from-[#F59E0B] to-[#F97316]' },
                      { label: 'Pending Assignments', value: '12', icon: Clock, color: 'from-purple-500 to-purple-600' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl text-white shadow-xl`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className="w-8 h-8" />
                          <span className="text-2xl sm:text-3xl font-black">{stat.value}</span>
                        </div>
                        <p className="font-bold text-sm opacity-90">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Classes Overview */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-black text-white mb-6">Your Classes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teacherData.classes.map((classItem, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-4"
                        >
                          <h4 className="text-white font-bold text-lg mb-2">{classItem.name}</h4>
                          <p className="text-white/70 text-sm mb-2">{classItem.period}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[#F59E0B] font-bold">{classItem.students} students</span>
                            <ChevronRight className="w-4 h-4 text-white/50" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-black text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        { action: 'New assignment submitted', student: 'Marcus Thompson', time: '5 minutes ago', type: 'success' },
                        { action: 'Parent conference scheduled', student: 'Sophia Rodriguez', time: '1 hour ago', type: 'info' },
                        { action: 'Missing assignment alert', student: 'James Wilson', time: '2 hours ago', type: 'warning' },
                        { action: 'Grade updated', student: 'Emma Davis', time: '3 hours ago', type: 'success' }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <div className={`w-3 h-3 rounded-full ${
                            activity.type === 'success' ? 'bg-green-500' :
                            activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.action}</p>
                            <p className="text-white/60 text-sm">{activity.student} • {activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                                    </div>
                </div>
              )}

              {/* AI LESSON PLANNER (PREMIUM FEATURE) */}
              {activeTab === 'ai_lesson_planner' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Brain className="w-8 h-8 text-[#F59E0B]" />
                      <h2 className="text-3xl font-black text-white">AI LESSON PLANNER</h2>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">AI-POWERED</span>
                    </div>
                    <p className="text-white/70 text-lg">Generate standards-aligned lessons, assessments, and activities in seconds</p>
                  </div>

                  {/* AI Lesson Generator */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold text-xl mb-6">Generate Perfect Lesson Plans</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/80 text-sm font-medium">Subject & Topic</label>
                          <input 
                            type="text" 
                            placeholder="e.g., Romeo and Juliet Act 2 Analysis"
                            className="w-full mt-2 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-white/80 text-sm font-medium">Grade Level</label>
                            <select className="w-full mt-2 p-3 bg-white/10 border border-white/20 rounded-xl text-white">
                              <option value="9">9th Grade</option>
                              <option value="10">10th Grade</option>
                              <option value="11">11th Grade</option>
                              <option value="12">12th Grade</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-white/80 text-sm font-medium">Duration</label>
                            <select className="w-full mt-2 p-3 bg-white/10 border border-white/20 rounded-xl text-white">
                              <option value="50">50 minutes</option>
                              <option value="90">90 minutes</option>
                              <option value="week">1 Week Unit</option>
                            </select>
                          </div>
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black rounded-xl hover:scale-105 transition-all">
                          🧠 GENERATE AI LESSON PLAN
                        </button>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3">AI-Generated Preview:</h4>
                        <div className="text-white/80 text-sm space-y-2">
                          <div><strong>Learning Objectives:</strong> Students will analyze character motivations...</div>
                          <div><strong>Activities:</strong> Character mapping, scene analysis, group discussion...</div>
                          <div><strong>Assessment:</strong> Exit ticket with comprehension questions...</div>
                          <div><strong>Differentiation:</strong> Visual supports for ELL students...</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pre-made AI Lessons */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold text-xl mb-6">AI-Generated Lesson Library</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { title: "Character Analysis Workshop", subject: "Literature", duration: "50 min", engagement: "96%" },
                        { title: "Creative Writing Bootcamp", subject: "Writing", duration: "90 min", engagement: "94%" },
                        { title: "Poetry Slam Preparation", subject: "Creative Arts", duration: "1 week", engagement: "98%" },
                        { title: "Research Paper Mastery", subject: "Academic Writing", duration: "2 weeks", engagement: "92%" },
                        { title: "Shakespeare Made Easy", subject: "Classic Literature", duration: "50 min", engagement: "89%" },
                        { title: "Digital Storytelling", subject: "Media Literacy", duration: "1 week", engagement: "97%" }
                      ].map((lesson, index) => (
                        <div key={index} className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all cursor-pointer">
                          <h4 className="text-white font-bold mb-2">{lesson.title}</h4>
                          <p className="text-white/70 text-sm mb-3">{lesson.subject} • {lesson.duration}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-green-400 text-sm font-bold">{lesson.engagement} engagement</span>
                            <ChevronRight className="w-4 h-4 text-white/50" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SMART GRADEBOOK */}
              {activeTab === 'gradebook_killer' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-[#F59E0B]" />
                      <h2 className="text-3xl font-black text-white">SMART GRADEBOOK</h2>
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full">LIVE INTEGRATION</span>
                    </div>
                    <p className="text-white/70 text-lg">Real-time grades with AI insights and automatic parent notifications</p>
                  </div>

                  {/* Quick Grade Entry */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold text-xl mb-6">Lightning-Fast Grade Entry</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-5 gap-2 text-center text-sm font-bold text-white/80 mb-4">
                          <div>Student</div>
                          <div>Assignment</div>
                          <div>Points</div>
                          <div>Grade</div>
                          <div>Actions</div>
                        </div>
                        {mockStudents.slice(0, 3).map((student) => (
                          <div key={student.id} className="grid grid-cols-5 gap-2 items-center p-3 bg-white/5 rounded-xl mb-2">
                            <div className="text-white text-sm">{student.name.split(' ')[0]}</div>
                            <div className="text-white/70 text-xs">Essay #3</div>
                            <input type="number" className="w-full p-2 bg-white/10 border border-white/20 rounded text-white text-center" placeholder="85" />
                            <div className="text-[#F59E0B] font-bold">B+</div>
                            <button className="text-green-400 hover:text-green-300">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3">AI Grade Insights</h4>
                        <div className="space-y-3 text-sm">
                          <div className="text-green-400">
                            <strong>Trending Up:</strong> Marcus Thompson (+8% this week)
                          </div>
                          <div className="text-yellow-400">
                            <strong>Watch:</strong> James Wilson (missed 2 assignments)
                          </div>
                          <div className="text-blue-400">
                            <strong>Standout:</strong> Sophia Rodriguez (consistent A+ work)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Auto Parent Notifications */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold text-xl mb-6">Automatic Parent Notifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-bold">Auto-Sent: Good News!</span>
                          </div>
                          <p className="text-white text-sm">Marcus scored 94% on his character analysis essay. His writing has improved significantly!</p>
                          <p className="text-white/60 text-xs mt-2">Sent to: David Thompson • 2 minutes ago</p>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-bold">Auto-Sent: Check-In</span>
                          </div>
                          <p className="text-white text-sm">James missed his assignment deadline. Let&apos;s work together to get him back on track.</p>
                          <p className="text-white/60 text-xs mt-2">Sent to: Lisa Wilson • 1 hour ago</p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3">Notification Settings</h4>
                        <div className="space-y-3">
                          {[
                            "Immediate: Grades below 70%",
                            "Daily: Missing assignments",
                            "Weekly: Progress summaries",
                            "Celebrate: Outstanding work"
                          ].map((setting, index) => (
                            <label key={index} className="flex items-center gap-3 text-sm text-white/80">
                              <input type="checkbox" defaultChecked className="rounded" />
                              {setting}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PARENT COMMUNICATION HUB */}
              {activeTab === 'parent_communication' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <MessageSquare className="w-8 h-8 text-[#F59E0B]" />
                      <h2 className="text-3xl font-black text-white">PARENT COMMUNICATION HUB</h2>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full">ADVANCED MESSAGING</span>
                    </div>
                    <p className="text-white/70 text-lg">Eliminate all other parent communication apps - this does everything better</p>
                  </div>

                  {/* Message Composer */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold text-xl mb-6">AI-Powered Message Composer</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/80 text-sm font-medium">Message Type</label>
                          <select className="w-full mt-2 p-3 bg-white/10 border border-white/20 rounded-xl text-white">
                            <option value="progress">Progress Update</option>
                            <option value="concern">Academic Concern</option>
                            <option value="celebration">Celebrate Success</option>
                            <option value="reminder">Assignment Notice</option>
                            <option value="behavior">Behavior Note</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-white/80 text-sm font-medium">Recipients</label>
                          <div className="mt-2 space-y-2">
                            {mockStudents.map((student) => (
                              <label key={student.id} className="flex items-center gap-3 text-white/80">
                                <input type="checkbox" className="rounded" />
                                <span>{student.parentContact.name} ({student.name})</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black rounded-xl">
                          ✨ GENERATE AI MESSAGE
                        </button>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3">AI-Generated Message:</h4>
                        <div className="text-white/80 text-sm space-y-3">
                          <p><strong>Subject:</strong> Marcus&apos;s Outstanding Essay Performance</p>
                          <p><strong>Message:</strong> I&apos;m excited to share that Marcus scored 94% on his character analysis essay this week. His ability to identify character motivations and support his analysis with textual evidence has improved dramatically. He&apos;s showing real growth in critical thinking skills.</p>
                          <p><strong>Next Steps:</strong> Continue encouraging his reading at home. His confidence is building!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Communication Analytics */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold text-xl mb-6">Communication Impact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Messages Sent", value: "247", trend: "+23%" },
                        { label: "Parent Response Rate", value: "94%", trend: "+8%" },
                        { label: "Student Improvement", value: "89%", trend: "+15%" },
                        { label: "Family Engagement", value: "97%", trend: "+12%" }
                      ].map((stat, index) => (
                        <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                          <div className="text-2xl font-black text-white">{stat.value}</div>
                          <div className="text-white/70 text-sm">{stat.label}</div>
                          <div className="text-green-400 text-xs font-bold">{stat.trend}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'students' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white">Student Roster</h3>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors">
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add Student
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mockStudents.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedStudent(student)}
                        className="bg-gradient-to-br from-black/60 to-[#1E3A8A]/20 border border-white/20 rounded-2xl p-6 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <img 
                            src={student.profileImage} 
                            alt={student.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#F59E0B]/50"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-lg">{student.name}</h4>
                            <p className="text-white/70 text-sm">{student.grade} Grade</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="w-4 h-4 text-[#F59E0B]" />
                              <span className="text-[#F59E0B] font-bold text-sm">GPA: {student.gpa}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Attendance</span>
                            <span className="text-white font-bold">{student.attendance}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Behavior</span>
                            <span className="text-white font-bold">{student.behaviorScore}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Assignments</span>
                            <span className="text-white font-bold">{student.academicProgress.completed}/{student.academicProgress.assignments}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-white/60 text-sm">{student.recentActivity}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {student.achievements.slice(0, 2).map((achievement, idx) => (
                            <span key={idx} className="px-2 py-1 bg-[#F59E0B]/20 text-[#F59E0B] text-xs rounded-full border border-[#F59E0B]/30">
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'assignments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white">Assignment Management</h3>
                    <button className="px-4 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors">
                      <Plus className="w-4 h-4 inline mr-2" />
                      Create Assignment
                    </button>
                  </div>

                  <div className="space-y-4">
                    {mockAssignments.map((assignment, index) => (
                      <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-white font-bold text-xl">{assignment.title}</h4>
                            <p className="text-white/70">{assignment.subject}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                            assignment.status === 'active' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            assignment.status === 'graded' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {assignment.status.toUpperCase()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-black text-[#F59E0B]">{assignment.submittedCount}</div>
                            <div className="text-white/70 text-sm">Submitted</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-black text-white">{assignment.totalStudents}</div>
                            <div className="text-white/70 text-sm">Total Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-black text-[#F59E0B]">{assignment.avgScore || 'N/A'}</div>
                            <div className="text-white/70 text-sm">Avg Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-black text-white">{assignment.dueDate}</div>
                            <div className="text-white/70 text-sm">Due Date</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium">
                            View Submissions
                          </button>
                          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium">
                            Grade Assignment
                          </button>
                          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium">
                            Send Message
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-white mb-6">AI Teaching Resources</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Lesson Plan Generator',
                        description: 'AI-powered lesson plans tailored to your curriculum',
                        icon: BookOpen,
                        color: 'from-blue-500 to-blue-600',
                        features: ['Standards-aligned', 'Differentiated instruction', 'Assessment included']
                      },
                      {
                        title: 'Assignment Creator',
                        description: 'Generate engaging assignments with rubrics',
                        icon: FileText,
                        color: 'from-green-500 to-green-600',
                        features: ['Multiple formats', 'Auto-grading', 'Plagiarism detection']
                      },
                      {
                        title: 'Student Analytics',
                        description: 'Comprehensive insights into student performance',
                        icon: BarChart3,
                        color: 'from-[#F59E0B] to-[#F97316]',
                        features: ['Progress tracking', 'Intervention alerts', 'Parent reports']
                      },
                      {
                        title: 'Content Library',
                        description: 'Access thousands of educational resources',
                        icon: Brain,
                        color: 'from-purple-500 to-purple-600',
                        features: ['Video lessons', 'Interactive activities', 'Practice tests']
                      },
                      {
                        title: 'Communication Hub',
                        description: 'Streamlined parent and student communication',
                        icon: MessageSquare,
                        color: 'from-pink-500 to-pink-600',
                        features: ['Automated updates', 'Translation support', 'Bulk messaging']
                      },
                      {
                        title: 'Professional Development',
                        description: 'AI-guided teaching skill enhancement',
                        icon: GraduationCap,
                        color: 'from-indigo-500 to-indigo-600',
                        features: ['Personalized coaching', 'Best practices', 'Certification tracking']
                      }
                    ].map((resource, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-black/60 to-[#1E3A8A]/20 border border-white/20 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-all duration-300"
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${resource.color} flex items-center justify-center mb-4`}>
                          <resource.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">{resource.title}</h4>
                        <p className="text-white/70 mb-4">{resource.description}</p>
                        <ul className="space-y-2 mb-4">
                          {resource.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                              <CheckCircle className="w-4 h-4 text-[#F59E0B]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full px-4 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors">
                          Explore Tool
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly... */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="teacher_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}