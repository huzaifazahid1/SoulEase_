'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddDuaModal = ({ isOpen, onClose, onAdd, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    arabic: '',
    transliteration: '',
    translation: '',
    category: categories[0] || 'Morning'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        arabic: '',
        transliteration: '',
        translation: '',
        category: categories[0] || 'Morning'
      });
      setErrors({});
    }
  }, [isOpen, categories]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.arabic.trim()) {
      newErrors.arabic = 'Arabic text is required';
    }
    
    if (!formData.translation.trim()) {
      newErrors.translation = 'Translation is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onAdd(formData);
    } catch (error) {
      console.error('Error adding dua:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-neural-950/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-morphism-strong rounded-3xl border border-white/20"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="sticky top-0 z-10 glass-morphism-card rounded-t-3xl p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-2xl">
                    <span className="text-2xl">🤲</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white">
                    Add New Dua
                  </h2>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 glass-morphism rounded-xl text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="p-6 space-y-6"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              
              {/* Title Field */}
              <motion.div variants={fieldVariants}>
                <label className="block text-white font-semibold mb-3">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Morning Dua"
                  className={`w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-white/50 border ${
                    errors.title ? 'border-red-500/50' : 'border-white/10'
                  } focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300`}
                />
                {errors.title && (
                  <motion.p
                    className="text-red-400 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.title}
                  </motion.p>
                )}
              </motion.div>

              {/* Arabic Text Field */}
              <motion.div variants={fieldVariants}>
                <label className="block text-white font-semibold mb-3">
                  Arabic Text *
                </label>
                <textarea
                  value={formData.arabic}
                  onChange={(e) => handleChange('arabic', e.target.value)}
                  placeholder="Enter Arabic text here..."
                  rows={3}
                  dir="rtl"
                  className={`w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-white/50 border ${
                    errors.arabic ? 'border-red-500/50' : 'border-white/10'
                  } focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none`}
                  style={{ fontFamily: 'Amiri, serif' }}
                />
                {errors.arabic && (
                  <motion.p
                    className="text-red-400 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.arabic}
                  </motion.p>
                )}
              </motion.div>

              {/* Transliteration Field */}
              <motion.div variants={fieldVariants}>
                <label className="block text-white font-semibold mb-3">
                  Transliteration (Optional)
                </label>
                <textarea
                  value={formData.transliteration}
                  onChange={(e) => handleChange('transliteration', e.target.value)}
                  placeholder="e.g., Allahumma barik lana..."
                  rows={2}
                  className="w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-white/50 border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                />
              </motion.div>

              {/* Translation Field */}
              <motion.div variants={fieldVariants}>
                <label className="block text-white font-semibold mb-3">
                  Translation *
                </label>
                <textarea
                  value={formData.translation}
                  onChange={(e) => handleChange('translation', e.target.value)}
                  placeholder="Enter English translation here..."
                  rows={3}
                  className={`w-full px-4 py-3 glass-morphism rounded-xl text-white placeholder-white/50 border ${
                    errors.translation ? 'border-red-500/50' : 'border-white/10'
                  } focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none`}
                />
                {errors.translation && (
                  <motion.p
                    className="text-red-400 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.translation}
                  </motion.p>
                )}
              </motion.div>

              {/* Category Field */}
              <motion.div variants={fieldVariants}>
                <label className="block text-white font-semibold mb-3">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 glass-morphism rounded-xl text-white border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-neural-900"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-neural-900 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex items-center justify-end space-x-4 pt-6"
                variants={fieldVariants}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  type="submit"
                  className={`btn-primary flex items-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Dua</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

            </motion.form>

            {/* Background Decorations */}
            <motion.div
              className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-accent-500/10 to-secondary-500/10 rounded-full blur-2xl"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddDuaModal;