'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const DailyContentCard = ({ type, title, content, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle different content types
  const renderContent = () => {
    if (!content) {
      return (
        <div className="text-center py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-white/10 rounded mb-3"></div>
            <div className="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      );
    }

    switch (type) {
      case 'verse':
        return (
          <div className="space-y-4">
            {/* Arabic Text */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl text-white font-arabic leading-relaxed mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                {content.text || content.arabic}
              </p>
            </div>
            
            {/* Translation */}
            <div className="glass-morphism rounded-2xl p-4">
              <p className="text-white/90 text-lg leading-relaxed italic">
                "{content.translation}"
              </p>
            </div>
            
            {/* Reference */}
            <div className="flex items-center justify-center space-x-2 text-primary-400">
              <span className="font-semibold">{content.surah}</span>
              <span>•</span>
              <span>Verse {content.ayah}</span>
            </div>
          </div>
        );

      case 'hadith':
        return (
          <div className="space-y-4">
            {/* Hadith Text */}
            <div className="glass-morphism rounded-2xl p-4">
              <p className="text-white/90 text-lg leading-relaxed">
                "{content.text}"
              </p>
            </div>
            
            {/* Attribution */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-400 font-semibold">
                Narrated by {content.narrator}
              </span>
              {content.grade && (
                <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full">
                  {content.grade}
                </span>
              )}
            </div>
          </div>
        );

      case 'dua':
        return (
          <div className="space-y-4">
            {/* Arabic Text */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl text-white font-arabic leading-relaxed mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                {content.arabic}
              </p>
            </div>
            
            {/* Transliteration */}
            <div className="glass-morphism rounded-2xl p-4">
              <p className="text-white/80 text-base leading-relaxed font-medium">
                {content.transliteration}
              </p>
            </div>
            
            {/* Translation */}
            <div className="glass-morphism rounded-2xl p-4">
              <p className="text-white/90 text-lg leading-relaxed italic">
                "{content.translation}"
              </p>
            </div>
            
            {/* Category */}
            <div className="text-center">
              <span className="bg-secondary-500/20 text-secondary-400 px-4 py-2 rounded-full text-sm font-semibold">
                {content.category}
              </span>
            </div>
          </div>
        );

      default:
        return <div>No content available</div>;
    }
  };

  // Get gradient based on type
  const getGradient = () => {
    switch (type) {
      case 'verse':
        return 'from-primary-500/20 to-accent-500/20';
      case 'hadith':
        return 'from-secondary-500/20 to-primary-500/20';
      case 'dua':
        return 'from-accent-500/20 to-secondary-500/20';
      default:
        return 'from-primary-500/20 to-accent-500/20';
    }
  };

  // Get border gradient
  const getBorderGradient = () => {
    switch (type) {
      case 'verse':
        return 'from-primary-500 to-accent-500';
      case 'hadith':
        return 'from-secondary-500 to-primary-500';
      case 'dua':
        return 'from-accent-500 to-secondary-500';
      default:
        return 'from-primary-500 to-accent-500';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group h-full"
    >
      <div className={`relative glass-morphism-card rounded-3xl p-6 md:p-8 h-full bg-gradient-to-br ${getGradient()} border-0 overflow-hidden`}>
        
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getBorderGradient()} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
        <div className="absolute inset-[1px] bg-neural-950/90 backdrop-blur-xl rounded-3xl" />
        
        {/* Content */}
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`text-3xl p-3 bg-gradient-to-r ${getBorderGradient()} rounded-2xl shadow-lg`}>
                {icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                {title}
              </h3>
            </div>
            
            {/* Share Button */}
            <motion.button
              className="p-2 glass-morphism rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // Simple share functionality
                if (navigator.share && content) {
                  navigator.share({
                    title: title,
                    text: content.translation || content.text,
                  });
                }
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="min-h-[300px] flex flex-col justify-center">
            {renderContent()}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-3">
              {/* Favorite Button for Duas */}
              {type === 'dua' && content && (
                <motion.button
                  className="p-2 glass-morphism rounded-xl text-white/60 hover:text-red-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    // Toggle favorite in localStorage
                    const savedDuas = JSON.parse(localStorage.getItem('islamic_duas') || '[]');
                    const updatedDuas = savedDuas.map(dua => 
                      dua.id === content.id 
                        ? { ...dua, isFavorite: !dua.isFavorite }
                        : dua
                    );
                    localStorage.setItem('islamic_duas', JSON.stringify(updatedDuas));
                  }}
                >
                  <svg className="w-5 h-5" fill={content?.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>
              )}
              
              {/* Copy Button */}
              <motion.button
                className="p-2 glass-morphism rounded-xl text-white/60 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (content) {
                    const textToCopy = content.translation || content.text || '';
                    navigator.clipboard.writeText(textToCopy);
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </motion.button>
            </div>

            {/* Last updated indicator */}
            <div className="text-xs text-white/40">
              Updated today
            </div>
          </div>

        </div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-white/3 to-white/8 rounded-full blur-lg"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.div>
  );
};

export default DailyContentCard;