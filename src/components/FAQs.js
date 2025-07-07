'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import { BiTime, BiMoney, BiCode, BiPalette, BiRefresh, BiTool } from 'react-icons/bi';

gsap.registerPlugin(ScrollTrigger);

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const faqRefs = useRef([]);
  const answerRefs = useRef([]);

  const faqs = [
    {
      icon: BiCode,
      question: "What kind of projects do you take on?",
      answer: "We specialize in custom web applications, e-commerce platforms, portfolio websites, and SaaS products. From simple landing pages to complex full-stack applications, we handle projects of all sizes. Our sweet spot is working with startups and growing businesses who need both stunning design and robust functionality."
    },
    {
      icon: BiMoney,
      question: "How much do you charge?",
      answer: "Our pricing depends on project complexity, timeline, and scope. We offer flexible packages starting from $2,500 for simple websites, $5,000-$15,000 for custom web apps, and $15,000+ for enterprise solutions. We always provide detailed quotes after understanding your specific needs and requirements."
    },
    {
      icon: BiTime,
      question: "What are your timeline expectations?",
      answer: "Typical timelines range from 2-3 weeks for simple websites, 4-8 weeks for custom web applications, and 8-16 weeks for complex platforms. We work closely with you to establish realistic deadlines and keep you updated throughout the process with regular milestone check-ins."
    },
    {
      icon: BiPalette,
      question: "Do you offer design-only or development-only services?",
      answer: "Absolutely! While we love working as a complete team, we're flexible. Need just UI/UX design? We've got you covered. Already have designs and need development? Perfect! We can seamlessly integrate with your existing team or handle individual phases of your project."
    },
    {
      icon: BiRefresh,
      question: "Do you offer revisions?",
      answer: "Yes! We include up to 3 rounds of revisions in all our packages. We believe in getting it right, and we're committed to your satisfaction. Additional revisions beyond the included rounds are available at our standard hourly rate, but most projects are finalized within the included revisions."
    },
    {
      icon: BiCode,
      question: "What tools and technologies do you use?",
      answer: "We use modern, industry-standard tools: React, Next.js, Node.js, MongoDB, and PostgreSQL for development. For design, we use Figma, Adobe Creative Suite, and Webflow. We also work with popular CMS platforms like WordPress and Shopify when needed. We choose the best tech stack for each project's specific requirements."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Staggered FAQ cards animation
      gsap.from(faqRefs.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    const isOpening = activeIndex !== index;
    const answerEl = answerRefs.current[index];
    
    if (activeIndex !== null && activeIndex !== index) {
      // Close currently open FAQ
      const currentAnswerEl = answerRefs.current[activeIndex];
      gsap.to(currentAnswerEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }

    if (isOpening) {
      setActiveIndex(index);
      // Open new FAQ
      gsap.set(answerEl, { height: "auto", opacity: 1 });
      const height = answerEl.offsetHeight;
      gsap.from(answerEl, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      // Close current FAQ
      gsap.to(answerEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setActiveIndex(null)
      });
    }
  };

  const addToFaqRefs = (el) => {
    if (el && !faqRefs.current.includes(el)) {
      faqRefs.current.push(el);
    }
  };

  const addToAnswerRefs = (el, index) => {
    if (el) {
      answerRefs.current[index] = el;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50 py-20 px-4 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-20 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-accent-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-primary-200/50 mb-6">
            <FiHelpCircle className="text-primary-500 text-2xl" />
            <span className="text-primary-600 font-semibold">Got Questions?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about working with us. Can't find what you're looking for? 
            Just reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={index}
              
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  isActive 
                    ? 'border-primary-300 shadow-primary-100' 
                    : 'border-primary-200/50 hover:border-primary-300'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full p-6 text-left flex items-center gap-4 transition-all duration-300 ${
                    isActive ? 'bg-primary-50' : 'hover:bg-primary-50'
                  } rounded-2xl`}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-primary-100 text-primary-600'
                  }`}>
                    <Icon className="text-xl" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-800">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`transition-transform duration-300 ${
                    isActive ? 'rotate-180' : ''
                  }`}>
                    <FiChevronDown className="text-secondary-600 text-xl" />
                  </div>
                </button>

                {/* Answer */}
                <div
                  ref={(el) => addToAnswerRefs(el, index)}
                  className={`overflow-hidden ${
                    activeIndex === index ? 'block' : 'hidden'
                  }`}
                  style={{ height: activeIndex === index ? 'auto' : 0 }}
                >
                  <div className="px-6 pb-6">
                    <div className="pl-16">
                      <div className="h-px bg-gradient-to-r from-primary-200 to-accent-200 mb-4"></div>
                      <p className="text-secondary-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-primary-100 mb-6">
              We'd love to chat about your project and see how we can help bring your vision to life.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105 shadow-lg">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;