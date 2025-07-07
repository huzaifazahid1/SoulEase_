'use client';
import { useEffect } from 'react';
import { FiMonitor, FiSmartphone, FiCode, FiPenTool, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  useEffect(() => {
    // Animate service cards on scroll
    gsap.fromTo('.service-card', 
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.services-container',
          start: 'top 80%',
          end: 'bottom 20%',
        }
      }
    );

    // Section title animation
    gsap.fromTo('.services-title', 
      { y: 30, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 85%',
        }
      }
    );
  }, []);

  const services = [
    {
      icon: <FiMonitor className="w-8 h-8" />,
      title: "Web Design",
      description: "Create stunning, user-friendly websites that convert visitors into customers with modern design principles.",
      features: ["Responsive Design", "UI/UX Optimization", "Brand Integration", "Performance Focus"]
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile App Design",
      description: "Design intuitive mobile experiences that users love, from wireframes to pixel-perfect interfaces.",
      features: ["iOS & Android", "Prototyping", "User Testing", "App Store Ready"]
    },
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Bring designs to life with clean, efficient code using the latest web technologies and frameworks.",
      features: ["React/Next.js", "Modern CSS", "Performance", "SEO Friendly"]
    },
    {
      icon: <FiPenTool className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Develop comprehensive brand identities that tell your story and connect with your audience.",
      features: ["Logo Design", "Style Guides", "Brand Assets", "Marketing Materials"]
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "SEO Optimization",
      description: "Boost your online visibility with strategic SEO that drives organic traffic and conversions.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy"]
    },
    {
      icon: <FiShoppingCart className="w-8 h-8" />,
      title: "E-commerce Solutions",
      description: "Build powerful online stores that provide seamless shopping experiences and maximize sales.",
      features: ["Store Design", "Payment Integration", "Inventory Management", "Analytics"]
    }
  ];

  return (
    <section id="services" className="services-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="services-title text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            How Can We Help You To Create 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              {' '}Stunning Designs
            </span>
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
            Our services have been carefully designed with a focus on delivering exceptional results for your business goals and user needs.
          </p>
        </div>

        <div className="services-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card group bg-gradient-to-br from-white to-primary-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-100"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-secondary-700 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                    <span className="text-secondary-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}