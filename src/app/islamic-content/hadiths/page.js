'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/islamic/SearchBar';
import ContentCard from '@/components/islamic/ContentCard';
import EmptyState from '@/components/islamic/EmptyState';
import LoadingSkelton from '@/components/LoadingSkelton';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HadithsPage() {
  const [hadiths, setHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Hadith collections
  const collections = [
    'All', 'Bukhari', 'Muslim', 'Abu Dawud', 'Tirmidhi', 'Nasai', 'Ibn Majah'
  ];

  // Initialize hadiths
  useEffect(() => {
    loadHadiths();
  }, []);

  // Filter hadiths based on search and collection
  useEffect(() => {
    filterHadiths();
  }, [hadiths, searchQuery, selectedCollection]);

  const loadHadiths = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API, fall back to dummy data
      let hadithsData = [];
      
      try {
        const response = await fetch('/api/islamic/hadiths');
        if (response.ok) {
          hadithsData = await response.json();
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        console.log('API not available, using fallback data');
        // Fallback hadith data
        hadithsData = [
          {
            id: 1,
            text: "The best of people are those who benefit others.",
            narrator: "Ibn Majah",
            collection: "Ibn Majah",
            grade: "Hasan",
            hadithNumber: "4278",
            reference: "Ibn Majah 4278"
          },
          {
            id: 2,
            text: "None of you truly believes until he loves for his brother what he loves for himself.",
            narrator: "Bukhari and Muslim",
            collection: "Bukhari",
            grade: "Sahih",
            hadithNumber: "13",
            reference: "Bukhari 13, Muslim 45"
          },
          {
            id: 3,
            text: "The world is green and beautiful, and Allah has appointed you as His stewards over it.",
            narrator: "Muslim",
            collection: "Muslim",
            grade: "Sahih",
            hadithNumber: "2742",
            reference: "Muslim 2742"
          },
          {
            id: 4,
            text: "Whoever believes in Allah and the Last Day should speak good or keep silent.",
            narrator: "Bukhari and Muslim",
            collection: "Bukhari",
            grade: "Sahih",
            hadithNumber: "6018",
            reference: "Bukhari 6018, Muslim 47"
          },
          {
            id: 5,
            text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
            narrator: "Bukhari and Muslim",
            collection: "Bukhari",
            grade: "Sahih",
            hadithNumber: "6114",
            reference: "Bukhari 6114, Muslim 2609"
          },
          {
            id: 6,
            text: "A person is not a believer who fills his stomach while his neighbor is hungry.",
            narrator: "Al-Bukhari in Al-Adab Al-Mufrad",
            collection: "Bukhari",
            grade: "Hasan",
            hadithNumber: "112",
            reference: "Al-Adab Al-Mufrad 112"
          },
          {
            id: 7,
            text: "The believer is not one who eats his fill while his neighbor goes hungry.",
            narrator: "Al-Bukhari in Al-Adab Al-Mufrad",
            collection: "Bukhari",
            grade: "Hasan",
            hadithNumber: "112",
            reference: "Al-Adab Al-Mufrad 112"
          },
          {
            id: 8,
            text: "Be in this world as if you were a stranger or a traveler along a path.",
            narrator: "Bukhari",
            collection: "Bukhari",
            grade: "Sahih",
            hadithNumber: "6416",
            reference: "Bukhari 6416"
          },
          {
            id: 9,
            text: "The most beloved deeds to Allah are those that are most consistent, even if they are small.",
            narrator: "Bukhari and Muslim",
            collection: "Bukhari",
            grade: "Sahih",
            hadithNumber: "6464",
            reference: "Bukhari 6464, Muslim 783"
          },
          {
            id: 10,
            text: "Whoever removes a worldly grief from a believer, Allah will remove from him one of the griefs of the Day of Judgment.",
            narrator: "Muslim",
            collection: "Muslim",
            grade: "Sahih",
            hadithNumber: "2699",
            reference: "Muslim 2699"
          },
          {
            id: 11,
            text: "The example of the believers in their affection, mercy, and compassion for each other is that of a body. When a limb aches, the whole body reacts to it with wakefulness and fever.",
            narrator: "Bukhari and Muslim",
            collection: "Bukhari",
            grade: "Sahih",
            hadithNumber: "6011",
            reference: "Bukhari 6011, Muslim 2586"
          },
          {
            id: 12,
            text: "Verily, Allah does not look at your appearance or wealth, but rather He looks at your hearts and actions.",
            narrator: "Muslim",
            collection: "Muslim",
            grade: "Sahih",
            hadithNumber: "2564",
            reference: "Muslim 2564"
          }
        ];
      }

      setHadiths(hadithsData);
    } catch (error) {
      console.error('Error loading hadiths:', error);
      setError('Failed to load hadiths');
    } finally {
      setLoading(false);
    }
  };

  const filterHadiths = () => {
    let filtered = [...hadiths];

    // Filter by collection
    if (selectedCollection !== 'All') {
      filtered = filtered.filter(hadith => 
        hadith.collection === selectedCollection
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hadith =>
        hadith.text.toLowerCase().includes(query) ||
        hadith.narrator.toLowerCase().includes(query) ||
        hadith.collection.toLowerCase().includes(query)
      );
    }

    setFilteredHadiths(filtered);
  };

  const loadMoreHadiths = () => {
    // Simulate loading more hadiths
    setPage(prev => prev + 1);
    // In real implementation, this would fetch more data from API
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neural-950 container-padding section-padding">
        <div className="max-w-7xl mx-auto">
          <LoadingSkelton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neural-950 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float delay-1000" />
      
      <motion.div
        className="relative z-10 container-padding section-padding"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            variants={containerVariants}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-secondary mb-6">
              Hadith Collection
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Authentic sayings and teachings of Prophet Muhammad (peace be upon him)
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div 
            className="mb-12 space-y-6"
            variants={containerVariants}
          >
            
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search hadiths by text, narrator, or collection..."
            />

            {/* Collection Filter */}
            <motion.div className="flex flex-wrap justify-center gap-3">
              {collections.map((collection) => (
                <motion.button
                  key={collection}
                  onClick={() => setSelectedCollection(collection)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    selectedCollection === collection
                      ? 'bg-gradient-to-r from-secondary-500 to-primary-500 text-white shadow-lg'
                      : 'glass-morphism text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {collection}
                </motion.button>
              ))}
            </motion.div>
            
          </motion.div>

          {/* Results Info */}
          <motion.div 
            className="mb-8 flex items-center justify-between"
            variants={containerVariants}
          >
            <div className="text-white/60">
              {filteredHadiths.length} {filteredHadiths.length === 1 ? 'hadith' : 'hadiths'} found
              {selectedCollection !== 'All' && ` in ${selectedCollection}`}
            </div>
            
            {(searchQuery || selectedCollection !== 'All') && (
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCollection('All');
                }}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Clear filters
              </motion.button>
            )}
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              className="glass-morphism rounded-2xl p-6 mb-8 border border-red-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-red-400 text-2xl">⚠️</div>
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">Error Loading Hadiths</h3>
                  <p className="text-white/70 text-sm">{error}</p>
                </div>
                <motion.button
                  onClick={loadHadiths}
                  className="btn-primary ml-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  Retry
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Hadiths Grid */}
          <AnimatePresence mode="wait">
            {filteredHadiths.length > 0 ? (
              <motion.div
                key="hadiths-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredHadiths.map((hadith) => (
                  <ContentCard
                    key={hadith.id}
                    type="hadith"
                    content={hadith}
                  />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon="📖"
                title="No hadiths found"
                description={
                  searchQuery 
                    ? `No hadiths match "${searchQuery}". Try different keywords or clear your search.`
                    : selectedCollection !== 'All'
                    ? `No hadiths found in the ${selectedCollection} collection.`
                    : "No hadiths available at the moment."
                }
                actionText="Clear Search"
                onAction={() => {
                  setSearchQuery('');
                  setSelectedCollection('All');
                }}
              />
            )}
          </AnimatePresence>

          {/* Load More Button */}
          {filteredHadiths.length > 0 && hasMore && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMoreHadiths}
                className="btn-secondary inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Load More Hadiths</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {/* Collection Info */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">📚 Collections</h3>
              <p className="text-white/70 text-sm">
                Browse hadiths from the most authentic collections including Sahih Bukhari, Sahih Muslim, and others.
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">🔍 Search</h3>
              <p className="text-white/70 text-sm">
                Find specific hadiths by searching through text content, narrator names, or collection sources.
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">📋 References</h3>
              <p className="text-white/70 text-sm">
                All hadiths include proper references and authenticity grades for scholarly verification.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}