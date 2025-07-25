'use client'

import { useState } from 'react'
import { FiCheck, FiArrowRight, FiAward, FiStar, FiZap, FiShield } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'

/**
 * Pricing Section Component
 * 
 * Features:
 * - Three-tier pricing structure (Freemium model)
 * - Annual/Monthly toggle with discount
 * - Feature comparison table
 * - Popular plan highlighting
 * - Interactive pricing cards
 * - Trust badges and guarantees
 */
export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState(null)

  // Pricing plans configuration
  const pricingPlans = [
    {
      id: 'seeker',
      name: "Seeker",
      tagline: "Perfect for exploration",
      monthlyPrice: 0,
      annualPrice: 0,
      originalMonthlyPrice: null,
      originalAnnualPrice: null,
      description: "Begin your spiritual and mental wellness journey with essential AI-powered tools",
      gradient: "from-neutral-600 to-neutral-700",
      borderGradient: "from-neutral-500/50 to-neutral-600/50",
      bgGradient: "from-neutral-500/10 to-neutral-600/10",
      popular: false,
      features: [
        "Basic AI career guidance (5 sessions/month)",
        "Daily spiritual reflections & Quranic insights",
        "Mood tracking (7-day history)",
        "Community forum access",
        "Basic audio library (10 tracks)",
        "Email support",
        "Mobile app access"
      ],
      limitations: [
        "Limited AI conversation time",
        "Basic analytics only",
        "No priority support"
      ],
      ctaText: "Start Free",
      badge: "Free Forever"
    },
    {
      id: 'believer',
      name: "Believer",
      tagline: "Most popular choice",
      monthlyPrice: 19,
      annualPrice: 15,
      originalMonthlyPrice: 29,
      originalAnnualPrice: 23,
      description: "Comprehensive spiritual and mental health support for serious growth",
      gradient: "from-primary-600 to-accent-600",
      borderGradient: "from-primary-500/50 to-accent-500/50",
      bgGradient: "from-primary-500/10 to-accent-500/10",
      popular: true,
      features: [
        "Unlimited AI career counseling & spiritual guidance",
        "Advanced mood analytics with insights",
        "Personalized spiritual journey roadmap",
        "Premium audio library (100+ tracks)",
        "Priority community access & study groups",
        "Weekly 1-on-1 coaching sessions",
        "Custom prayer & reflection reminders",
        "Goal tracking & progress analytics",
        "Islamic psychology resources",
        "24/7 priority support"
      ],
      limitations: [],
      ctaText: "Start Free Trial",
      badge: "Most Popular",
      discount: isAnnual ? "Save 21%" : null
    },
    {
      id: 'leader',
      name: "Leader",
      tagline: "For aspiring changemakers",
      monthlyPrice: 49,
      annualPrice: 39,
      originalMonthlyPrice: 69,
      originalAnnualPrice: 55,
      description: "Premium platform access with leadership development and mentorship",
      gradient: "from-secondary-600 to-purple-600",
      borderGradient: "from-secondary-500/50 to-purple-500/50",
      bgGradient: "from-secondary-500/10 to-purple-500/10",
      popular: false,
      features: [
        "Everything in Believer plan",
        "Daily 1-on-1 spiritual coaching",
        "Islamic leadership development program",
        "Exclusive masterclasses & workshops",
        "Personal AI coach customization",
        "Advanced career pathway planning",
        "Mentorship with Islamic professionals",
        "Community moderator privileges",
        "Early access to new features",
        "University partnership benefits",
        "Custom integration options",
        "White-glove onboarding"
      ],
      limitations: [],
      ctaText: "Start Free Trial",
      badge: "Premium",
      discount: isAnnual ? "Save 29%" : null
    }
  ]

  // Trust indicators
  const trustBadges = [
    { icon: <FiShield className="w-5 h-5" />, text: "256-bit SSL Encryption" },
    { icon: <FiStar className="w-5 h-5" />, text: "4.9/5 Student Rating" },
    { icon: <FiZap className="w-5 h-5" />, text: "Instant Activation" },
    { icon: <HiSparkles className="w-5 h-5" />, text: "14-Day Free Trial" }
  ]

  // FAQ items
  const faqItems = [
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans include a 14-day free trial with full access to premium features."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees."
    },
    {
      question: "Are my conversations private?",
      answer: "Yes, all conversations are encrypted and private. We follow strict Islamic ethics regarding confidentiality."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! We offer additional discounts for verified students. Contact our team for details."
    }
  ]

  /**
   * Calculate savings percentage
   */
  const calculateSavings = (monthly, annual) => {
    if (!annual || !monthly) return 0
    return Math.round(((monthly * 12 - annual * 12) / (monthly * 12)) * 100)
  }

  return (
    <section className="section-padding container-padding relative overflow-hidden" id="pricing">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-900/50 to-secondary-900/30" />
      <div className="absolute inset-0 bg-neural-pattern opacity-5" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full border border-primary-500/30 mb-8">
            <FiAward className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-semibold text-primary-400 tracking-wide">
              CHOOSE YOUR PATH
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="font-display font-bold mb-8">
            <span className="block text-5xl md:text-7xl text-white mb-4">
              Simple
            </span>
            <span className="block text-5xl md:text-7xl text-gradient-primary">
              Pricing
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Start your journey for free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center space-x-4 glass-morphism rounded-2xl p-2 border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${!isAnnual 
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`
                relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${isAnnual 
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              Annual
              {/* Discount Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Save 25%
              </div>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`
                relative transform transition-all duration-500 ease-out
                ${plan.popular 
                  ? 'scale-105 z-10 ring-2 ring-primary-500/50' 
                  : hoveredPlan === plan.id ? 'scale-102' : 'scale-100'
                }
              `}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-sm font-bold text-white shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Card Container */}
              <div className={`
                relative h-full rounded-3xl border overflow-hidden
                glass-morphism-card hover:border-white/30 transition-all duration-500
                ${plan.popular ? 'border-primary-500/30' : 'border-white/10'}
              `}>
                
                {/* Background Gradient */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${plan.bgGradient} 
                  opacity-0 hover:opacity-100 transition-opacity duration-500
                `} />
                
                {/* Border Gradient on Hover */}
                <div className={`
                  absolute inset-0 rounded-3xl opacity-0 hover:opacity-100
                  bg-gradient-to-br ${plan.borderGradient} 
                  transition-opacity duration-500 pointer-events-none p-px
                `}>
                  <div className="w-full h-full rounded-3xl bg-neural-950" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/60 text-sm mb-6">{plan.tagline}</p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-5xl font-bold text-white">
                          ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-white/60">
                          /{isAnnual ? 'month' : 'month'}
                        </span>
                      </div>
                      
                      {/* Original Price */}
                      {((isAnnual && plan.originalAnnualPrice) || (!isAnnual && plan.originalMonthlyPrice)) && (
                        <div className="text-center mt-2">
                          <span className="text-white/40 line-through text-lg">
                            ${isAnnual ? plan.originalAnnualPrice : plan.originalMonthlyPrice}/month
                          </span>
                          {plan.discount && (
                            <span className="ml-2 text-green-400 text-sm font-semibold">
                              {plan.discount}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {isAnnual && plan.annualPrice > 0 && (
                        <div className="text-sm text-white/60 mt-2">
                          Billed annually (${plan.annualPrice * 12}/year)
                        </div>
                      )}
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  
                  {/* Features List */}
                  <div className="mb-8">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <FiCheck className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`
                    w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 group
                    ${plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-xl hover:shadow-primary-500/25 hover:scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
                    }
                  `}>
                    <div className="flex items-center justify-center space-x-2">
                      <span>{plan.ctaText}</span>
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                  
                  {/* Trial Info */}
                  {plan.monthlyPrice > 0 && (
                    <div className="text-center mt-4 text-sm text-white/60">
                      14-day free trial • No credit card required
                    </div>
                  )}
                </div>

                {/* Shine Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                  -translate-x-full hover:translate-x-full transition-transform duration-1000
                  pointer-events-none
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 glass-morphism rounded-xl p-4 border border-white/10">
                <div className="text-primary-400">
                  {badge.icon}
                </div>
                <span className="text-white/80 text-sm font-medium">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-white/60 mb-6 text-lg">
            Need something custom for your university or organization?
          </p>
          <button className="inline-flex items-center space-x-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors group">
            <span>Contact our education team</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}