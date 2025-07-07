'use client';
import { useEffect } from 'react';
import { FiArrowRight, FiStar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { gsap } from 'gsap';

export default function HeroSection() {
  useEffect(() => {
    // Hero animations
    gsap.timeline()
      .fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.hero-buttons', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

    // Floating cards animation
    gsap.set('.floating-card', { y: 0 });
    gsap.to('.floating-card', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.2
    });

    // Stats animation
    gsap.fromTo('.stats-item', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1, delay: 1 }
    );
  }, []);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-20 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="relative">
          {/* Floating Cards */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="floating-card absolute top-20 left-10 bg-white p-4 rounded-xl shadow-lg border border-primary-100 max-w-xs">
              <div className="flex items-center space-x-2">
                <FiStar className="text-primary-500" />
                <span className="text-sm font-medium">5.0 Rating</span>
              </div>
              <p className="text-xs text-secondary-600 mt-1">Trusted by 500+ clients</p>
            </div>
            
            <div className="floating-card absolute top-32 right-10 bg-white p-4 rounded-xl shadow-lg border border-accent-100 max-w-xs">
              <div className="flex items-center space-x-2">
                <FiUsers className="text-accent-500" />
                <span className="text-sm font-medium">1000+ Projects</span>
              </div>
              <p className="text-xs text-secondary-600 mt-1">Successfully completed</p>
            </div>
            
            <div className="floating-card absolute bottom-32 left-20 bg-white p-4 rounded-xl shadow-lg border border-primary-100 max-w-xs">
              <div className="flex items-center space-x-2">
                <FiTrendingUp className="text-primary-500" />
                <span className="text-sm font-medium">200% Growth</span>
              </div>
              <p className="text-xs text-secondary-600 mt-1">Average client ROI</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center relative z-10">
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-secondary-900 mb-6">
              Crafting Bold, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                {' '}Impactful
              </span>
              <br />
              Designs For Your Brand
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-secondary-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your vision into stunning digital experiences. We create designs that not only look amazing but drive real business results.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="bg-primary-500 text-white px-8 py-4 rounded-full hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 font-semibold text-lg">
                <span>Start Your Project</span>
                <FiArrowRight />
              </button>
              <button className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 font-semibold text-lg">
                View Our Work
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="stats-item text-center">
                <div className="text-3xl font-bold text-primary-500">500+</div>
                <div className="text-secondary-600">Happy Clients</div>
              </div>
              <div className="stats-item text-center">
                <div className="text-3xl font-bold text-accent-500">1000+</div>
                <div className="text-secondary-600">Projects Done</div>
              </div>
              <div className="stats-item text-center">
                <div className="text-3xl font-bold text-primary-500">5+</div>
                <div className="text-secondary-600">Years Experience</div>
              </div>
              <div className="stats-item text-center">
                <div className="text-3xl font-bold text-accent-500">24/7</div>
                <div className="text-secondary-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}