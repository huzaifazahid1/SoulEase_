'use client'

import { useState, useEffect } from 'react'
import { FiArrowUp, FiChevronUp } from 'react-icons/fi'

/**
 * Scroll to Top Component
 * 
 * Features:
 * - Floating action button for improved navigation
 * - Appears after user scrolls down significantly
 * - Smooth scroll animation back to top
 * - Progress indicator showing scroll position
 * - Accessibility features for keyboard navigation
 * - Modern design with gradient and hover effects
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      
      // Show button after scrolling 300px
      setIsVisible(scrolled > 300)
      
      // Calculate scroll progress percentage
      const progress = (scrolled / maxHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    // Throttle scroll events for better performance
    let ticking = false
    const optimizedToggleVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', optimizedToggleVisibility, { passive: true })
    
    return () => window.removeEventListener('scroll', optimizedToggleVisibility)
  }, [])

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <>
      {/* Main Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        onKeyDown={handleKeyDown}
        className="
          fixed bottom-8 right-8 z-50 group
          w-14 h-14 rounded-2xl
          bg-gradient-to-r from-primary-600 to-accent-600
          hover:from-primary-500 hover:to-accent-500
          shadow-lg shadow-primary-600/25 
          hover:shadow-xl hover:shadow-primary-600/40
          hover:scale-110 active:scale-95
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neural-950
          backdrop-blur-sm border border-white/10
        "
        aria-label="Scroll to top"
        title="Back to top"
      >
        {/* Progress Ring */}
        <div className="absolute inset-0 rounded-2xl">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 56 56">
            {/* Background circle */}
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>

        {/* Arrow Icon */}
        <div className="
          relative z-10 flex items-center justify-center w-full h-full
          group-hover:-translate-y-0.5 transition-transform duration-300
        ">
          <FiArrowUp className="w-6 h-6 text-white" />
        </div>

        {/* Shine Effect */}
        <div className="
          absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000
          pointer-events-none
        " />
      </button>

      {/* Secondary Mini Progress Indicator */}
      <div className="
        fixed bottom-8 right-24 z-40
        w-1 h-20 bg-white/10 rounded-full overflow-hidden
        backdrop-blur-sm border border-white/5
      ">
        <div 
          className="
            w-full bg-gradient-to-t from-primary-500 to-accent-500 rounded-full
            transition-all duration-300 ease-out
          "
          style={{ 
            height: `${scrollProgress}%`,
            transform: 'translateY(0)'
          }}
        />
      </div>

      {/* Floating Scroll Percentage (Optional, shows on hover) */}
      <div className="
        fixed bottom-24 right-8 z-40
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none
      ">
        <div className="
          px-3 py-2 glass-morphism rounded-lg border border-white/10
          text-white text-xs font-medium
          transform translate-y-2 group-hover:translate-y-0
          transition-transform duration-300
        ">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </>
  )
}