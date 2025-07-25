'use client'

import { useEffect } from 'react'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorksSection from '../components/HowItWorksSection'
import TestimonialsSection from '../components/TestimonialsSection'
import PricingSection from '../components/PricingSection'
import StatsSection from '../components/StatsSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import LoadingSkeleton from '@/components/LoadingSkelton'
/**
 * Main Landing Page Component
 * 
 * This is the primary landing page for SoulEase - an AI-powered Islamic mental health platform.
 * The page is designed to compete with top-tier platforms like Replika, Headspace, MuslimPro,
 * and BetterUp by offering a comprehensive spiritual and mental wellness solution.
 * 
 * Page Structure:
 * 1. Navigation - Fixed header with smooth scroll navigation
 * 2. Hero Section - Full-screen hero with carousel and animated CTAs
 * 3. Features Section - Core platform capabilities with interactive cards
 * 4. How It Works - 4-step process explanation
 * 5. Testimonials - Student success stories with rotating carousel
 * 6. Pricing Section - Flexible pricing tiers with feature comparison
 * 7. Stats Section - Trust indicators and platform metrics
 * 8. CTA Section - Final conversion section with compelling offer
 * 9. Footer - Comprehensive links and company information
 * 10. Scroll to Top - Floating action button for better UX
 * 
 * Design Philosophy:
 * - Dark, premium aesthetic with gradient accents
 * - Islamic spiritual elements combined with modern AI branding
 * - Micro-interactions and smooth animations throughout
 * - Mobile-first responsive design
 * - Accessibility-focused with proper ARIA labels
 * - Performance optimized with lazy loading and code splitting
 */
export default function HomePage() {
  
  // Page initialization effects
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Preload critical images for better performance
    const preloadImages = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center&q=80',
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&h=1080&fit=crop&crop=center&q=80',
      'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1920&h=1080&fit=crop&crop=center&q=80'
    ]
    
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Analytics tracking for page load (if in production)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'SoulEase Landing Page',
        page_location: window.location.href
      })
    }

    return () => {
      // Cleanup if needed
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <>
      {/* Page Metadata and SEO */}
      <title>SoulEase - AI-Powered Islamic Mental Health Platform</title>
      <meta 
        name="description" 
        content="Transform your mental journey with AI-powered Islamic spiritual guidance. Join 25,000+ students finding peace, purpose, and clarity through faith-based mental health support." 
      />
      
      {/* Main Page Structure */}
      <div className="min-h-screen bg-neural-950 text-white overflow-x-hidden">
        
        {/* 
          Navigation Component
          - Fixed position header with glass morphism effect
          - Responsive mobile menu with smooth animations
          - Smooth scroll navigation to page sections
          - Auto-hide/show on scroll for better content visibility
        */}
        <Navigation />
        
        {/* 
          Hero Section Component
          - Full-screen hero with background image carousel
          - Animated text reveals with staggered animations
          - Interactive statistics with counter animations
          - Parallax mouse tracking effects
          - Prominent call-to-action buttons
          - Trust indicators and social proof
        */}
        <HeroSection />
        
        {/* 
          Features Section Component
          - Grid layout showcasing core platform features
          - Interactive cards with 3D hover effects
          - Gradient backgrounds and animated icons
          - Detailed feature descriptions with benefit lists
          - Intersection Observer for scroll-triggered animations
        */}
        <FeaturesSection />
{/* <LoadingSkeleton/> */}
        {/* 
          How It Works Section Component
          - 4-step process explanation with visual icons
          - Progressive disclosure of information
          - Connected flow design with animated connectors
          - Clear value proposition for each step
          - Optimized for user journey understanding
        */}
        <HowItWorksSection />
        
        {/* 
          Testimonials Section Component
          - Student success stories with authentic photos
          - Rotating carousel with smooth transitions
          - University affiliations for credibility
          - Star ratings and detailed feedback
          - Social proof from diverse student backgrounds
        */}
        <TestimonialsSection />
        
        {/* 
          Pricing Section Component
          - Three-tier pricing structure (Freemium model)
          - Feature comparison with clear value propositions
          - Popular plan highlighting for conversion optimization
          - Flexible payment options and trial offers
          - Trust badges and money-back guarantees
        */}
        <PricingSection />
        
        {/* 
          Stats Section Component
          - Key performance indicators and trust metrics
          - Animated counters with impressive numbers
          - Social proof elements (user count, satisfaction rate)
          - Platform reliability indicators (uptime, support)
          - Visual icons paired with each statistic
        */}
        {/* <StatsSection /> */}
        
        {/* 
          Call-to-Action Section Component
          - Final conversion opportunity with compelling offer
          - Urgency and scarcity elements where appropriate
          - Multiple CTA options (free trial, demo, contact)
          - Risk reduction elements (free trial, cancellation policy)
          - Background imagery for emotional connection
        */}
        {/* <CTASection /> */}
        
        {/* 
          Footer Component
          - Comprehensive site navigation and links
          - Company information and contact details
          - Legal pages and privacy policy links
          - Social media integration
          - Newsletter signup with incentive
          - Islamic quote for spiritual connection
        */}
        <Footer />
        
        {/* 
          Scroll to Top Component
          - Floating action button for improved navigation
          - Appears after user scrolls down significantly
          - Smooth scroll animation back to top
          - Accessibility features for keyboard navigation
        */}
        <ScrollToTop />
      </div>
      
      {/* 
        Performance Monitoring Scripts
        These would be loaded conditionally in production
      */}
      {process.env.NODE_ENV === 'production' && (
        <>
          {/* Web Vitals tracking */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Track Core Web Vitals
                function sendToAnalytics({name, value, id}) {
                  gtag('event', name, {
                    event_category: 'Web Vitals',
                    value: Math.round(name === 'CLS' ? value * 1000 : value),
                    event_label: id,
                    non_interaction: true,
                  });
                }
                
                // Load web-vitals library and track metrics
                import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
                  getCLS(sendToAnalytics);
                  getFID(sendToAnalytics);
                  getFCP(sendToAnalytics);
                  getLCP(sendToAnalytics);
                  getTTFB(sendToAnalytics);
                });
              `
            }}
          />
          
          {/* Hotjar or other user experience tracking */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // User behavior tracking
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `
            }}
          />
        </>
      )}
    </>
  )
}
