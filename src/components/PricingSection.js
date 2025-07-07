'use client';
import { useEffect } from 'react';
import { FiCheck, FiStar } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  useEffect(() => {
    // Animate pricing cards
    gsap.fromTo('.pricing-card', 
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        ease: 'back.out(1.7)',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.pricing-container',
          start: 'top 80%',
        }
      }
    );

    // Special animation for featured card
    gsap.fromTo('.featured-card', 
      { scale: 0.95 },
      {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.pricing-container',
          start: 'top 80%',
        }
      }
    );
  }, []);

  const pricingPlans = [
    {
      name: "Starter Pack",
      price: "$499",
      period: "One-time Project",
      description: "Perfect for small businesses and startups looking to establish their online presence.",
      features: [
        "Custom Website Design",
        "Responsive Layout",
        "Basic SEO Setup",
        "Contact Form Integration",
        "Social Media Links",
        "1 Month Support"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Brand Genesis Pack",
      price: "$1499",
      period: "Complete Package",
      description: "Comprehensive solution for businesses ready to make a significant digital impact.",
      features: [
        "Complete Brand Identity",
        "Professional Website",
        "Mobile App Design",
        "SEO Optimization",
        "Content Management",
        "Analytics Setup",
        "3 Months Support",
        "Marketing Materials"
      ],
      buttonText: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise Solution",
      price: "$2999",
      period: "Full Service",
      description: "Enterprise-grade solution with ongoing support and advanced features.",
      features: [
        "Everything in Genesis",
        "E-commerce Integration",
        "Advanced Analytics",
        "Custom Development",
        "Priority Support",
        "Monthly Consultations",
        "Performance Monitoring",
        "Unlimited Revisions"
      ],
      buttonText: "Contact Us",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Avail our  
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
            Brand Genesis
            </span>
            <br />
            Pack Today!!
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
            Choose the perfect package that aligns with your business goals. Each plan is designed to deliver maximum value and exceptional results.
          </p>
        </div>

        <div className="pricing-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                plan.popular ? 'featured-card ring-4 ring-primary-200 transform scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center py-2 font-semibold">
                  <FiStar className="inline-block mr-1" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-5xl font-bold text-primary-500">{plan.price}</span>
                  <span className="text-secondary-600 ml-2">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="text-secondary-700 mb-6 leading-relaxed">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg' 
                    : 'bg-secondary-100 text-secondary-800 hover:bg-primary-500 hover:text-white'
                }`}>
                  {plan.buttonText}
                </button>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-secondary-600 mb-4">Need a custom solution? We're here to help!</p>
          <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}