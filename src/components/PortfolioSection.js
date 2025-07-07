'use client';
import { useEffect } from 'react';
import { FiExternalLink, FiCode, FiSmartphone, FiMonitor, FiPenTool } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  useEffect(() => {
    // Animate portfolio items
    gsap.fromTo('.portfolio-item', 
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 80%',
        }
      }
    );

    // Animate section title
    gsap.fromTo('.portfolio-title', 
      { y: 30, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio-section',
          start: 'top 85%',
        }
      }
    );
  }, []);

  const portfolioItems = [
    {
      title: "Creative Portfolio Site",
      category: "Web Design",
      icon: <FiMonitor className="w-5 h-5" />,
      description:
        "A beautifully animated portfolio site crafted for a designer to showcase work with stunning visuals and smooth UX.",
      technologies: ["React", "GSAP", "TailwindCSS"],
      image: "bg-gradient-to-br from-blue-400 to-purple-600",
    },
    {
      title: "Freelancer Connect App",
      category: "App Design",
      icon: <FiSmartphone className="w-5 h-5" />,
      description:
        "Mobile app that connects designers and developers for project collaboration with built-in chat and task boards.",
      technologies: ["React Native", "Firebase", "Redux Toolkit"],
      image: "bg-gradient-to-br from-green-400 to-blue-600",
    },
    {
      title: "Design System Kit",
      category: "Logo Design",
      icon: <FiPenTool className="w-5 h-5" />,
      description:
        "A shared design system and logo package for consistent branding across web and mobile products.",
      technologies: ["Figma", "Illustrator", "Design Tokens"],
      image: "bg-gradient-to-br from-pink-400 to-red-600",
    },
    {
      title: "Project Management Dashboard",
      category: "UI/UX Design",
      icon: <FiCode className="w-5 h-5" />,
      description:
        "A real-time dashboard designed by the designer and developed by the developer to manage tasks, deadlines, and teams.",
      technologies: ["Vue.js", "Socket.IO", "TailwindCSS"],
      image: "bg-gradient-to-br from-purple-400 to-pink-600",
    },
    {
      title: "Food Ordering Website",
      category: "Web Design",
      icon: <FiMonitor className="w-5 h-5" />,
      description:
        "Responsive restaurant website where the designer created a delicious UI and the developer integrated real-time ordering.",
      technologies: ["Next.js", "Stripe", "Framer Motion"],
      image: "bg-gradient-to-br from-orange-400 to-red-600",
    },
    {
      title: "Health Coach App",
      category: "App Design",
      icon: <FiSmartphone className="w-5 h-5" />,
      description:
        "A fitness & mental health mobile app combining user-friendly UI/UX with AI-powered insights built by the duo.",
      technologies: ["Flutter", "TensorFlow", "Firebase"],
      image: "bg-gradient-to-br from-green-400 to-teal-600",
    },
  ];
  

  return (
    <section id="portfolio" className="portfolio-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="portfolio-title text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">work</span> we did for our clients
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
            Showcased here, brands worked with Yard Marketing company recognized across all industries globally.
          </p>
        </div>

        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="portfolio-item group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Image/Preview */}
              <div className={`h-48 ${item.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2">
                  {item.icon}
                  <span className="text-sm font-medium text-secondary-700">{item.category}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-secondary-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                    <FiExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-secondary-700 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <button className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
                    View Project
                  </button>
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-lg">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}