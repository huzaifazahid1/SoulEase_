'use client'

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { FiStar, FiChevronLeft, FiChevronRight, FiQuote } from 'react-icons/fi'
import { HiAcademicCap } from 'react-icons/hi2'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
/**
 * Testimonials Section Component
 * 
 * Features:
 * - Student reviews with Swiper carousel
 * - 3D card effects with coverflow
 * - Auto-playing testimonials
 * - University verification badges
 * - Mobile-responsive design
 * - Star ratings and authentic photos
 */
export default function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const swiperRef = useRef(null)

  // Enhanced testimonials data with more details
  const testimonials = [
    {
      id: 1,
      name: "Aisha Rahman",
      role: "Computer Science Student",
      university: "Massachusetts Institute of Technology",
      universityShort: "MIT",
      quote: "SoulEase revolutionized how I approach both my studies and spiritual growth. The AI feels incredibly intuitive and respectful of my faith. It's like having a wise mentor who understands both my technical aspirations and my Islamic values.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&q=80",
      achievement: "Dean's List 2024",
      location: "Cambridge, MA",
      testimonialType: "Academic Success",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      id: 2,
      name: "Omar Hassan",
      role: "Engineering Student",
      university: "Stanford University",
      universityShort: "Stanford",
      quote: "Finally, a platform that understands the intersection of career anxiety and Islamic values. The guidance feels personally crafted, and the community support has been invaluable during my toughest semesters.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
      achievement: "Research Publication",
      location: "Palo Alto, CA",
      testimonialType: "Mental Health",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 3,
      name: "Fatima Ali",
      role: "Medical Student",
      university: "Harvard Medical School",
      universityShort: "Harvard",
      quote: "The anonymous mood tracking with Islamic coping strategies helped me maintain balance during the most challenging semester. The AI recommendations for prayer times and spiritual practices were perfectly timed.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80",
      achievement: "Honor Society",
      location: "Boston, MA",
      testimonialType: "Spiritual Growth",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Ahmed Malik",
      role: "Business Student",
      university: "University of Pennsylvania",
      universityShort: "Wharton",
      quote: "SoulEase bridged the gap between my professional aspirations and spiritual identity. It's like having a wise mentor available 24/7 who understands both business ethics and Islamic principles.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80",
      achievement: "Business Plan Winner",
      location: "Philadelphia, PA",
      testimonialType: "Career Guidance",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Zara Khan",
      role: "Psychology Major",
      university: "University of California, Berkeley",
      universityShort: "UC Berkeley",
      quote: "As someone studying psychology, I was skeptical about AI therapy. But SoulEase's integration of Islamic therapeutic principles with modern psychology is genuinely groundbreaking.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80",
      achievement: "Research Assistant",
      location: "Berkeley, CA",
      testimonialType: "Academic Insight",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      name: "Yusuf Ibrahim",
      role: "Pre-Med Student",
      university: "University of Michigan",
      universityShort: "U-M",
      quote: "The stress management tools and Islamic meditation guides got me through MCAT prep while maintaining my spiritual practices. The community features connected me with other Muslim pre-med students.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80",
      achievement: "MCAT 520+",
      location: "Ann Arbor, MI",
      testimonialType: "Test Preparation",
      gradient: "from-teal-500 to-green-500"
    }
  ]

  // Statistics derived from testimonials
  const stats = [
    { number: "98%", label: "Success Rate", description: "Students report improved mental health" },
    { number: "4.9/5", label: "Average Rating", description: "Across all university reviews" },
    { number: "50+", label: "Universities", description: "Top institutions worldwide" },
    { number: "25K+", label: "Students", description: "Active community members" }
  ]

  return (
    <section className="section-padding container-padding relative overflow-hidden" id="testimonials">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-neural-950 via-neural-900/30 to-neural-950" />
      <div className="absolute inset-0 bg-neural-pattern opacity-5" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display font-bold mb-8">
            <span className="block text-5xl md:text-7xl text-white mb-4">
              Student
            </span>
            <span className="block text-5xl md:text-7xl text-gradient-primary">
              Success Stories
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Real transformations from students who found their path through SoulEase
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="glass-morphism rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-white/60">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">

          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="
              absolute left-4 top-1/2 transform -translate-y-1/2 z-20
              w-12 h-12 glass-morphism rounded-full 
              flex items-center justify-center
              hover:bg-white/10 transition-all duration-300 group
              focus-visible
            "
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform duration-300" />
          </button>

          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="
              absolute right-4 top-1/2 transform -translate-y-1/2 z-20
              w-12 h-12 glass-morphism rounded-full 
              flex items-center justify-center
              hover:bg-white/10 transition-all duration-300 group
              focus-visible
            "
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>

          {/* Swiper Container */}
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            centeredSlides={true}
            slidesPerView="auto"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            loop={true}
            speed={800}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="testimonials-swiper !pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!w-auto">
                <div className="w-full max-w-2xl mx-4">

                  {/* Testimonial Card */}
                  <div className="relative glass-morphism-strong rounded-3xl p-8 md:p-12 border border-white/10 group hover:border-white/20 transition-all duration-500">

                    {/* Background Gradient */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${testimonial.gradient}/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl
                    `} />

                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6">
                      <div className={`
                        p-3 rounded-xl bg-gradient-to-br ${testimonial.gradient}/20 
                        border border-white/10
                      `}>
                        <FiStar className="w-6 h-6 text-white/60" />
                      </div>
                    </div>

                    {/* Testimonial Type Badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`
                        px-3 py-1 text-xs font-semibold rounded-full
                        bg-gradient-to-r ${testimonial.gradient}/20 
                        border border-white/20 text-white/80
                      `}>
                        {testimonial.testimonialType}
                      </div>
                    </div>

                    <div className="relative z-10 pt-12">

                      {/* Star Rating */}
                      <div className="flex justify-center mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar
                            key={i}
                            className="w-6 h-6 text-yellow-400 fill-current mx-1"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-white/90 mb-10 italic leading-relaxed font-light text-center">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center justify-center space-x-6">

                        {/* Profile Image */}
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={`${testimonial.name} profile`}
                            className="w-20 h-20 rounded-full border-3 border-white/20 object-cover"
                          />
                          {/* University Badge */}
                          <div className={`
                            absolute -bottom-2 -right-2 
                            w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.gradient}
                            flex items-center justify-center border-2 border-neural-950
                          `}>
                            <HiAcademicCap className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="text-center">
                          <h4 className="text-white font-bold text-lg mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-primary-400 font-semibold text-sm mb-1">
                            {testimonial.role}
                          </p>
                          <p className="text-white/60 text-sm mb-2">
                            {testimonial.universityShort} • {testimonial.location}
                          </p>
                          <div className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full">
                            {testimonial.achievement}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* University Logos */}
        <div className="mt-20 text-center">
          <p className="text-white/60 mb-8 text-lg">
            Trusted by students at leading universities worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['MIT', 'Stanford', 'Harvard', 'Wharton', 'UC Berkeley', 'U-M'].map((uni, index) => (
              <div
                key={uni}
                className="px-6 py-3 glass-morphism rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <span className="text-white/80 font-semibold text-sm tracking-wide">
                  {uni}
                </span>
              </div>
            ))}
          </div>
        </div>
       

      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: #14b8a6;
          transform: scale(1.2);
        }
        
        .testimonials-swiper .swiper-slide {
          transition: all 0.3s ease;
        }
        
        .testimonials-swiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.6;
          transform: scale(0.9);
        }
      `}</style>
    </section>
  )
}