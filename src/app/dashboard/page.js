'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  BookOpen, 
  MessageCircle, 
  PenTool,
  TrendingUp,
  Heart,
  Sparkles,
  Users,
  ChevronRight,
  Calendar,
  Clock,
  Star,
  Target,
  Award,
  Moon,
  Quote
} from 'lucide-react';

/**
 * Dashboard Overview Page
 * 
 * This is the main dashboard that users see when they login.
 * Features beautiful animated cards for each major app section,
 * quick stats, and recent activity.
 */
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  // Animation trigger
  useEffect(() => {
    setMounted(true);
  }, []);

  // Main feature cards data
  const featureCards = [
    {
      id: 'career',
      title: 'Career Advisor',
      description: 'Discover your purpose-driven career path with AI guidance',
      icon: Briefcase,
      href: '/career',
      gradient: 'from-blue-600 to-purple-600',
      stats: 'Next assessment ready',
      color: 'blue'
    },
    {
      id: 'islamic',
      title: 'Islamic Content',
      description: 'Daily verses, duas, and hadith for spiritual growth',
      icon: BookOpen,
      href: '/islamic-content',
      gradient: 'from-emerald-600 to-teal-600',
      stats: '5 new reminders',
      color: 'emerald'
    },
    {
      id: 'mentor',
      title: 'AI Mentors',
      description: 'Connect with wise Islamic mentors for personalized guidance',
      icon: MessageCircle,
      href: '/mentor',
      gradient: 'from-purple-600 to-pink-600',
      stats: '3 mentors available',
      color: 'purple'
    },
    {
      id: 'journal',
      title: 'Mood Journal',
      description: 'Track emotions and reflect on your spiritual journey',
      icon: PenTool,
      href: '/journal',
      gradient: 'from-orange-600 to-red-600',
      stats: 'Log today\'s mood',
      color: 'orange'
    }
  ];

  // Quick action cards
  const quickActions = [
    {
      title: 'Take Career Assessment',
      icon: Target,
      href: '/career/assessment',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Read Today\'s Hadith',
      icon: Quote,
      href: '/islamic-content/hadiths',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Chat with Imam',
      icon: Users,
      href: '/mentor/imam',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'New Journal Entry',
      icon: Calendar,
      href: '/journal/entry',
      color: 'from-orange-500 to-pink-500'
    }
  ];

  // Mock stats data
  const stats = [
    {
      title: 'Days Active',
      value: '24',
      change: '+3 this week',
      icon: Calendar,
      color: 'text-primary-400'
    },
    {
      title: 'Prayers Logged',
      value: '156',
      change: '+12 today',
      icon: Moon,
      color: 'text-accent-400'
    },
    {
      title: 'Career Progress',
      value: '67%',
      change: '+15% this month',
      icon: TrendingUp,
      color: 'text-secondary-400'
    },
    {
      title: 'Mood Score',
      value: '8.2',
      change: 'Excellent',
      icon: Heart,
      color: 'text-pink-400'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">
            Assalamu Alaikum! ✨
          </h1>
          <p className="text-xl text-white/80">
            Continue your journey of growth and spiritual development
          </p>
        </div>

        {/* Today's Focus Card */}
        <div className={`glass-morphism-card rounded-2xl p-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Today's Focus</h3>
              <p className="text-white/70">
                "And whoever relies upon Allah - then He is sufficient for him." - Quran 65:3
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">Fajr Prayer</p>
              <p className="text-lg font-semibold text-primary-400">5:42 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`glass-morphism-card rounded-xl p-4 hover-float transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-xs text-white/60">{stat.change}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Feature Cards */}
      <div className="space-y-6">
        <div className={`flex items-center justify-between transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold text-white">Explore Features</h2>
          <div className="flex items-center text-primary-400 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: now
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featureCards.map((card, index) => (
            <Link
              key={card.id}
              href={card.href}
              className={`group block transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              <div className="glass-morphism-card rounded-2xl p-6 hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 group">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex items-center text-white/60 group-hover:text-primary-400 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
                      {card.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-sm text-white/60">{card.stats}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white/80">Popular</span>
                    </div>
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className={`text-2xl font-bold text-white transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              className={`group transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${1100 + index * 100}ms` }}
            >
              <div className="glass-morphism rounded-xl p-4 hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">
                  {action.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-6">
        <h2 className={`text-2xl font-bold text-white transition-all duration-1000 delay-1300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Recent Activity
        </h2>
        
        <div className={`glass-morphism-card rounded-2xl p-6 transition-all duration-1000 delay-1400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="space-y-4">
            {[
              { action: 'Completed career assessment', time: '2 hours ago', icon: Award, color: 'text-blue-400' },
              { action: 'Read morning duas', time: '6 hours ago', icon: Heart, color: 'text-green-400' },
              { action: 'Chatted with AI Imam', time: '1 day ago', icon: MessageCircle, color: 'text-purple-400' },
              { action: 'Logged mood entry', time: '2 days ago', icon: PenTool, color: 'text-orange-400' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white/90">{activity.action}</p>
                  <p className="text-white/50 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
