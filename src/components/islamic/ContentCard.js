'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ContentCard = ({ type, content, onToggleFavorite, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const expandVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" }
  };

  // Get gradient based on type
  const getGradient = () => {
    switch (type) {
      case 'dua':
        return 'from-accent-500/20 to-secondary-500/20';
      case 'hadith':
        return 'from-secondary-500/20 to-primary-500/20';
      case 'verse':
        return 'from-primary-500/20 to-accent-500/20';
      default:
        return 'from-primary-500/20 to-accent-500/20';
    }
  };

  const getBorderGradient = () => {
    switch (type) {
      case 'dua':
        return 'from-accent-500 to-secondary-500';
      case 'hadith':
        return 'from-secondary-500 to-primary-500';
      case 'verse':
        return 'from-primary-500 to-accent-500';
      default:
        return 'from-primary-500 to-accent-500';
    }
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    const textToCopy = content.translation || content.text || '';
    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title || 'Islamic Content',
          text: content.translation || content.text || '',
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'dua':
        return (
          <div className="space-y-4">
            {/* Arabic Text */}
            <div className="text-center">
              <p className="text-xl md:text-2xl text-white font-arabic leading-relaxed mb-4" 
                 style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}>
                {content.arabic}
              </p>
            </div>
            
            {/* Transliteration */}
            {content.transliteration && (
              <div className="glass-morphism rounded-xl p-3">
                <p className="text-white/80 text-sm leading-relaxed font-medium italic">
                  {content.transliteration}
                </p>
              </div>
            )}
            
            {/* Translation */}
            <div className="glass-morphism rounded-xl p-4">
              <p className="text-white/90 leading-relaxed">
                "{content.translation}"
              </p>
            </div>
          </div>
        );

      case 'hadith':
        return (
          <div className="space-y-4">
            {/* Hadith Text */}
            <div className="glass-morphism rounded-xl p-4">
              <p className="text-white/90 leading-relaxed text-lg">
                "{content.text}"
              </p>
            </div>
            
            {/* Attribution */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-400 font-semibold">
                {content.narrator}
              </span>
              {content.grade && (
                <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-xs">
                  {content.grade}
                </span>
              )}
            </div>
          </div>
        );

      case 'verse':
        return (
          <div className="space-y-4">
            {/* Arabic Text */}
            <div className="text-center">
              <p className="text-xl md:text-2xl text-white font-arabic leading-relaxed mb-4" 
                 style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}>
                {content.text || content.arabic}
              </p>
            </div>
            
            {/* Translation */}
            <div className="glass-morphism rounded-xl p-4">
              <p className="text-white/90 leading-relaxed">
                "{content.translation}"
              </p>
            </div>
            
            {/* Reference */}
            <div className="text-center text-primary-400 font-semibold text-sm">
              {content.surah} • Verse {content.ayah}
            </div>
          </div>
        );

      default:
        return <div>No content available</div>;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`group h-full ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative glass-morphism-card rounded-3xl p-6 h-full bg-gradient-to-br ${getGradient()} border-0 overflow-hidden`}>
        
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getBorderGradient()} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
        <div className="absolute inset-[1px] bg-neural-950/90 backdrop-blur-xl rounded-3xl" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-gradient-to-r ${getBorderGradient()} rounded-xl`}>
                <span className="text-lg">
                  {type === 'dua' ? '🤲' : type === 'hadith' ? '📖' : '📕'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  {content.title}
                </h3>
                {content.category && (
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                    {content.category}
                  </span>
                )}
              </div>
            </div>
            
            {/* Favorite Button (for duas) */}
            {type === 'dua' && onToggleFavorite && (
              <motion.button
                onClick={onToggleFavorite}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  content.isFavorite 
                    ? 'text-red-400 bg-red-500/20' 
                    : 'text-white/60 hover:text-red-400 hover:bg-red-500/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill={content.isFavorite ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 mb-6">
            {renderContent()}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              
              {/* Copy Button */}
              <motion.button
                onClick={handleCopy}
                className="relative p-2 glass-morphism rounded-xl text-white/60 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                
                {/* Copy Success Indicator */}
                {showCopied && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-md"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    Copied!
                  </motion.div>
                )}
              </motion.button>

              {/* Share Button */}
              <motion.button
                onClick={handleShare}
                className="p-2 glass-morphism rounded-xl text-white/60 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </motion.button>

            </div>

            {/* Date Added (for custom duas) */}
            {content.dateAdded && (
              <div className="text-xs text-white/40">
                {new Date(content.dateAdded).toLocaleDateString()}
              </div>
            )}
          </div>

        </div>

        {/* Hover Effect - Floating Particles */}
        <motion.div 
          className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-white/3 to-white/8 rounded-full blur-lg opacity-0 group-hover:opacity-100"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
    </motion.div>
  );
};

export default ContentCard;