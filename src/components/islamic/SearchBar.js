'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const SearchBar = ({ value, onChange, placeholder = "Search...", className = "" }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative glass-morphism rounded-2xl transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary-500/50 bg-white/[0.08]' : 'hover:bg-white/[0.06]'
      }`}>
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <motion.svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-primary-400' : 'text-white/50'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={isFocused ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </motion.svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-white/50 border-none outline-none font-medium"
        />

        {/* Clear Button */}
        {value && (
          <motion.button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors duration-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary-500 to-accent-500 opacity-0"
          animate={isFocused ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor'
          }}
        />
      </div>

      {/* Search Suggestions or Recent Searches could go here */}
      {isFocused && value.length > 0 && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 glass-morphism rounded-2xl border border-white/10 overflow-hidden z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4">
            <div className="text-white/60 text-sm mb-2">Searching for "{value}"</div>
            <div className="text-white/40 text-xs">Press Enter to search</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;