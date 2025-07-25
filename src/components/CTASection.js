'use client'

import { useState, useEffect } from 'react'
import { FiArrowRight, FiCheck, FiCalendar, FiShield, FiStar } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

/**
 * Call-to-Action Section Component
 * 
 * Features:
 * - Final conversion opportunity with compelling offer
 * - Multiple CTA options (free trial, demo, contact)
 * - Risk reduction elements and trust signals
 * - Background imagery for emotional connection
 * - Countdown timer for urgency (optional)
 * - Islamic quote for spiritual connection
 */
export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  // Inspirational Islamic quotes
  const islamicQuotes = [
    {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      english: "And whoever fears Allah - He will make for him a way out",
      reference: "Quran 65:2"
    },
    {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      english: "Indeed, with hardship comes ease",
      reference: "Quran 94:6"
    },
    {
      arabic: "وَاللَّهُ غَالِبٌ عَلَىٰ أَمْرِهِ",
      english: "And Allah is predominant over His affair",
      reference: "Quran 12:21"
    }
  ]

  // Trust indicators
  const trustIndicators = [
    {
      icon: <FiCheck className="w-5 h-5" />,
      text: "Free 14-day trial"
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      text: "No credit card required"
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      text: "Cancel anytime"
    }
  ]

  // Benefits for final push
  const finalBenefits = [
    "Start your spiritual growth journey today",
    "Join 25,000+ students worldwide",
    "Get instant access to AI counseling",
    "Connect with supportive community"
  ]

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('cta')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Quote rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % islamicQuotes.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding container-padding relative overflow-hidden" id="cta">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=800&fit=crop&crop=center&q=80"
          alt="Students studying together"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-900/85 to-neural-950/95" />
        <div className="absolute inset-0 bg-neural-pattern opacity-10" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-40 w-80 h-80 bg-gradient-to-r from-accent-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        
        {/* Top Badge */}
        <div className={`
          mb-8 inline-flex items-center space-x-3 px-6 py-3 
          glass-morphism rounded-full border border-white/20
          ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}
        `}>
          <HiSparkles className="w-6 h-6 text-primary-400 animate-pulse" />
          <span className="font-semibold text-white">
            Join the SoulEase Community Today
          </span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className="w-4 h-4 text-yellow-400 fill-current" 
              />
            ))}
          </div>
        </div>

        {/* Main Heading */}
        <h2 className={`
          font-display font-bold leading-tight mb-8
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '200ms' }}>
          <span className="block text-5xl md:text-7xl text-white mb-4">
            Ready to Transform Your
          </span>
          <span className="block text-5xl md:text-7xl text-gradient-primary">
            Spiritual Journey?
          </span>
        </h2>

        {/* Description */}
        <p className={`
          text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '400ms' }}>
          Join thousands of students who have found peace, purpose, and clarity through our 
          AI-powered Islamic mental health platform. Your journey to wholeness starts today.
        </p>

        {/* Islamic Quote */}
        <div className={`
          mb-12 max-w-3xl mx-auto
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '600ms' }}>
          <div className="glass-morphism-strong rounded-2xl p-8 border border-white/20 relative overflow-hidden">
            
            {/* Quote Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5" />
            
            <div className="relative z-10 transition-all duration-1000">
              {/* Arabic Text */}
              <div className="text-2xl md:text-3xl text-white font-light mb-4 leading-relaxed" dir="rtl">
                {islamicQuotes[currentQuote].arabic}
              </div>
              
              {/* English Translation */}
              <div className="text-lg md:text-xl text-white/80 italic mb-3 leading-relaxed">
                "{islamicQuotes[currentQuote].english}"
              </div>
              
              {/* Reference */}
              <div className="text-primary-400 font-semibold">
                — {islamicQuotes[currentQuote].reference}
              </div>
            </div>

            {/* Quote Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {islamicQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === currentQuote 
                      ? 'bg-primary-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`
          grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '800ms' }}>
          {finalBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <FiCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90 font-medium">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`
          flex flex-col sm:flex-row gap-6 justify-center items-center mb-12
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '1000ms' }}>
          
          {/* Primary CTA */}
          <button className="
            group relative overflow-hidden
            px-12 py-6 rounded-2xl font-bold text-xl text-white
            bg-gradient-to-r from-primary-600 to-accent-600
            hover:from-primary-500 hover:to-accent-500
            shadow-2xl shadow-primary-600/30 
            hover:shadow-3xl hover:shadow-primary-600/50
            hover:scale-105 transform transition-all duration-500
            focus-visible
          ">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Button content */}
            <div className="relative z-10 flex items-center space-x-3">
              <span>Begin Your Journey Now</span>
              <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>

          {/* Secondary CTA */}
          <button className="
            group px-12 py-6 rounded-2xl font-semibold text-xl text-white
            glass-morphism hover:bg-white/15 
            border border-white/20 hover:border-white/40
            transition-all duration-300
            focus-visible
          ">
            <div className="flex items-center space-x-3">
              <FiCalendar className="w-6 h-6" />
              <span>Schedule a Demo</span>
            </div>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className={`
          flex flex-wrap justify-center items-center gap-8 text-sm text-white/80
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '1200ms' }}>
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="text-primary-400">
                {indicator.icon}
              </div>
              <span className="font-medium">
                {indicator.text}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Trust Signals */}
        <div className={`
          mt-16 max-w-4xl mx-auto
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '1400ms' }}>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Privacy Promise */}
            <div className="glass-morphism rounded-2xl p-6 border border-white/10 text-center">
              <FiShield className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Privacy Guaranteed</h4>
              <p className="text-white/70 text-sm">
                Your conversations are encrypted and completely confidential
              </p>
            </div>

            {/* Support Promise */}
            <div className="glass-morphism rounded-2xl p-6 border border-white/10 text-center">
              <FiStar className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Expert Support</h4>
              <p className="text-white/70 text-sm">
                24/7 access to AI guidance and human counselors when needed
              </p>
            </div>

            {/* Community Promise */}
            <div className="glass-morphism rounded-2xl p-6 border border-white/10 text-center">
              <HiSparkles className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Vibrant Community</h4>
              <p className="text-white/70 text-sm">
                Connect with like-minded Muslim students from top universities
              </p>
            </div>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className={`
          mt-16 text-center
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `} style={{ animationDelay: '1600ms' }}>
          <p className="text-lg text-white/80 italic max-w-2xl mx-auto leading-relaxed">
            "Take the first step towards a balanced life where your faith, mental health, 
            and academic success work in harmony. Your future self will thank you."
          </p>
        </div>
      </div>
    </section>
  )
}