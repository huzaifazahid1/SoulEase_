'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  // Update indicator position when selected category changes
  useEffect(() => {
    const activeTab = tabRefs.current[selectedCategory];
    if (activeTab && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      setIndicator({
        width: tabRect.width,
        left: tabRect.left - containerRect.left
      });
    }
  }, [selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tab Container */}
      <div className="glass-morphism rounded-2xl p-2 relative overflow-hidden">
        
        {/* Background Indicator */}
        <motion.div
          className="absolute top-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl h-[calc(100%-16px)] z-10"
          animate={{
            width: indicator.width,
            x: indicator.left
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 relative z-20">
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            
            return (
              <motion.button
                key={category}
                ref={(el) => (tabRefs.current[category] = el)}
                onClick={() => onCategoryChange(category)}
                variants={tabVariants}
                className={`
                  relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                  whitespace-nowrap
                  ${isActive 
                    ? 'text-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Tab Content */}
                <span className="relative z-10">{category}</span>
                
                {/* Active Tab Glow Effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl blur-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 rounded-2xl"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Mobile Scroll Hint */}
      <div className="md:hidden mt-2 text-center">
        <div className="text-white/40 text-xs">
          Swipe to see more categories
        </div>
      </div>

      {/* Category Count Info */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-white/50 text-sm">
          {selectedCategory === 'All' 
            ? `Showing all categories (${categories.length - 1} categories available)`
            : `Category: ${selectedCategory}`
          }
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryTabs;