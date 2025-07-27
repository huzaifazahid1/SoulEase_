'use client';

import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon = "📭", 
  title = "No content found", 
  description = "There's nothing here yet.", 
  actionText = "Add Content", 
  onAction = null,
  className = ""
}) => {

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-20 px-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Background Elements */}
      <div className="relative">
        
        {/* Main Icon */}
        <motion.div
          className="relative z-10 mb-8"
          variants={iconVariants}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center border border-white/10">
            <span className="text-6xl opacity-80">{icon}</span>
          </div>
          
          {/* Icon Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-2xl"
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
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-16 h-16 bg-secondary-500/10 rounded-full blur-xl"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-500/10 rounded-full blur-xl"
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="text-center max-w-md"
        variants={itemVariants}
      >
        
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/70 text-lg leading-relaxed mb-8">
          {description}
        </p>

        {/* Action Button */}
        {onAction && actionText && (
          <motion.button
            onClick={onAction}
            className="btn-primary inline-flex items-center space-x-2"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{actionText}</span>
          </motion.button>
        )}
      </motion.div>

      {/* Additional Help Text */}
      <motion.div
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <div className="glass-morphism rounded-2xl p-4 max-w-sm">
          <p className="text-white/50 text-sm">
            💡 Try adjusting your search terms or browse different categories
          </p>
        </div>
      </motion.div>

      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default EmptyState;