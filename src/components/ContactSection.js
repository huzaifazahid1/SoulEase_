'use client';
import { useEffect, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  useEffect(() => {
    // Animate contact section
    gsap.fromTo('.contact-form', 
      { x: -50, opacity: 0 },
      {
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.contact-info', 
      { x: 50, opacity: 0 },
      {
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        }
      }
    );

    // Animate title
    gsap.fromTo('.contact-title', 
      { y: 30, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 85%',
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      project: '',
      message: ''
    });

    // Show success animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <section id="contact" className="contact-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Interested In 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
              {' '}working with us?
            </span>
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
            Let's create something amazing together. Get in touch and let's discuss how we can bring your vision to life with our creative expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl border border-primary-100">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-secondary-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-secondary-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project" className="block text-secondary-700 font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white"
                  >
                    <option value="">Select project type</option>
                    <option value="web-design">Web Design</option>
                    <option value="app-design">Mobile App Design</option>
                    <option value="branding">Brand Identity</option>
                    <option value="development">Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-secondary-700 font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Get in touch</h3>
              <p className="text-secondary-700 leading-relaxed mb-8">
                Ready to start your project? We're just a message away. Let's discuss your ideas and turn them into reality with our creative solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Email</div>
                  <div className="text-secondary-700">hello@designpro.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Phone</div>
                  <div className="text-secondary-700">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">Office</div>
                  <div className="text-secondary-700">123 Design Street, Creative City</div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-xl border border-accent-100">
              <h4 className="font-bold text-secondary-900 mb-2">Quick Response</h4>
              <p className="text-secondary-700">
                We typically respond to all inquiries within 24 hours. For urgent projects, call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}