'use client'

import { useState, useEffect } from 'react'
import { HiSparkles, HiBars3, HiXMark } from 'react-icons/hi2'
import { FiArrowRight } from 'react-icons/fi'

/**
 * Navigation Component
 * 
 * A responsive navigation bar with:
 * - Blur effect on scroll
 * - Mobile hamburger menu
 * - Smooth scroll to sections
 * - Call-to-action button
 * - Logo with gradient effects
 * 
 * Features:
 * - Auto-hide/show on scroll
 * - Glass morphism design
 * - Mobile-first responsive design
 * - Smooth animations
 */
export default function Navigation() {
  // State management
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Navigation items configuration
  const navItems = [
    { label: 'Features', href: '#features', description: 'Explore our AI-powered tools' },
    { label: 'How it Works', href: '#how-it-works', description: 'Simple 4-step process' },
    { label: 'Testimonials', href: '#testimonials', description: 'Student success stories' },
    { label: 'Pricing', href: '#pricing', description: 'Plans for every journey' },
  ]

  // Scroll behavior effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update scrolled state for blur effect
      setIsScrolled(currentScrollY > 50)
      
      // Auto-hide navigation on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const optimizedHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', optimizedHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', optimizedHandleScroll)
  }, [lastScrollY])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('#mobile-menu')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  /**
   * Handle smooth scroll to section
   * @param {string} href - Target section ID
   */
  const handleScrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      const navHeight = 80
      const elementPosition = element.offsetTop - navHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled 
            ? 'bg-neural-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20' 
            : 'bg-transparent'
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div 
                className="
                  relative w-11 h-11 rounded-2xl overflow-hidden
                  bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500
                  group-hover:scale-110 transition-transform duration-300
                  shadow-lg shadow-primary-500/25
                "
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 animate-gradient-xy" />
                
                {/* Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <HiSparkles className="w-6 h-6 text-white" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-gradient-primary">
                  SoulEase
                </span>
                <span className="text-xs text-neutral-400 font-medium tracking-wide">
                  AI-Powered Spiritual Guidance
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollToSection(item.href)}
                  className="
                    group relative px-4 py-2 rounded-xl text-neutral-300 hover:text-white 
                    transition-all duration-300 focus-visible
                  "
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {/* Hover background */}
                  <div className="
                    absolute inset-0 rounded-xl bg-white/5 scale-95 opacity-0 
                    group-hover:scale-100 group-hover:opacity-100 
                    transition-all duration-300
                  " />
                  
                  {/* Text */}
                  <span className="relative z-10 font-medium">
                    {item.label}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="
                    absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                    bg-neural-900 text-white text-xs px-3 py-2 rounded-lg
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none whitespace-nowrap
                    border border-white/10
                  ">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="btn-ghost">
                Sign In
              </button>
              
              <button className="
                group relative overflow-hidden
                px-6 py-3 rounded-2xl font-semibold text-white
                bg-gradient-to-r from-primary-600 to-accent-600
                hover:from-primary-500 hover:to-accent-500
                shadow-lg shadow-primary-600/25 
                hover:shadow-xl hover:shadow-primary-600/40
                hover:scale-105 transition-all duration-300
                focus-visible
              ">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                
                {/* Button content */}
                <div className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                lg:hidden p-2 rounded-xl text-white hover:bg-white/10 
                transition-colors duration-300 focus-visible
              "
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <HiBars3 className={`
                  absolute inset-0 w-6 h-6 transition-all duration-300
                  ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}
                `} />
                <HiXMark className={`
                  absolute inset-0 w-6 h-6 transition-all duration-300
                  ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}
                `} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out
          ${isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          id="mobile-menu"
          className={`
            absolute top-20 left-6 right-6 
            glass-morphism-strong rounded-3xl border border-white/20
            transform transition-all duration-500 ease-out
            ${isMobileMenuOpen 
              ? 'translate-y-0 scale-100 opacity-100' 
              : '-translate-y-8 scale-95 opacity-0'
            }
          `}
        >
          {/* Menu Items */}
          <div className="p-6 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleScrollToSection(item.href)}
                className="
                  w-full text-left p-4 rounded-2xl text-white
                  hover:bg-white/10 transition-all duration-300
                  animate-fade-in-up focus-visible
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-semibold text-lg">{item.label}</div>
                <div className="text-sm text-neutral-400 mt-1">{item.description}</div>
              </button>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-6 space-y-3 border-t border-white/10">
              <button className="
                w-full py-4 text-center rounded-2xl font-semibold text-white
                bg-white/10 hover:bg-white/20 transition-all duration-300
                animate-fade-in-up focus-visible
              " style={{ animationDelay: '400ms' }}>
                Sign In
              </button>
              
              <button className="
                w-full py-4 text-center rounded-2xl font-semibold text-white
                bg-gradient-to-r from-primary-600 to-accent-600
                hover:from-primary-500 hover:to-accent-500
                shadow-lg shadow-primary-600/25 
                animate-fade-in-up focus-visible
              " style={{ animationDelay: '500ms' }}>
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}