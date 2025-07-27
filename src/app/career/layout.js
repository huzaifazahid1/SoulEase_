'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function CareerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Navigation items
  const navItems = [
    { 
      path: '/career', 
      label: 'Overview', 
      icon: '🏠',
      description: 'Career discovery home'
    },
    { 
      path: '/career/assessment', 
      label: 'Assessment', 
      icon: '📝',
      description: 'Take career assessment'
    },
    { 
      path: '/career/results', 
      label: 'Results', 
      icon: '🎯',
      description: 'View recommendations'
    },
    { 
      path: '/career/saved', 
      label: 'Saved', 
      icon: '💾',
      description: 'Your saved careers'
    }
  ];

  return (
    <div className="min-h-screen bg-neural-950">
      {/* Top navigation bar */}
      <nav className="nav-blur">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="flex items-center justify-between py-4">
            {/* Logo/Brand */}
            <div 
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                C
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Career Advisor</h1>
                <p className="text-white/50 text-xs">Discover Your Path</p>
              </div>
            </div>

            {/* Navigation menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                      flex items-center space-x-2 group
                      ${isActive 
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile navigation - expandable */}
          <div className="md:hidden pb-4">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`
                      p-3 rounded-xl text-sm font-medium transition-all duration-300
                      ${isActive 
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                        : 'text-white/70 hover:text-white bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-neural-900/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto container-padding py-12">
          <div className="text-center">
            <div className="flex justify-center space-x-8 mb-8">
              <button 
                onClick={() => router.push('/career')}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Overview
              </button>
              <button 
                onClick={() => router.push('/career/assessment')}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Take Assessment
              </button>
              <button 
                onClick={() => router.push('/career/saved')}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                Saved Careers
              </button>
            </div>
            <p className="text-white/40 text-sm">
              © 2025 Career Advisor. Helping you discover your ideal career path.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}