'use client';
import { useEffect, useState } from 'react';
import { FiStar} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const [currentSet, setCurrentSet] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      avatar: "SJ",
      rating: 5,
      text: "DesignPro transformed our brand completely. Their attention to detail and creative approach exceeded our expectations. The team delivered a website that not only looks stunning but also converts visitors into customers."
    },
    {
      name: "Michael Chen",
      position: "Founder, EcoLiving",
      avatar: "MC",
      rating: 5,
      text: "The mobile app design they created for us is absolutely phenomenal. User engagement increased by 300% after launch. Their understanding of user psychology is remarkable."
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director, GrowthCo",
      avatar: "ER",
      rating: 5,
      text: "Working with DesignPro was a game-changer for our business. They delivered a complete brand identity that perfectly captures our vision. Professional, creative, and results-driven."
    },
    {
      name: "David Kim",
      position: "CTO, InnovateHub",
      avatar: "DK",
      rating: 5,
      text: "Their technical expertise combined with creative design skills is unmatched. They built us a platform that's not just beautiful but also highly functional and scalable."
    },
    {
      name: "Lisa Thompson",
      position: "Owner, Boutique Store",
      avatar: "LT",
      rating: 5,
      text: "The e-commerce solution they developed increased our online sales by 250%. The user experience is seamless, and the design perfectly reflects our brand personality."
    },
    {
      name: "Alex Parker",
      position: "VP, FinanceFlow",
      avatar: "AP",
      rating: 5,
      text: "DesignPro delivered a financial dashboard that's both intuitive and powerful. Their ability to simplify complex data visualization is impressive. Highly recommended!"
    }
  ];

  // Group testimonials into sets of 3
  const testimonialSets = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    testimonialSets.push(testimonials.slice(i, i + 3));
  }

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % testimonialSets.length);
    }, 5000);

    // Animate testimonials on scroll
    gsap.fromTo('.testimonial-card', 
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.testimonials-container',
          start: 'top 80%',
        }
      }
    );

    // Continuous vertical movement animation
    gsap.to('.testimonial-card', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5
    });

    return () => clearInterval(interval);
  }, [testimonialSets.length]);

  // Animate card transitions
  useEffect(() => {
    gsap.fromTo('.testimonial-card', 
      { scale: 0.95, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
    );
  }, [currentSet]);

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            What do the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">best creators</span> say about us
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
            Our clients are welcomed by the industry leaders and founders. Here's what they say about our work and collaboration.
          </p>
        </div>

        <div className="testimonials-container relative">
          {/* Current testimonial set */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialSets[currentSet]?.map((testimonial, index) => (
              <div 
                key={`${currentSet}-${index}`}
                className="testimonial-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary-100"
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-6">
                  <FiStar className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-secondary-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                    <div className="text-secondary-600 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-12">
            {testimonialSets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSet(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSet 
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 w-8' 
                    : 'bg-secondary-300 hover:bg-secondary-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">500+</div>
            <div className="text-secondary-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent-500 mb-2">98%</div>
            <div className="text-secondary-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">1000+</div>
            <div className="text-secondary-600">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent-500 mb-2">5★</div>
            <div className="text-secondary-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}