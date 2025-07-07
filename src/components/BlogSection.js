'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiClock, FiUser } from 'react-icons/fi';
import { BiCode, BiPalette, BiBrain, BiRocket } from 'react-icons/bi';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {

  const blogPosts = [
    {
      id: 1,
      icon: BiCode,
      tag: "💻 Developer",
      title: "5 Mistakes to Avoid When Starting Your First Website",
      excerpt: "Learn from our experience and avoid these common pitfalls that can cost you time, money, and headaches down the road.",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      author: "Alex",
      gradient: "from-primary-400 to-primary-600"
    },
    {
      id: 2,
      icon: BiPalette,
      tag: "🎨 Designer",
      title: "Why UI/UX Design Can Make or Break Your Brand",
      excerpt: "Great design isn't just about looking pretty. Discover how strategic design decisions directly impact your business success.",
      readTime: "6 min read",
      date: "Dec 10, 2024",
      author: "Sarah",
      gradient: "from-accent-400 to-accent-600"
    },
    {
      id: 3,
      icon: BiBrain,
      tag: "🧠 Mindset",
      title: "How We Built Our First Portfolio Together",
      excerpt: "The story behind our partnership, the challenges we faced, and the lessons we learned while building our creative business.",
      readTime: "10 min read",
      date: "Dec 5, 2024",
      author: "Alex & Sarah",
      gradient: "from-secondary-400 to-secondary-600"
    },
    {
      id: 4,
      icon: BiRocket,
      tag: "🚀 Business",
      title: "Is MERN Stack Right for Your Business Website?",
      excerpt: "A practical guide to understanding when and why to choose MongoDB, Express, React, and Node.js for your next project.",
      readTime: "12 min read",
      date: "Nov 28, 2024",
      author: "Alex",
      gradient: "from-primary-500 to-accent-500"
    }
  ];

 

  

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-accent-50 via-primary-50 to-secondary-50 py-20 px-4 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-secondary-300 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
              Read Our{' '}
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Thoughts
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto rounded-full mb-6"></div>
          </div>
          
          <p  className="text-secondary-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We're not just builders — we're learners and sharers. Our blog is where we document our journey, 
            share insights, and help others navigate the exciting world of design and development.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => {
            const Icon = post.icon;
            
            return (
              <article
                key={post.id}
               
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Card Header */}
                <div className={`h-2 bg-gradient-to-r ${post.gradient}`}></div>
                
                <div className="p-6">
                  {/* Tag and Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${post.gradient}`}>
                      <Icon className="text-white text-lg" />
                    </div>
                    <span className="text-sm font-semibold text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-secondary-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FiUser className="text-xs" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="text-xs" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <button className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-300 group-hover:gap-3">
                      <span>Read Article</span>
                      <FiArrowRight className="text-sm transition-transform duration-300" />
                    </button>
                    
                    {/* Like/Share Icons */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200">
                        <span className="text-primary-600 text-xs">♥</span>
                      </div>
                      <div className="w-8 h-8 bg-accent-50 rounded-full flex items-center justify-center hover:bg-accent-100 transition-colors duration-200">
                        <span className="text-accent-600 text-xs">↗</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-primary-200/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Want to stay updated?
            </h3>
            <p className="text-secondary-600 mb-6">
              Subscribe to our newsletter and get the latest insights, tips, and behind-the-scenes content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-primary-200 focus:border-primary-400 focus:outline-none transition-colors duration-300"
              />
              <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-300 hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;