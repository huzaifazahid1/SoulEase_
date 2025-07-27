'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  FiRocket, FiBookOpen, FiBarChart3, FiUsers, FiMic, FiZap, FiArrowRight      //FiRocket,FiBarChart3
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

/**
 * Features Section Component
 * 
 * Displays the main features of SoulEase with:
 * - Animated cards with hover effects
 * - Intersection Observer for scroll animations
 * - 3D tilt effects on card hover
 * - Gradient backgrounds and icons
 * - Responsive grid layout
 */
export default function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)

  // Features data with enhanced descriptions
  const features = [
    {
      id: 1,
      icon: <FiMic className="w-8 h-8" />,
      title: "AI Career Navigator",
      description:
        "AI-powered guidance that blends Islamic principles with modern analytics to map your career path, suggest skills, and guide your long-term professional journey.",
      gradient: "from-blue-600 via-purple-600 to-indigo-600",
      bgGradient: "from-blue-500/10 to-purple-500/10",
      borderGradient: "from-blue-500/50 to-purple-500/50",
      features: [
        "Personalized AI career plans",
        "Skills & strengths mapping",
        "Industry & future insights",
        "Islamic values alignment"
      ]
    },
    {
      id: 2,
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Emotional AI Tracker",
      description:
        "Advanced AI mood tracking with beautiful visualizations and tailored recommendations for emotional balance, combining Islamic therapy and modern science.",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderGradient: "from-purple-500/50 to-pink-500/50",
      features: [
        "AI-driven emotion tracking",
        "Visual emotional insights",
        "Personalized healing tips",
        "Weekly well-being reports"
      ]
    },
    {
      id: 3,
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Sacred Knowledge Hub",
      description:
        "Your digital library for Quran, Hadith, and Duas with powerful search and daily inspiration, crafted to keep you connected with authentic Islamic wisdom.",
      gradient: "from-emerald-600 via-teal-600 to-green-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderGradient: "from-emerald-500/50 to-teal-500/50",
      features: [
        "Quran verses & tafsir",
        "Authentic Hadith access",
        "Powerful dua collection",
        "Search & daily reminders"
      ]
    },
    {
      id: 4,
      icon: <FiUsers className="w-8 h-8" />,
      title: "Mentor & Healing Space",
      description:
        "Safe community spaces where brothers, sisters, and imams guide you with emotional support, Islamic mentorship, and mental well-being activities.",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      bgGradient: "from-orange-500/10 to-red-500/10",
      borderGradient: "from-orange-500/50 to-red-500/50",
      features: [
        "Verified mentor guidance",
        "Faith-based healing",
        "Peer discussion circles",
        "1-to-1 imam sessions"
      ]
    },
    {
      id: 5,
      icon: <FiMic className="w-8 h-8" />,
      title: "Divine Audio Library",
      description:
        "Curated Quran recitations, relaxing sounds, and guided meditations to uplift your focus, connect spiritually, and create a peaceful study environment.",
      gradient: "from-indigo-600 via-blue-600 to-cyan-600",
      bgGradient: "from-indigo-500/10 to-blue-500/10",
      borderGradient: "from-indigo-500/50 to-blue-500/50",
      features: [
        "Quranic recitations",
        "Meditation guidance",
        "Focus soundscapes",
        "Study-friendly playlists"
      ]
    },
    {
      id: 6,
      icon: <HiSparkles className="w-8 h-8" />,
      title: "Holistic Success Hub",
      description:
        "All-in-one system for personal growth, mental health balance, and academic progress powered by Islamic lifestyle habits and modern goal-tracking.",
      gradient: "from-pink-600 via-rose-600 to-red-600",
      bgGradient: "from-pink-500/10 to-rose-500/10",
      borderGradient: "from-pink-500/50 to-rose-500/50",
      features: [
        "Wellness & balance tools",
        "Faith-based goal setting",
        "Performance tracking",
        "Progress visual analytics"
      ]
    }
  ];
  

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId)
            setVisibleCards(prev => new Set([...prev, cardId]))
          }
        })
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-card-id]')
    cards?.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  /**
   * Handle card hover with 3D tilt effect
   */
  const handleCardHover = (cardId, event) => {
    setHoveredCard(cardId)
    
    // Calculate mouse position for tilt effect
    if (event && event.currentTarget) {
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    }
  }

  /**
   * Reset card transform on mouse leave
   */
  const handleCardLeave = (event) => {
    setHoveredCard(null)
    if (event.currentTarget) {
      event.currentTarget.style.transform = ''
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="section-padding container-padding relative overflow-hidden"
      id="features"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-neural-950 via-neural-900/50 to-neural-950" />
      <div className="absolute inset-0 bg-neural-pattern opacity-5" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full border border-primary-500/30 mb-8">
            <FiZap className="w-5 h-5 text-primary-400 animate-pulse" />
            <span className="text-sm font-semibold text-primary-400 tracking-wide">
              POWERFUL FEATURES
            </span>
          </div>
          
          {/* Main Heading */}
          <h2 className="font-display font-bold mb-8">
            <span className="block text-5xl md:text-7xl text-white mb-4">
              Next-Gen
            </span>
            <span className="block text-5xl md:text-7xl text-gradient-primary">
              Solutions
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the perfect fusion of artificial intelligence, Islamic spirituality, 
            and evidence-based psychology in our comprehensive platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              data-card-id={feature.id}
              className={`
                group relative h-full cursor-pointer
                transition-all duration-700 ease-out
                ${visibleCards.has(feature.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transformStyle: 'preserve-3d'
              }}
              onMouseMove={(e) => handleCardHover(feature.id, e)}
              onMouseLeave={handleCardLeave}
            >
              {/* Card Container */}
              <div className={`
                relative h-full p-8 rounded-3xl border overflow-hidden
                glass-morphism-card hover:border-white/30
                transition-all duration-500
                ${hoveredCard === feature.id ? 'shadow-2xl' : 'shadow-lg'}
              `}>
                
                {/* Animated Background Gradient */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${feature.bgGradient} 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                `} />
                
                {/* Border Gradient on Hover */}
                <div className={`
                  absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-br ${feature.borderGradient} 
                  transition-opacity duration-500 pointer-events-none
                `} style={{ padding: '1px' }}>
                  <div className="w-full h-full rounded-3xl bg-neural-950" />
                </div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`
                      inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient}
                      group-hover:scale-110 group-hover:rotate-6
                      transition-all duration-500 shadow-lg
                    `}>
                      <div className="text-white relative z-10">
                        {feature.icon}
                      </div>
                      
                      {/* Icon Glow Effect */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-br ${feature.gradient} 
                        rounded-2xl blur-xl opacity-0 group-hover:opacity-50
                        transition-opacity duration-500
                      `} />
                    </div>
                    
                    {/* Floating Particles */}
                    {hoveredCard === feature.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`
                              absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full
                              animate-ping opacity-60
                            `}
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${10 + i * 10}%`,
                              animationDelay: `${i * 200}ms`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Feature List */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                        <span className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Learn More Button */}
                  <button className="
                    inline-flex items-center space-x-2 
                    text-primary-400 hover:text-primary-300 
                    font-semibold transition-all duration-300
                    group-hover:translate-x-2 transform
                  ">
                    <span>Learn More</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Shine Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000
                  pointer-events-none
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center space-y-6 p-8 glass-morphism-strong rounded-3xl border border-white/10">
            <div className="text-2xl font-bold text-white mb-2">
              Ready to experience the future of spiritual growth?
            </div>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who have transformed their mental health journey through our AI-powered platform.
            </p>
            <button className="btn-primary group">
              <span>Start Your Free Trial</span>
              <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}