'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  FiShield, FiTarget, FiTrendingUp, FiCheckCircle 
} from 'react-icons/fi'
import { HiLightBulb } from 'react-icons/hi2'

/**
 * How It Works Section Component
 * 
 * Features:
 * - 4-step process with animated timeline
 * - Interactive step cards with hover effects
 * - Progress line animation on scroll
 * - Mobile-responsive stacked layout
 * - Islamic-themed icons and gradients
 */
export default function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState(new Set())
  const [activeStep, setActiveStep] = useState(1)
  const [progressWidth, setProgressWidth] = useState(0)
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

  // Steps data with enhanced descriptions
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Secure Onboarding",
      description: "Create your encrypted profile with advanced privacy protection and personalized spiritual preferences. Our secure platform ensures your data remains confidential while providing tailored experiences.",
      icon: <FiShield className="w-7 h-7" />,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      features: ["End-to-end encryption", "Privacy-first design", "Spiritual assessment", "Personalization setup"],
      duration: "2-3 minutes"
    },
    {
      id: 2,
      number: "02", 
      title: "AI-Powered Assessment",
      description: "Our advanced AI analyzes your mental health patterns and spiritual needs using Islamic psychological frameworks combined with modern therapeutic approaches.",
      icon: <HiLightBulb className="w-7 h-7" />,
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-500/10 to-purple-500/10",
      features: ["Comprehensive analysis", "Islamic framework", "Psychological insights", "Personalized recommendations"],
      duration: "5-7 minutes"
    },
    {
      id: 3,
      number: "03",
      title: "Personalized Journey",
      description: "Receive tailored guidance combining career counseling, spiritual growth, and mental wellness strategies designed specifically for your unique needs and goals.",
      icon: <FiTarget className="w-7 h-7" />,
      gradient: "from-purple-500 to-pink-500", 
      bgGradient: "from-purple-500/10 to-pink-500/10",
      features: ["Custom roadmap", "Multi-dimensional support", "Goal-oriented approach", "Flexible scheduling"],
      duration: "Ongoing daily"
    },
    {
      id: 4,
      number: "04",
      title: "Continuous Growth",
      description: "Track progress with advanced analytics and evolve your practice with AI-recommended spiritual and career milestones tailored to your Islamic values.",
      icon: <FiTrendingUp className="w-7 h-7" />,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10", 
      features: ["Progress tracking", "Advanced analytics", "Milestone celebrations", "Continuous optimization"],
      duration: "Weekly insights"
    }
  ]

  // Intersection Observer for step animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = parseInt(entry.target.dataset.stepId)
            setVisibleSteps(prev => new Set([...prev, stepId]))
            setActiveStep(stepId)
          }
        })
      },
      { threshold: 0.6, rootMargin: '-100px 0px' }
    )

    const steps = sectionRef.current?.querySelectorAll('[data-step-id]')
    steps?.forEach(step => observer.observe(step))

    return () => observer.disconnect()
  }, [])

  // Progress line animation
  useEffect(() => {
    const updateProgress = () => {
      if (sectionRef.current && timelineRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        const timelineRect = timelineRef.current.getBoundingClientRect()
        
        const sectionTop = sectionRect.top
        const sectionHeight = sectionRect.height
        const viewportHeight = window.innerHeight
        
        if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
          const scrollProgress = Math.max(0, Math.min(1, 
            (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
          ))
          setProgressWidth(scrollProgress * 100)
        }
      }
    }

    const throttledUpdate = () => {
      requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', throttledUpdate, { passive: true })
    updateProgress() // Initial call

    return () => window.removeEventListener('scroll', throttledUpdate)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="section-padding container-padding relative overflow-hidden" 
      id="how-it-works"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-900/50 to-secondary-900/30" />
      <div className="absolute inset-0 bg-neural-pattern opacity-5" />
      
      {/* Floating Orbs */}
      <div className="absolute top-32 left-32 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display font-bold mb-8">
            <span className="block text-5xl md:text-7xl text-white mb-4">
              Your Journey to
            </span>
            <span className="block text-5xl md:text-7xl text-gradient-primary">
              Clarity
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Four simple steps to transform your mental health and spiritual growth journey
          </p>
        </div>

        {/* Desktop Timeline Layout */}
        <div className="hidden lg:block relative">
          
          {/* Timeline Line */}
          <div 
            ref={timelineRef}
            className="absolute top-32 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                data-step-id={step.id}
                className={`
                  relative transition-all duration-700 ease-out
                  ${visibleSteps.has(step.id) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                  }
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Card */}
                <div className={`
                  group relative bg-gradient-to-br from-white/5 to-white/2 
                  backdrop-blur-xl border border-white/10 rounded-3xl p-8
                  hover:border-white/20 transition-all duration-500
                  ${activeStep === step.id ? 'ring-2 ring-primary-500/50 border-primary-500/30' : ''}
                `}>
                  
                  {/* Background Gradient */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${step.bgGradient} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl
                  `} />
                  
                  {/* Step Number Circle */}
                  <div className={`
                    relative mx-auto mb-8 w-24 h-24 rounded-full 
                    bg-gradient-to-br ${step.gradient} p-1
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <div className="w-full h-full bg-neural-950 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    
                    {/* Floating Icon */}
                    <div className="absolute -top-3 -right-3 p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-full backdrop-blur-sm border border-white/20">
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient-primary transition-all duration-300">
                      {step.title}
                    </h3>
                    
                    <div className="text-sm text-primary-400 font-semibold mb-4 opacity-80">
                      {step.duration}
                    </div>
                    
                    <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                      {step.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2 text-sm">
                          <FiCheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
                          <span className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connection Line Dot */}
                  <div className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2
                    w-4 h-4 rounded-full border-4 border-neural-950
                    bg-gradient-to-r ${step.gradient}
                    ${activeStep === step.id ? 'scale-125 shadow-lg' : 'scale-100'}
                    transition-all duration-300
                  `} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              data-step-id={step.id}
              className={`
                relative transition-all duration-700 ease-out
                ${visibleSteps.has(step.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start space-x-6">
                
                {/* Timeline Connector */}
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div className={`
                    relative w-16 h-16 rounded-full 
                    bg-gradient-to-br ${step.gradient} p-1
                    flex-shrink-0
                  `}>
                    <div className="w-full h-full bg-neural-950 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-32 bg-gradient-to-b from-white/20 to-white/5 mt-4" />
                  )}
                </div>
                
                {/* Content Card */}
                <div className="flex-1 glass-morphism-card rounded-2xl p-6 border border-white/10">
                  
                  {/* Icon */}
                  <div className={`
                    inline-flex p-3 rounded-xl bg-gradient-to-br ${step.gradient} mb-4
                  `}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  
                  <div className="text-sm text-primary-400 font-semibold mb-3">
                    {step.duration}
                  </div>
                  
                  <p className="text-white/70 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <FiCheckCircle className="w-3 h-3 text-primary-400 flex-shrink-0" />
                        <span className="text-white/60">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center space-y-6 p-8 glass-morphism-strong rounded-3xl border border-white/10 max-w-2xl mx-auto">
            <div className="text-2xl font-bold text-white mb-2">
              Ready to begin your transformation?
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              Join thousands of students who have already started their journey to mental clarity and spiritual growth.
            </p>
            <button className="btn-primary group">
              <span>Start Your Journey Today</span>
              <FiCheckCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
            </button>
            <div className="text-sm text-white/50">
              Free 14-day trial • No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}