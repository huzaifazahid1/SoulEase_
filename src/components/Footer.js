'use client'

import { useState } from 'react'
import { 
  FiGlobe, FiMail, FiMapPin, FiPhone, FiArrowRight, FiArrowUp,
  FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiHeart
} from 'react-icons/fi'
import { 
  HiSparkles, HiChatBubbleLeftRight, HiMegaphone, HiComputerDesktop,
  HiAcademicCap, HiShieldCheck
} from 'react-icons/hi2'

/**
 * Footer Component
 * 
 * Features:
 * - Comprehensive site navigation and links
 * - Company information and contact details
 * - Newsletter signup with validation
 * - Social media integration
 * - Islamic quote for spiritual connection
 * - Mobile-responsive multi-column layout
 * - Trust badges and certifications
 */
export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Navigation links organized by category
  const footerLinks = {
    platform: {
      title: "Platform",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "How it Works", href: "#how-it-works" },
        { label: "API Documentation", href: "/api-docs" },
        { label: "Mobile App", href: "/download" },
        { label: "Desktop App", href: "/desktop" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Community Forum", href: "/community" },
        { label: "Blog & Insights", href: "/blog" },
        { label: "Islamic Resources", href: "/islamic-resources" },
        { label: "Mental Health Guides", href: "/guides" },
        { label: "Webinars & Events", href: "/events" }
      ]
    },
    company: {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers", href: "/careers" },
        { label: "Press Kit", href: "/press" },
        { label: "Partners", href: "/partners" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    legal: {
      title: "Legal & Privacy",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR Compliance", href: "/gdpr" },
        { label: "Security", href: "/security" },
        { label: "Accessibility", href: "/accessibility" }
      ]
    }
  }

  // Contact information
  const contactInfo = [
    {
      icon: <FiMail className="w-5 h-5" />,
      label: "Email Support",
      value: "support@soulease.com",
      href: "mailto:support@soulease.com"
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      label: "Phone Support",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      label: "Headquarters",
      value: "San Francisco, CA",
      href: "https://maps.google.com"
    }
  ]

  // Social media links
  const socialLinks = [
    {
      icon: <FiTwitter className="w-5 h-5" />,
      label: "Twitter",
      href: "https://twitter.com/soulease",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <FiInstagram className="w-5 h-5" />,
      label: "Instagram", 
      href: "https://instagram.com/soulease",
      gradient: "from-pink-400 to-purple-600"
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/company/soulease",
      gradient: "from-blue-600 to-blue-800"
    },
    {
      icon: <FiYoutube className="w-5 h-5" />,
      label: "YouTube",
      href: "https://youtube.com/@soulease",
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: <HiChatBubbleLeftRight className="w-5 h-5" />,
      label: "Discord",
      href: "https://discord.gg/soulease",
      gradient: "from-indigo-500 to-purple-600"
    }
  ]

  // Trust badges and certifications
  const trustBadges = [
    {
      icon: <HiShieldCheck className="w-6 h-6" />,
      label: "HIPAA Compliant",
      description: "Healthcare data protection"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      label: "GDPR Ready",
      description: "European privacy standards"
    },
    {
      icon: <HiAcademicCap className="w-6 h-6" />,
      label: "University Verified",
      description: "Educational institution approved"
    }
  ]

  // Newsletter subscription handler
  const handleNewsletterSignup = async (e) => {
    e.preventDefault()
    if (!email || isLoading) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  return (
    <footer className="relative bg-gradient-to-br from-neural-900 to-secondary-900 border-t border-white/10 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-neural-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="pt-20 pb-12">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <HiSparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold font-display text-gradient-primary">
                    SoulEase
                  </span>
                  <div className="text-xs text-white/60 font-medium">
                    AI-Powered Spiritual Guidance
                  </div>
                </div>
              </div>
              
              {/* Mission Statement */}
              <p className="text-white/70 mb-8 leading-relaxed max-w-md">
                Where Islamic spirituality meets AI-powered mental health support. 
                Empowering students to find peace, purpose, and clarity in their journey 
                through faith-based guidance and modern technology.
              </p>
              
              {/* Islamic Quote */}
              <div className="glass-morphism rounded-2xl p-6 border border-white/10 mb-8">
                <div className="text-white/90 italic text-sm mb-2 leading-relaxed">
                  "And it is in the remembrance of Allah that hearts find rest."
                </div>
                <div className="text-primary-400 text-xs font-semibold">
                  — Quran 13:28
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <a 
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary-400 transition-colors duration-300 group"
                  >
                    <div className="text-primary-400 group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-xs text-white/50">{contact.label}</div>
                      <div className="font-medium">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-4 gap-8">
                {Object.entries(footerLinks).map(([key, section]) => (
                  <div key={key}>
                    <h4 className="text-white font-bold mb-6 text-lg">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link, index) => (
                        <li key={index}>
                          <a 
                            href={link.href}
                            className="text-white/70 hover:text-primary-400 transition-all duration-300 hover:translate-x-1 transform inline-block text-sm"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-white/10 pt-12 mb-8">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold text-white mb-4">
                Stay Connected with Your Faith Journey
              </h4>
              <p className="text-white/70 mb-8 leading-relaxed">
                Get the latest updates on new features, spiritual growth tips, and exclusive content 
                for Muslim students. Join our community of learners and believers.
              </p>
              
              {/* Newsletter Form */}
              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="
                      flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl 
                      text-white placeholder-white/50 focus:outline-none focus:border-primary-400 
                      transition-colors duration-300 backdrop-blur-sm
                    "
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="
                      px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 
                      hover:from-primary-500 hover:to-accent-500 rounded-2xl font-semibold text-white
                      shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/40
                      transition-all duration-300 hover:scale-105 disabled:opacity-50
                      flex items-center justify-center space-x-2
                    "
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <FiArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="glass-morphism rounded-2xl p-6 border border-primary-500/30 max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-primary-400 mb-2">
                    <HiSparkles className="w-5 h-5" />
                    <span className="font-semibold">Welcome to the community!</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    You'll receive your first inspiration email soon. Barakallahu feeki!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 glass-morphism rounded-xl p-4 border border-white/10">
                  <div className="text-primary-400">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {badge.label}
                    </div>
                    <div className="text-white/60 text-xs">
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/60 mb-2">
                © 2025 SoulEase Technologies, Inc. All rights reserved.
              </p>
              <p className="text-white/50 text-sm flex items-center justify-center md:justify-start space-x-1">
                <span>Made with</span>
                <FiHeart className="w-4 h-4 text-red-400" />
                <span>for the Ummah</span>
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-white/60 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-3 rounded-xl text-white/70 hover:text-white
                    bg-gradient-to-r ${social.gradient} opacity-80 hover:opacity-100
                    hover:scale-110 transition-all duration-300
                    shadow-lg hover:shadow-xl
                  `}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}