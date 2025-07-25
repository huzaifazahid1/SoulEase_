'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { HiSparkles, HiAcademicCap } from 'react-icons/hi2'
import { FiArrowRight, FiPlay, FiUsers, FiStar, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

/**
 * Hero Section Component
 * 
 * Features:
 * - Full-screen hero with image carousel
 * - Parallax mouse tracking effects
 * - Animated text reveals
 * - Statistics counter animations
 * - Call-to-action buttons with micro-interactions
 * - Responsive design with mobile optimizations
 */
export default function HeroSection() {
  // State management
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Refs
  const heroRef = useRef(null)
  const swiperRef = useRef(null)

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center&q=80",
      title: "Transform Your Mental Journey",
      subtitle: "Where Faith Meets AI Innovation",
      description: "Discover clarity through Islamic wisdom and cutting-edge technology",
      gradient: "from-emerald-900/90 via-primary-900/80 to-secondary-900/70"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&h=1080&fit=crop&crop=center&q=80",
      title: "Find Your Purpose",
      subtitle: "Career Clarity Through Spiritual Growth",
      description: "AI-powered guidance rooted in Islamic principles",
      gradient: "from-secondary-900/90 via-accent-900/80 to-primary-900/70"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1920&h=1080&fit=crop&crop=center&q=80",
      title: "From Anxiety to Peace",
      subtitle: "Your Journey Starts Here",
      description: "Anonymous, secure, and spiritually aligned mental health support",
      gradient: "from-primary-900/90 via-emerald-900/80 to-accent-900/70"
    }
  ]

  // Statistics data with animation
  const stats = [
    { number: 25000, suffix: '+', label: 'Students Helped', icon: <FiUsers className="w-5 h-5" /> },
    { number: 95, suffix: '%', label: 'Satisfaction Rate', icon: <FiStar className="w-5 h-5" /> },
    { number: 150, suffix: '+', label: 'Universities', icon: <HiAcademicCap className="w-5 h-5" /> },
    { number: 24, suffix: '/7', label: 'AI Support', icon: <FiZap className="w-5 h-5" /> }
  ]

  // Component mount effect
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  /**
   * Animated Counter Hook
   * @param {number} end - Target number
   * @param {number} duration - Animation duration in ms
   */
  const useAnimatedCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      if (!isLoaded) return
      
      let startTime = null
      const startValue = 0
      
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = startValue + (end - startValue) * easeOutQuart
        
        setCount(Math.floor(currentCount))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, [end, duration, isLoaded])
    
    return count
  }

  /**
   * Scroll to section handler
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-neural-950"
      id="hero"
      role="banner"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1500}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="w-full h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                {/* Background Image with Parallax */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px) scale(1.1)`
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
                
                {/* Neural Pattern Overlay */}
                <div className="absolute inset-0 bg-neural-pattern opacity-20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-2xl animate-float" />
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-full blur-2xl animate-float" 
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-r from-accent-500/20 to-secondary-500/20 rounded-full blur-2xl animate-float" 
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center h-full container-padding">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Trust Badge */}
          <div className={`
            mb-8 inline-flex items-center space-x-3 px-6 py-3 
            glass-morphism rounded-full border border-white/20
            ${isLoaded ? 'animate-fade-in-down' : 'opacity-0'}
          `}>
            <HiSparkles className="w-5 h-5 text-primary-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Trusted by <span className="text-primary-400 font-semibold">25,000+</span> Students Worldwide
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
          <h1 className="font-display font-black leading-tight mb-8">
            {/* Animated word reveal */}
            <div className="text-6xl md:text-8xl">
              {heroSlides[currentSlide]?.title.split(' ').map((word, i) => (
                <span
                  key={`${currentSlide}-${i}`}
                  className={`
                    inline-block mr-4 mb-2
                    ${i % 2 === 0 
                      ? 'text-white' 
                      : 'text-gradient-primary'
                    }
                    ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}
                  `}
                  style={{ 
                    animationDelay: `${i * 200 + 300}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
            
            {/* Subtitle */}
            <div className={`
              text-4xl md:text-6xl mt-6 font-light text-primary-400
              ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}
            `} style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              {heroSlides[currentSlide]?.subtitle}
            </div>
          </h1>

          {/* Description */}
          <p className={`
            text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light
            ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}
          `} style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            {heroSlides[currentSlide]?.description}
          </p>

          {/* CTA Buttons */}
          <div className={`
            flex flex-col sm:flex-row gap-6 justify-center items-center mb-16
            ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}
          `} style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
            
            {/* Primary CTA */}
            <button 
              onClick={() => scrollToSection('features')}
              className="
                group relative overflow-hidden
                px-10 py-5 rounded-2xl font-bold text-lg text-white
                bg-gradient-to-r from-primary-600 to-accent-600
                hover:from-primary-500 hover:to-accent-500
                shadow-2xl shadow-primary-600/30 
                hover:shadow-3xl hover:shadow-primary-600/50
                hover:scale-105 transform transition-all duration-500
                focus-visible
              "
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Button content */}
              <div className="relative z-10 flex items-center space-x-3">
                <span>Start Your Journey</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>

            {/* Secondary CTA */}
            <button className="
              group relative overflow-hidden
              px-10 py-5 rounded-2xl font-semibold text-lg text-white
              glass-morphism hover:bg-white/15
              border border-white/20 hover:border-white/40
              transition-all duration-300
              focus-visible
            ">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <FiPlay className="w-5 h-5" />
                  <div className="absolute inset-0 bg-primary-400 rounded-full opacity-20 animate-ping" />
                </div>
                <span>Watch Demo</span>
              </div>
            </button>
          </div>

          {/* Statistics */}
          <div className={`
            grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto
            ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}
          `} style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }}>
            {stats.map((stat, index) => {
              const count = useAnimatedCounter(stat.number, 2000 + index * 200)
              
              return (
                <div key={stat.label} className="text-center group">
                  {/* Icon */}
                  <div className="
                    inline-flex items-center justify-center w-16 h-16 mb-4
                    bg-gradient-to-br from-primary-500/20 to-accent-500/20
                    rounded-2xl border border-white/10
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300
                  ">
                    <div className="text-primary-400">
                      {stat.icon}
                    </div>
                  </div>
                  
                  {/* Number */}
                  <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                    {count.toLocaleString()}{stat.suffix}
                  </div>
                  
                  {/* Label */}
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentSlide 
                  ? 'w-12 bg-primary-400' 
                  : 'w-8 bg-white/30 hover:bg-white/50'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="
          absolute left-8 top-1/2 transform -translate-y-1/2 z-30
          p-4 glass-morphism rounded-full 
          hover:bg-white/15 transition-all duration-300 group
          focus-visible
        "
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
      
      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="
          absolute right-8 top-1/2 transform -translate-y-1/2 z-30
          p-4 glass-morphism rounded-full 
          hover:bg-white/15 transition-all duration-300 group
          focus-visible
        "
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="flex flex-col items-center space-y-2 animate-bounce-slow">
          <span className="text-xs text-white/60 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}