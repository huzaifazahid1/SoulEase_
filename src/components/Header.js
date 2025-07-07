'use client';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animate header on mount
    gsap.fromTo('.header-animate', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-animate ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold text-secondary-800">
              Dual<span className="text-primary-500">Pixel</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Home</a>
            <a href="#services" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Services</a>
            <a href="#portfolio" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Portfolio</a>
            <a href="#about" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">About</a>
            <a href="#contact" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Contact</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 font-medium">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Home</a>
              <a href="#services" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Services</a>
              <a href="#portfolio" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Portfolio</a>
              <a href="#about" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">About</a>
              <a href="#contact" className="text-secondary-700 hover:text-primary-500 transition-colors font-medium">Contact</a>
              <button className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-all duration-300 font-medium w-fit">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}