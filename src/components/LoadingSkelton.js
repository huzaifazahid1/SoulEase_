'use client'

import { useState, useEffect } from 'react'
import { HiSparkles } from 'react-icons/hi2'

/**
 * Loading Skeleton Component with Islamic Patterns
 * 
 * Features:
 * - Islamic geometric patterns as loading animations
 * - Crescent moon and star animations
 * - Bismillah text reveal
 * - Gradient shimmer effects
 * - Progressive loading states
 */
export default function LoadingSkeleton({ isLoading = true, children }) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('connecting') // connecting, blessing, ready
  
  // Loading phases with Islamic context
  const loadingPhases = [
    { phase: 'connecting', text: 'Connecting to your spiritual journey...', duration: 2000 },
    { phase: 'blessing', text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم', duration: 1500 },
    { phase: 'ready', text: 'Welcome to SoulEase', duration: 1000 }
  ]

  // Progress simulation
  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [isLoading])

  // Phase progression
  useEffect(() => {
    if (!isLoading) return

    const timeouts = []
    let currentTime = 0

    loadingPhases.forEach((phase, index) => {
      const timeout = setTimeout(() => {
        setCurrentPhase(phase.phase)
      }, currentTime)
      
      timeouts.push(timeout)
      currentTime += phase.duration
    })

    return () => timeouts.forEach(clearTimeout)
  }, [isLoading])

  if (!isLoading) {
    return children
  }

  return (
    <div className="fixed inset-0 z-50 bg-neural-950 flex items-center justify-center overflow-hidden">
      
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #14b8a6 2px, transparent 2px),
            radial-gradient(circle at 75% 25%, #a855f7 2px, transparent 2px),
            radial-gradient(circle at 25% 75%, #ec4899 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #14b8a6 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          animation: 'float 8s ease-in-out infinite'
        }} />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        
        {/* Islamic Geometric Loader */}
        <div className="relative mb-12">
          
          {/* Outer Ring - 8-pointed star pattern */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 animate-spin-slow">
              <svg viewBox="0 0 128 128" className="w-full h-full">
                <defs>
                  <linearGradient id="islamicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                
                {/* 8-pointed Islamic star */}
                <path
                  d="M64 8 L76 28 L96 16 L84 36 L104 48 L84 60 L96 80 L76 68 L64 88 L52 68 L32 80 L44 60 L24 48 L44 36 L32 16 L52 28 Z"
                  fill="none"
                  stroke="url(#islamicGradient)"
                  strokeWidth="2"
                  className="animate-pulse-slow"
                />
                
                {/* Inner geometric pattern */}
                <circle
                  cx="64"
                  cy="64"
                  r="16"
                  fill="none"
                  stroke="url(#islamicGradient)"
                  strokeWidth="1"
                  className="animate-breathe"
                />
              </svg>
            </div>
            
            {/* Crescent Moon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary-400">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.08-1.37C15.04 21.5 13.08 22 11 22 5.48 22 1 17.52 1 12S5.48 2 11 2c2.08 0 4.04.5 6.08 1.37C15.58 2.5 13.85 2 12 2z"
                />
              </svg>
            </div>
            
            {/* Sparkles around the loader */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  top: `${20 + Math.sin((i * 60) * Math.PI / 180) * 60}px`,
                  left: `${64 + Math.cos((i * 60) * Math.PI / 180) * 60}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s'
                }}
              >
                <HiSparkles className="w-3 h-3 text-primary-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar with Islamic Pattern */}
        <div className="mb-8">
          <div className="w-full h-2 bg-neural-800 rounded-full overflow-hidden relative">
            {/* Islamic pattern overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(20, 184, 166, 0.3) 4px, rgba(20, 184, 166, 0.3) 8px)'
              }}
            />
            
            {/* Progress fill */}
            <div 
              className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-x rounded-full" />
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="text-center mt-3 text-sm text-primary-400 font-medium">
            {loadingProgress}%
          </div>
        </div>

        {/* Loading Text with Phase Animation */}
        <div className="min-h-[60px] flex items-center justify-center">
          {currentPhase === 'connecting' && (
            <div className="animate-fade-in-up">
              <p className="text-white/80 text-lg font-medium">
                {loadingPhases[0].text}
              </p>
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {currentPhase === 'blessing' && (
            <div className="animate-fade-in-up">
              <p className="text-white text-2xl font-light mb-2" dir="rtl">
                {loadingPhases[1].text}
              </p>
              <p className="text-primary-400 text-sm italic">
                "In the name of Allah, the Most Gracious, the Most Merciful"
              </p>
            </div>
          )}
          
          {currentPhase === 'ready' && (
            <div className="animate-scale-in">
              <p className="text-white text-xl font-semibold mb-2">
                {loadingPhases[2].text}
              </p>
              <p className="text-primary-400 text-sm">
                Your spiritual journey begins now
              </p>
            </div>
          )}
        </div>

        {/* Islamic Calligraphy Decoration */}
        <div className="mt-8 opacity-60">
          <svg width="120" height="40" viewBox="0 0 120 40" className="mx-auto">
            <defs>
              <linearGradient id="calligraphyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            
            {/* Simplified Arabic calligraphy-inspired design */}
            <path
              d="M10 20 Q30 10 50 20 T90 20 Q100 15 110 20"
              fill="none"
              stroke="url(#calligraphyGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse-slow"
            />
            <circle cx="25" cy="20" r="3" fill="url(#calligraphyGradient)" className="animate-pulse" />
            <circle cx="75" cy="20" r="3" fill="url(#calligraphyGradient)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>
      </div>

      {/* Corner Islamic Patterns */}
      <div className="absolute top-4 left-4 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path
            d="M30 5 L35 15 L45 10 L40 20 L50 25 L40 30 L45 40 L35 35 L30 45 L25 35 L15 40 L20 30 L10 25 L20 20 L15 10 L25 15 Z"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="1"
            className="animate-spin-slow"
          />
        </svg>
      </div>
      
      <div className="absolute top-4 right-4 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path
            d="M30 5 L35 15 L45 10 L40 20 L50 25 L40 30 L45 40 L35 35 L30 45 L25 35 L15 40 L20 30 L10 25 L20 20 L15 10 L25 15 Z"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            className="animate-spin-slow"
            style={{ animationDirection: 'reverse' }}
          />
        </svg>
      </div>
      
      <div className="absolute bottom-4 left-4 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path
            d="M30 5 L35 15 L45 10 L40 20 L50 25 L40 30 L45 40 L35 35 L30 45 L25 35 L15 40 L20 30 L10 25 L20 20 L15 10 L25 15 Z"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1"
            className="animate-spin-slow"
          />
        </svg>
      </div>
      
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path
            d="M30 5 L35 15 L45 10 L40 20 L50 25 L40 30 L45 40 L35 35 L30 45 L25 35 L15 40 L20 30 L10 25 L20 20 L15 10 L25 15 Z"
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            className="animate-spin-slow"
            style={{ animationDirection: 'reverse' }}
          />
        </svg>
      </div>
    </div>
  )
}

/**
 * Page Loading Skeleton
 * 
 * Skeleton loader for individual page sections
 */
export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-8 p-6">
      
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-gradient-to-r from-neural-800 to-neural-700 rounded-lg w-3/4 mx-auto" />
        <div className="h-4 bg-gradient-to-r from-neural-800 to-neural-700 rounded w-1/2 mx-auto" />
      </div>
      
      {/* Cards skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-morphism rounded-3xl p-6 border border-white/10">
            <div className="space-y-4">
              {/* Icon placeholder */}
              <div className="w-12 h-12 bg-gradient-to-r from-primary-800 to-accent-800 rounded-xl mx-auto" />
              
              {/* Text placeholders */}
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-neural-800 to-neural-700 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gradient-to-r from-neural-800 to-neural-700 rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-neural-800 to-neural-700 rounded w-5/6" />
              </div>
              
              {/* Button placeholder */}
              <div className="h-10 bg-gradient-to-r from-primary-800 to-accent-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Text Loading Skeleton
 * 
 * For loading text content with Islamic pattern
 */
export function TextSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i}
          className="h-4 bg-gradient-to-r from-neural-800 via-neural-700 to-neural-800 rounded"
          style={{ 
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}