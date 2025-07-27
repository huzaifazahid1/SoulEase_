'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Heart, 
  BookOpen, 
  MessageCircle, 
  PenTool, 
  Home,
  Briefcase,
  ClipboardList,
  Target,
  Archive,
  Bookmark,
  Quote,
  Moon,
  UserCheck,
  Users,
  UserPlus,
  Calendar,
  BarChart3,
  History,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

/**
 * Dashboard Layout Component
 * 
 * This layout provides:
 * - Responsive sidebar navigation
 * - Top header with branding
 * - Main content area for pages
 * - Modern glassmorphism design
 */
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Navigation structure matching your app structure
  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: pathname === '/dashboard'
    },
    {
      name: 'Career Advisor',
      icon: Briefcase,
      children: [
        { name: 'Overview', href: '/career', icon: Target },
        { name: 'Assessment', href: '/career/assessment', icon: ClipboardList },
        { name: 'Results', href: '/career/results', icon: BarChart3 },
        { name: 'Saved Paths', href: '/career/saved', icon: Archive }
      ]
    },
    {
      name: 'Islamic Content',
      icon: BookOpen,
      children: [
        { name: 'Daily Reminders', href: '/islamic-content', icon: Sparkles },
        { name: 'Duas', href: '/islamic-content/duas', icon: Heart },
        { name: 'Hadiths', href: '/islamic-content/hadiths', icon: Quote },
        { name: 'Quran', href: '/islamic-content/quran', icon: Moon }
      ]
    },
    {
      name: 'AI Mentors',
      icon: MessageCircle,
      children: [
        { name: 'Choose Mentor', href: '/mentor', icon: Users },
        { name: 'Wise Imam', href: '/mentor/imam', icon: UserCheck },
        { name: 'Gentle Sister', href: '/mentor/sister', icon: UserPlus },
        { name: 'Friendly Brother', href: '/mentor/brother', icon: UserPlus }
      ]
    },
    {
      name: 'Journal & Mood',
      icon: PenTool,
      children: [
        { name: 'Emotion Tracker', href: '/journal', icon: Heart },
        { name: 'New Entry', href: '/journal/entry', icon: Calendar },
        { name: 'Analytics', href: '/journal/analytics', icon: BarChart3 },
        { name: 'History', href: '/journal/history', icon: History }
      ]
    }
  ];

  // Check if current path matches any navigation item
  const isActivePath = (href) => pathname === href || pathname.startsWith(href + '/');

  // Navigation item component for cleaner code
  const NavigationItem = ({ item, isChild = false }) => {
    const Icon = item.icon;
    const isActive = isActivePath(item.href);
    
    return (
      <Link
        href={item.href}
        className={`
          group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300
          ${isChild ? 'ml-6 pl-6' : ''}
          ${isActive 
            ? 'bg-gradient-to-r from-primary-600/20 to-accent-600/20 text-primary-300 border-l-2 border-primary-500' 
            : 'text-white/70 hover:text-white hover:bg-white/5'
          }
        `}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-primary-400' : 'text-white/50 group-hover:text-white/80'}`} />
        <span className="truncate">{item.name}</span>
        {isActive && (
          <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
        )}
      </Link>
    );
  };

  // Sidebar component
  const Sidebar = ({ className = '' }) => (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Logo/Brand Section */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient-primary">SoulEase</h1>
            <p className="text-xs text-white/60">Your spiritual companion</p>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5 text-white/70" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.href ? (
              <NavigationItem item={item} />
            ) : (
              <div>
                {/* Parent category header */}
                <div className="flex items-center px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </div>
                {/* Child navigation items */}
                <div className="space-y-1">
                  {item.children.map((child) => (
                    <NavigationItem key={child.href} item={child} isChild={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom section with user info or actions */}
      <div className="p-4 border-t border-white/10">
        <div className="glass-morphism rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Welcome back!</p>
              <p className="text-xs text-white/60 truncate">Continue your journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-neural-950 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 glass-morphism-strong border-r border-white/20">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-80 md:flex-col">
        <div className="glass-morphism-strong border-r border-white/20">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-80 flex flex-col h-full">
        {/* Top header */}
        <header className="glass-morphism border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg glass-morphism hover:bg-white/10 transition-colors"
            >
              <Menu className="h-5 w-5 text-white" />
            </button>

            {/* Page title or breadcrumb could go here */}
            <div className="flex-1 md:ml-0 ml-4">
              <h2 className="text-lg font-semibold text-white/90">
                {pathname === '/dashboard' 
                  ? 'Dashboard Overview' 
                  : pathname.split('/').pop().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                }
              </h2>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg glass-morphism hover:bg-white/10 transition-colors">
                <Sparkles className="h-5 w-5 text-white/70" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-neural-950/50">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
